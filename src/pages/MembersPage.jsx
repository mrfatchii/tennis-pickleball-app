import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Avatar, SportTag, EmptyState } from '../components/ui'

export const MembersPage = () => {
  const { t, L, lang, members, courts, groups, listings, currentUserId, isAdmin, updateProfile, levels, playStyles } = useApp()
  const [query, setQuery] = useState('')
  const [sport, setSport] = useState('all')
  const [level, setLevel] = useState('all')
  const [district, setDistrict] = useState('all')

  const filtered = members.filter((m) => {
    if (query && !m.name.toLowerCase().includes(query.toLowerCase())) return false
    if (sport !== 'all' && !m.sports.includes(sport)) return false
    if (level !== 'all' && m.level !== level) return false
    if (district !== 'all' && m.district !== district) return false
    return true
  })

  const adminStats = [
    { label: t('admin.membersTotal') || 'Total Members', value: members.length, icon: '👥', accent: 'var(--purple)' },
    { label: t('admin.courtsTotal') || 'Courts', value: courts.length, icon: '🏟️', accent: 'var(--forest)' },
    { label: t('admin.groupsTotal') || 'Groups', value: groups.length, icon: '👫', accent: 'var(--lime)' },
    { label: t('admin.listingsTotal') || 'Listings', value: listings.length, icon: '🛍️', accent: 'var(--purple-dark)' },
  ]

  if (isAdmin) {
    return (
      <div className="page admin-page">
        <section className="page-hero">
          <div className="hero-grid-bg" />
          <div className="hero-bg-shapes">
            <div className="hero-shape hero-shape-1" />
            <div className="hero-shape hero-shape-2" />
            <div className="hero-shape hero-shape-3" />
          </div>
          <div className="container">
            <h1 className="page-title">
              <span style={{ color: 'var(--lime)' }}>⚙️</span> {t('nav.adminPanel') || 'Admin Panel'}
            </h1>
            <p className="page-subtitle">{t('admin.subtitle') || 'Manage all members, courts, groups and listings'}</p>
          </div>
        </section>

        <div className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
          <div className="admin-stats">
            {adminStats.map((s) => (
              <div key={s.label} className="admin-stat-card">
                <span className="admin-stat-icon">{s.icon}</span>
                <div>
                  <strong className="admin-stat-value">{s.value}</strong>
                  <span className="admin-stat-label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="admin-section">
            <div className="admin-section-head">
              <h2 className="admin-section-title">{t('admin.memberMgmt') || 'Member Management'}</h2>
              <span className="admin-count">{filtered.length} / {members.length}</span>
            </div>

            <div className="filter-section">
              <div className="filter-row filter-row-primary">
                <div className="search-box">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                  <input
                    type="text"
                    placeholder={t('members.search')}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="chip-group">
                  {['all', 'tennis', 'pickleball', 'both'].map((s) => (
                    <button
                      key={s}
                      className={`chip ${sport === s ? 'chip-active chip-purple' : ''}`}
                      onClick={() => setSport(s)}
                    >
                      {s === 'all' ? t('search.all') : t(`sports.${s}`)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-row filter-row-secondary">
                <label className="select-wrap">
                  <span className="select-label">{t('members.filterLevel')}</span>
                  <select value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option value="all">{t('search.all')}</option>
                    {levels.map((l) => (
                      <option key={l} value={l}>{t(`levels.${l}`)}</option>
                    ))}
                  </select>
                </label>
                <label className="select-wrap">
                  <span className="select-label">{t('members.filterDistrict')}</span>
                  <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                    <option value="all">{t('search.all')}</option>
                    {['cw', 'wc', 'ea', 'so', 'ytm', 'ssp', 'kc', 'wts', 'kt', 'kwts', 'tw', 'tm', 'yl', 'no', 'tp', 'st', 'sk', 'is'].map((d) => (
                      <option key={d} value={d}>{t(`districts.${d}`)}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {filtered.length === 0 ? (
              <EmptyState icon="👥" title={t('members.noMembers')} />
            ) : (
              <div className="admin-member-table">
                <div className="admin-table-head">
                  <span>{t('admin.colMember') || 'Member'}</span>
                  <span>{t('admin.colSports') || 'Sports'}</span>
                  <span>{t('admin.colLevel') || 'Level'}</span>
                  <span>{t('admin.colDistrict') || 'District'}</span>
                  <span>{t('admin.colRole') || 'Role'}</span>
                  <span>{t('admin.colActions') || 'Actions'}</span>
                </div>
                {filtered.map((m) => (
                  <div key={m.id} className="admin-table-row">
                    <div className="admin-member-cell">
                      <Avatar member={m} size={36} lang={lang} />
                      <div>
                        <strong className="admin-member-name">{m.name}</strong>
                        {m.id === currentUserId && <span className="me-badge" style={{ marginLeft: 6 }}>ME</span>}
                      </div>
                    </div>
                    <div className="admin-sports-cell">
                      {m.sports.map((s) => <SportTag key={s} sport={s} lang={lang} />)}
                    </div>
                    <div>
                      <span className={`level-chip level-chip-${m.level}`}>{t(`levels.${m.level}`)}</span>
                      {m.playStyle && <span className="playstyle-chip" style={{ marginLeft: 4 }}>{t(`playStyles.${m.playStyle}`)}</span>}
                    </div>
                    <div className="admin-meta">{t(`districts.${m.district}`)}</div>
                    <div>
                      <span className={`role-badge role-badge-${m.role || (m.isCoach ? 'coach' : 'player')}`}>
                        {m.role === 'admin' ? '👑' : m.isCoach ? '🏆' : '🎾'} {m.isCoach ? 'Coach' : m.role || 'player'}
                      </span>
                    </div>
                    <div className="admin-actions-cell">
                      <Link to={`/member/${m.id}`} className="btn btn-ghost btn-sm">{t('members.viewProfile')}</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
        </div>
        <div className="container">
          <h1 className="page-title">{t('members.title')}</h1>
          <p className="page-subtitle">{t('members.subtitle')}</p>
        </div>
      </section>

      <section className="filter-section">
        <div className="container">
          <div className="filter-row filter-row-primary">
            <div className="search-box">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              <input
                type="text"
                placeholder={t('members.search')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="chip-group">
              {['all', 'tennis', 'pickleball', 'both'].map((s) => (
                <button
                  key={s}
                  className={`chip ${sport === s ? 'chip-active chip-purple' : ''}`}
                  onClick={() => setSport(s)}
                >
                  {s === 'all' ? t('search.all') : t(`sports.${s}`)}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-row filter-row-secondary">
            <label className="select-wrap">
              <span className="select-label">{t('members.filterLevel')}</span>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="all">{t('search.all')}</option>
                {levels.map((l) => (
                  <option key={l} value={l}>{t(`levels.${l}`)}</option>
                ))}
              </select>
            </label>
            <label className="select-wrap">
              <span className="select-label">{t('members.filterDistrict')}</span>
              <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                <option value="all">{t('search.all')}</option>
                {members
                  .map((m) => m.district)
                  .filter((d, i, a) => a.indexOf(d) === i)
                  .map((d) => (
                    <option key={d} value={d}>
                      {t(`districts.${d}`)}
                    </option>
                  ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="container results-section">
        <p className="results-count">
          <strong>{filtered.length}</strong> {t('members.membersFound')}
        </p>
        {filtered.length === 0 ? (
          <EmptyState icon="👥" title={t('members.noMembers')} />
        ) : (
          <div className="member-grid">
            {filtered.map((m) => (
              <Link to={`/member/${m.id}`} className="member-card" key={m.id}>
                <div className="member-avatar-wrap">
                  <Avatar member={m} size={72} lang={lang} />
                  {m.isMe && <span className="me-badge">ME</span>}
                  {m.isCoach && <span className="coach-badge">COACH</span>}
                </div>
                <h3 className="member-name">{m.name}</h3>
                <p className="member-sub">{L({ en: t(`districts.${m.district}`), zh: t(`districts.${m.district}`) }, lang)}</p>
                <div className="member-tags">
                  {m.sports.map((s) => (
                    <SportTag key={s} sport={s} lang={lang} />
                  ))}
                </div>
                <div className="member-level">
                  <span className="level-chip">{t(`levels.${m.level}`)}</span>
                  {m.playStyle && <span className="playstyle-chip" style={{ marginLeft: 4 }}>{t(`playStyles.${m.playStyle}`)}</span>}
                </div>
                <p className="member-bio">{L(m.bio, lang)}</p>
                <span className="btn btn-ghost btn-sm member-cta">{t('members.viewProfile')} →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}