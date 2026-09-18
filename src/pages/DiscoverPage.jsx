import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CourtCard, CourtMap } from '../components/CourtCard'
import { EmptyState } from '../components/ui'

const StatCard = ({ value, label, icon }) => (
  <div className="hero-stat-card">
    <span className="hero-stat-icon">{icon}</span>
    <strong className="hero-stat-value">{value}</strong>
    <span className="hero-stat-label">{label}</span>
  </div>
)

const QuickAction = ({ to, icon, label, desc, color }) => (
  <Link to={to} className="quick-action-card" style={{ '--qa-color': color }}>
    <span className="qa-icon">{icon}</span>
    <div className="qa-text">
      <strong>{label}</strong>
      <span>{desc}</span>
    </div>
    <svg className="qa-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
  </Link>
)

export const DiscoverPage = () => {
  const { t, L, lang, courts, members, groups, courtRating, reviewsForCourt } = useApp()
  const [sport, setSport] = useState('all')
  const [district, setDistrict] = useState('all')
  const [surface, setSurface] = useState('all')
  const [environment, setEnvironment] = useState('all')
  const [sort, setSort] = useState('rating')
  const [showMap, setShowMap] = useState(false)
  const [selectedCourt, setSelectedCourt] = useState(null)
  const [query, setQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = courts.filter((c) => {
      if (sport === 'tennis' && c.sport !== 'tennis' && c.sport !== 'both') return false
      if (sport === 'pickleball' && c.sport !== 'pickleball' && c.sport !== 'both') return false
      if (sport === 'both' && c.sport !== 'both') return false
      if (district !== 'all' && c.district !== district) return false
      if (surface !== 'all' && c.surface !== surface) return false
      if (environment !== 'all' && c.environment !== environment) return false
      if (query) {
        const q = query.toLowerCase()
        const name = L(c.name, lang).toLowerCase()
        const addr = L(c.address, lang).toLowerCase()
        if (!name.includes(q) && !addr.includes(q)) return false
      }
      return true
    })
    list = [...list].sort((a, b) => {
      const ra = courtRating(a.id) || 0
      const rb = courtRating(b.id) || 0
      if (sort === 'rating') return rb - ra
      if (sort === 'reviews') return reviewsForCourt(b.id).length - reviewsForCourt(a.id).length
      if (sort === 'name') return L(a.name, lang).localeCompare(L(b.name, lang))
      return 0
    })
    return list
  }, [courts, sport, district, surface, environment, sort, query, lang, t])

  const topCourts = useMemo(() => {
    return [...courts]
      .sort((a, b) => (courtRating(b.id) || 0) - (courtRating(a.id) || 0))
      .slice(0, 6)
  }, [courts, courtRating])

  const resetFilters = () => {
    setSport('all')
    setDistrict('all')
    setSurface('all')
    setEnvironment('all')
    setSort('rating')
    setQuery('')
  }

  const hasActiveFilters =
    sport !== 'all' || district !== 'all' || surface !== 'all' || environment !== 'all' || query

  const sportOptions = [
    ['all', t('search.all')],
    ['tennis', t('sports.tennis')],
    ['pickleball', t('sports.pickleball')],
    ['both', t('sports.both')]
  ]

  return (
    <div className="page discover-page">
      {/* ── HERO SECTION ── */}
      <section className="hero-section">
        <div className="hero-grid-bg" />
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
        </div>
        <div className="container hero-inner">
          <div className="hero-layout">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                {lang === 'zh' ? '香港首個網球 · 匹克球社群平台' : "HK's #1 Tennis & Pickleball Community"}
              </div>
              <h1 className="hero-title-line1">
                {lang === 'zh' ? '隨時開波' : 'Play Anytime.'}
                <em>{lang === 'zh' ? '身邊總有一個波友' : 'Find Your Court.'}</em>
              </h1>
              <p className="hero-subtitle">
                {lang === 'zh'
                  ? '探索全港 18 區的網球及匹克球場地，認識香港的波友'
                  : 'Discover tennis & pickleball courts across all 18 HK districts. Connect with players. Join games.'}
              </p>
              <div className="hero-search-wrap">
                <div className="hero-search-box">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                  <input
                    type="text"
                    placeholder={lang === 'zh' ? '搜尋場地、地區、關鍵字…' : 'Search courts, districts, keywords…'}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <button
                  className="hero-search-btn"
                  onClick={() => {
                    document.querySelector('.results-section')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {lang === 'zh' ? '搜尋' : 'Search'}
                </button>
              </div>
              <div className="hero-quick-tags">
                {[
                  ['Wan Chai', 'Wan Chai'],
                  ['Hard court', 'Hard court'],
                  ['Indoor', 'Indoor'],
                  ['Free', 'Free'],
                ].map(([val, label]) => (
                  <button
                    key={val}
                    className="hero-quick-tag"
                    onClick={() => {
                      setQuery(val)
                      document.querySelector('.results-section')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-preview-card">
                {topCourts.slice(0, 3).map((court, i) => (
                  <div key={court.id} className="hero-court-row">
                    <div className="hero-court-thumb">
                      {court.sport === 'pickleball' ? '🏓' : '🎾'}
                    </div>
                    <div className="hero-court-info">
                      <span className="hero-court-name">{L(court.name, lang)}</span>
                      <span className="hero-court-district">{t(`districts.${court.district}`)} · {court.surface ? t(`surfaces.${court.surface}`) : 'Hard'}</span>
                    </div>
                    <div className="hero-court-rating">
                      <span className="hero-badge-icon">⭐</span>
                      {(courtRating(court.id) || 0).toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="hero-floating-chip">
                {lang === 'zh' ? `${courts.length} 個場地` : `${courts.length} courts`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="stats-bar">
        <div className="container stats-inner">
          <StatCard icon="🏟️" value={courts.length} label={lang === 'zh' ? '個場地' : 'Courts'} />
          <div className="stats-divider" />
          <StatCard icon="👥" value={members.length} label={lang === 'zh' ? '位波友' : 'Players'} />
          <div className="stats-divider" />
          <StatCard icon="🎾" value={courts.filter(c => c.sport === 'tennis' || c.sport === 'both').length} label={lang === 'zh' ? '網球場' : 'Tennis'} />
          <div className="stats-divider" />
          <StatCard icon="🏓" value={courts.filter(c => c.sport === 'pickleball' || c.sport === 'both').length} label={lang === 'zh' ? '匹克球場' : 'Pickleball'} />
          <div className="stats-divider" />
          <StatCard icon="👫" value={groups.length} label={lang === 'zh' ? '個群組' : 'Groups'} />
        </div>
      </section>

      {/* ── FEATURED COURTS ── */}
      <section className="featured-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-eyebrow">{lang === 'zh' ? '精選場地' : 'Featured Courts'}</p>
              <h2 className="section-title">
                {lang === 'zh' ? '評分最高嘅場地' : 'Top Rated Courts'}
              </h2>
            </div>
            <Link to="/?sort=rating" className="section-link">
              {lang === 'zh' ? '睇曉所有 →' : 'See all →'}
            </Link>
          </div>
          <div className="featured-scroll">
            {topCourts.map((court) => (
              <div key={court.id} className="featured-card-wrap">
                <CourtCard court={court} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section className="quick-actions-section">
        <div className="container">
          <div className="quick-actions-grid">
            <QuickAction
              to="/"
              icon="🏟️"
              label={lang === 'zh' ? '搵場地' : 'Find a Court'}
              desc={lang === 'zh' ? `全港 ${courts.length} 個場地` : `${courts.length} courts across HK`}
              color="#3f6d4e"
            />
            <QuickAction
              to="/matching"
              icon="🎾"
              label={lang === 'zh' ? '搵波友' : 'Find Players'}
              desc={lang === 'zh' ? '約人開波' : 'Match & play together'}
              color="#965fd4"
            />
            <QuickAction
              to="/groups"
              icon="👫"
              label={lang === 'zh' ? '參加活動' : 'Join a Game'}
              desc={lang === 'zh' ? '加入群組或訓練' : `${groups.length} groups & sessions`}
              color="#734f9a"
            />
            <QuickAction
              to="/messages"
              icon="💬"
              label={lang === 'zh' ? '收件箱' : 'Messages'}
              desc={lang === 'zh' ? '查看對話記錄' : 'Chat with players'}
              color="#965fd4"
            />
            <QuickAction
              to="/marketplace"
              icon="🛍️"
              label={lang === 'zh' ? '二手裝備' : 'Gear & Gear'}
              desc={lang === 'zh' ? '買賣球拍、球鞋' : 'Buy & sell gear'}
              color="#3f6d4e"
            />
          </div>
        </div>
      </section>

      {/* ── ALL COURTS — FILTER + RESULTS ── */}
      <section className="results-section" id="results">
        <div className="container">
          <div className="results-head">
            <div>
              <p className="section-eyebrow">{lang === 'zh' ? '全部場地' : 'All Courts'}</p>
              <h2 className="section-title-sm">
                {filtered.length} {filtered.length === 1 ? (lang === 'zh' ? '個場地' : 'court') : (lang === 'zh' ? '個場地' : 'courts')}
                {hasActiveFilters && ` · ${lang === 'zh' ? '已篩選' : 'filtered'}`}
              </h2>
            </div>
            <div className="results-head-right">
              <button
                className="filter-toggle-btn"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                {filterOpen ? (lang === 'zh' ? '隱藏篩選' : 'Hide filters') : (lang === 'zh' ? '顯示篩選' : 'Show filters')}
              </button>
              <div className="view-toggle">
                <button
                  className={`view-toggle-btn ${!showMap ? 'active' : ''}`}
                  onClick={() => setShowMap(false)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
                  {t('discover.listView')}
                </button>
                <button
                  className={`view-toggle-btn ${showMap ? 'active' : ''}`}
                  onClick={() => setShowMap(true)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" /><path d="M15 5.764v15" /><path d="M9 3.236v15" /></svg>
                  {t('discover.mapView')}
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className={`filter-section ${filterOpen ? 'open' : ''}`}>
            <div className="filter-row filter-row-primary">
              <div className="search-box">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                <input
                  type="text"
                  placeholder={t('search.courtPlaceholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="chip-group chip-group-sport">
                {sportOptions.map(([val, label]) => (
                  <button
                    key={val}
                    className={`chip ${sport === val ? 'chip-active chip-sport' : ''}`}
                    onClick={() => setSport(val)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {hasActiveFilters && (
                <button className="btn-reset" onClick={resetFilters}>
                  ✕ {t('discover.reset')}
                </button>
              )}
            </div>
            <div className="filter-row filter-row-secondary">
              <label className="select-wrap">
                <span className="select-label">{t('discover.filterDistrict')}</span>
                <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                  <option value="all">{t('search.all')}</option>
                  <DistrictOptions />
                </select>
              </label>
              <label className="select-wrap">
                <span className="select-label">{t('discover.filterSurface')}</span>
                <select value={surface} onChange={(e) => setSurface(e.target.value)}>
                  <option value="all">{t('search.all')}</option>
                  {['hard', 'clay', 'grass', 'artificial', 'cushion'].map((s) => (
                    <option key={s} value={s}>{t(`surfaces.${s}`)}</option>
                  ))}
                </select>
              </label>
              <label className="select-wrap">
                <span className="select-label">{t('discover.filterEnv')}</span>
                <select value={environment} onChange={(e) => setEnvironment(e.target.value)}>
                  <option value="all">{t('search.all')}</option>
                  {['indoor', 'outdoor', 'covered'].map((s) => (
                    <option key={s} value={s}>{t(`environments.${s}`)}</option>
                  ))}
                </select>
              </label>
              <label className="select-wrap">
                <span className="select-label">{t('discover.sortBy')}</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="rating">{t('discover.sortRating')}</option>
                  <option value="reviews">{t('discover.sortReviews')}</option>
                  <option value="name">{t('discover.sortName')}</option>
                </select>
              </label>
            </div>
          </div>

          {showMap && (
            <div className="map-block">
              <CourtMap courts={filtered} activeId={selectedCourt} onSelect={setSelectedCourt} />
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState
              icon="🔍"
              title={t('discover.noCourts')}
              subtitle={t('search.noResults')}
              action={
                <button className="btn btn-forest" onClick={resetFilters}>
                  {t('discover.reset')}
                </button>
              }
            />
          ) : (
            <div className="court-grid">
              {filtered.map((court) => (
                <CourtCard key={court.id} court={court} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

const DistrictOptions = () => {
  const { districts } = useApp()
  const { t } = useApp()
  return (
    <>
      {districts.map((d) => (
        <option key={d} value={d}>{t(`districts.${d}`)}</option>
      ))}
    </>
  )
}
