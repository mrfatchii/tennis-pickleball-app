import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Avatar, SportTag, EmptyState } from '../components/ui'

const LevelBadge = ({ level }) => {
  const n = parseFloat(level)
  const emoji = n >= 5.5 ? '🔥' : n >= 4.0 ? '⚡' : n >= 2.5 ? '📈' : '🌱'
  return (
    <span className={`level-badge level-badge-${level}`}>
      {emoji} {level}
    </span>
  )
}

export const MatchingPage = () => {
  const {
    t, L, lang, members, currentUserId, currentUser,
    isConnected, sendConnectRequest, connectRequests,
    acceptRequest, declineRequest, memberById,
    levels, playStyles
  } = useApp()

  const [sport, setSport] = useState('all')
  const [level, setLevel] = useState('all')
  const [district, setDistrict] = useState('all')
  const [playStyle, setPlayStyle] = useState('all')
  const [viewTab, setViewTab] = useState('players')

  const incoming = connectRequests.filter((r) => r.to === currentUserId && r.status === 'pending')
  const outgoing = connectRequests.filter((r) => r.from === currentUserId && r.status === 'pending')

  const candidates = members.filter((m) => {
    if (m.id === currentUserId) return false
    if (sport !== 'all') {
      if (!m.sports.includes(sport) && !(sport === 'both' && m.sports.length === 2)) return false
    }
    if (level !== 'all' && m.level !== level) return false
    if (district !== 'all' && m.district !== district) return false
    if (playStyle !== 'all' && m.playStyle !== playStyle && m.playStyle !== 'both') return false
    return true
  })

  const coaches = members.filter((m) => {
    if (!m.isCoach) return false
    if (m.id === currentUserId) return false
    if (sport !== 'all') {
      if (!m.sports.includes(sport) && !(sport === 'both' && m.sports.length === 2)) return false
    }
    if (district !== 'all' && m.district !== district) return false
    return true
  })

  const CardActions = ({ m }) => {
    if (isConnected(currentUserId, m.id)) {
      return (
        <div className="match-actions">
          <span className="btn btn-outline btn-sm" disabled>✓ {t('matching.connected')}</span>
          <Link to={`/messages?to=${m.id}`} className="btn btn-ghost btn-sm">💬</Link>
        </div>
      )
    }
    const req = connectRequests.find(
      (r) => (r.from === currentUserId && r.to === m.id) || (r.from === m.id && r.to === currentUserId)
    )
    if (req?.status === 'pending') {
      return (
        <div className="match-actions">
          <span className="btn btn-outline btn-sm" disabled>
            {req.from === currentUserId ? `⏳ ${t('matching.requestSent')}` : `📨 ${t('matching.pendingIncoming')}`}
          </span>
          {req.from !== currentUserId && (
            <button className="btn btn-lime btn-sm" onClick={() => acceptRequest(req.id)}>
              ✓ {t('matching.accept')}
            </button>
          )}
        </div>
      )
    }
    return (
      <div className="match-actions">
        <button className="btn btn-lime btn-sm" onClick={() => sendConnectRequest(m.id)}>
          + {t('matching.connect')}
        </button>
      </div>
    )
  }

  const matchText = (m) => {
    const parts = []
    parts.push(t(`levels.${m.level}`))
    parts.push(t(`districts.${m.district}`))
    return parts.join(' · ')
  }

  return (
    <div className="page">
      {/* ── MATCHING HERO ── */}
      <section className="matching-hero">
        <div className="hero-grid-bg" />
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
        </div>
        <div className="matching-hero-inner">
          <div className="container">
            <h1 className="page-title">
              {lang === 'zh' ? '搵波友 🎾' : 'Find Your '}<em>{lang === 'zh' ? '波友' : 'Playmate'}</em>
            </h1>
            <p className="page-subtitle">
              {lang === 'zh'
                ? `${members.length} 位波友等待與你配對`
                : `Match with ${members.length} players across Hong Kong`}
            </p>
          </div>
        </div>
      </section>

      {/* ── REQUEST SECTIONS ── */}
      {(incoming.length > 0 || outgoing.length > 0) && (
        <section className="container requests-section">
          {incoming.length > 0 && (
            <div className="request-box request-box-in">
              <h3>📨 {t('matching.pendingIncoming')}</h3>
              <div className="request-list">
                {incoming.map((r) => {
                  const m = memberById(r.from)
                  return (
                    <div className="request-row" key={r.id}>
                      <Link to={`/member/${m.id}`} className="request-user">
                        <Avatar member={m} size={40} lang={lang} />
                        <div>
                          <strong>{m.name}</strong>
                          <span>{matchText(m)}</span>
                        </div>
                      </Link>
                      <div className="request-actions">
                        <button className="btn btn-lime btn-sm" onClick={() => acceptRequest(r.id)}>
                          ✓ {t('matching.accept')}
                        </button>
                        <button className="btn btn-ghost btn-sm" onClick={() => declineRequest(r.id)}>
                          ✕ {t('matching.decline')}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {outgoing.length > 0 && (
            <div className="request-box">
              <h3>⏳ {t('matching.pendingOutgoing')}</h3>
              <div className="request-list">
                {outgoing.map((r) => {
                  const m = memberById(r.to)
                  return (
                    <div className="request-row" key={r.id}>
                      <div className="request-user">
                        <Avatar member={m} size={40} lang={lang} />
                        <div>
                          <strong>{m.name}</strong>
                          <span>{matchText(m)}</span>
                        </div>
                      </div>
                      <span className="pending-chip">⏳ {t('matching.requestSent')}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── VIEW TABS: Find Players / Find Coaches ── */}
      <section className="container" style={{ paddingTop: 20, paddingBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, borderBottom: '2px solid var(--border)', marginBottom: 16 }}>
          <button
            onClick={() => setViewTab('players')}
            style={{
              padding: '10px 24px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700,
              color: viewTab === 'players' ? 'var(--purple)' : 'var(--text-muted)',
              borderBottom: viewTab === 'players' ? '2.5px solid var(--purple)' : '2.5px solid transparent',
              transition: 'all 0.15s', marginBottom: -2
            }}
          >
            🎾 {t('matching.findPlayers') || 'Find Players'} {candidates.length > 0 && <span style={{ marginLeft: 6, fontSize: '0.75rem', background: 'var(--purple)', color: '#fff', borderRadius: 10, padding: '1px 6px' }}>{candidates.length}</span>}
          </button>
          <button
            onClick={() => setViewTab('coaches')}
            style={{
              padding: '10px 24px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700,
              color: viewTab === 'coaches' ? 'var(--purple)' : 'var(--text-muted)',
              borderBottom: viewTab === 'coaches' ? '2.5px solid var(--purple)' : '2.5px solid transparent',
              transition: 'all 0.15s', marginBottom: -2
            }}
          >
            🏆 {t('matching.findCoaches') || 'Find Coaches'} {coaches.length > 0 && <span style={{ marginLeft: 6, fontSize: '0.75rem', background: 'var(--orange)', color: '#fff', borderRadius: 10, padding: '1px 6px' }}>{coaches.length}</span>}
          </button>
        </div>

        {viewTab === 'coaches' && coaches.length > 0 && (
          <div style={{ marginBottom: 16, padding: '12px 16px', background: 'color-mix(in srgb, var(--orange) 8%, var(--bg-soft))', borderRadius: 'var(--radius)', border: '1px solid color-mix(in srgb, var(--orange) 25%, transparent)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            🏆 {t('matching.coachesNote') || `${coaches.length} certified coach${coaches.length !== 1 ? 'es' : ''} available for lessons and training`}
          </div>
        )}
      </section>

      {/* ── FILTER BAR ── */}
      <section className="container" style={{ paddingTop: 24, paddingBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div className="chip-group" style={{ display: 'flex', gap: 6 }}>
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
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: 20, border: '1.5px solid var(--border)', fontSize: '0.82rem', fontWeight: 600, color: level !== 'all' ? 'var(--purple)' : 'var(--text)', background: level !== 'all' ? 'rgba(var(--purple-rgb), 0.06)' : 'var(--surface)', cursor: 'pointer', transition: 'all 0.15s' }}
          >
            <option value="all">{t('matching.filterLevel') || 'All Levels'}</option>
            {levels.map((l) => (
              <option key={l} value={l}>{t(`levels.${l}`)}</option>
            ))}
          </select>
          <select
            value={playStyle}
            onChange={(e) => setPlayStyle(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: 20, border: '1.5px solid var(--border)', fontSize: '0.82rem', fontWeight: 600, color: playStyle !== 'all' ? 'var(--purple)' : 'var(--text)', background: playStyle !== 'all' ? 'rgba(var(--purple-rgb), 0.06)' : 'var(--surface)', cursor: 'pointer', transition: 'all 0.15s' }}
          >
            <option value="all">{t('matching.filterPlayStyle') || 'All Styles'}</option>
            {playStyles.map((ps) => (
              <option key={ps} value={ps}>{t(`playStyles.${ps}`)}</option>
            ))}
          </select>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: 20, border: '1.5px solid var(--border)', fontSize: '0.82rem', fontWeight: 600, color: district !== 'all' ? 'var(--purple)' : 'var(--text)', background: district !== 'all' ? 'rgba(var(--purple-rgb), 0.06)' : 'var(--surface)', cursor: 'pointer', transition: 'all 0.15s' }}
          >
            <option value="all">{t('matching.filterDistrict') || 'All Districts'}</option>
            {members
              .map((m) => m.district)
              .filter((d, i, a) => a.indexOf(d) === i)
              .map((d) => (
                <option key={d} value={d}>{t(`districts.${d}`)}</option>
              ))}
          </select>
        </div>
      </section>

      {/* ── MATCH RESULTS ── */}
      <section className="container" style={{ paddingTop: 24, paddingBottom: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 12 }}>
          <p className="section-eyebrow" style={{ marginBottom: 0 }}>
            {viewTab === 'coaches'
              ? (lang === 'zh' ? '教練列表' : 'Coach List')
              : (lang === 'zh' ? '波友列表' : 'Player List')}
            <strong style={{ marginLeft: 8, fontSize: '1rem', color: 'var(--text)' }}>
              {viewTab === 'coaches' ? coaches.length : candidates.length}
            </strong>
          </p>
        </div>

        {(viewTab === 'coaches' ? coaches : candidates).length === 0 ? (
          <EmptyState icon={viewTab === 'coaches' ? '🏆' : '🎾'} title={viewTab === 'coaches' ? (t('matching.noCoaches') || 'No coaches found') : t('matching.noMatches')} />
        ) : (
          <div className="match-grid">
            {(viewTab === 'coaches' ? coaches : candidates).map((m) => (
              <div className="match-card" key={m.id}>
                <Link to={`/member/${m.id}`} className="match-card-top">
                  <div style={{ position: 'relative' }}>
                    <Avatar member={m} size={52} lang={lang} />
                    {m.isCoach && <span style={{ position: 'absolute', bottom: -2, right: -2, background: 'var(--orange)', color: '#fff', fontSize: '0.58rem', fontWeight: 800, padding: '1px 3px', borderRadius: 3, letterSpacing: '0.03em' }}>COACH</span>}
                  </div>
                  <div className="match-card-info">
                    <strong className="match-name">{m.name}</strong>
                    <span className="match-meta">
                      {t(`districts.${m.district}`)}
                    </span>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                      <LevelBadge level={m.level} />
                      {m.playStyle && (
                        <span className="playstyle-chip">{t(`playStyles.${m.playStyle}`)}</span>
                      )}
                      {m.sports.map((s) => (
                        <SportTag key={s} sport={s} lang={lang} />
                      ))}
                    </div>
                  </div>
                </Link>
                <p className="match-bio">{L(m.bio, lang)}</p>
                <CardActions m={m} />
              </div>
            ))}
          </div>
        )}

        <div className="matching-hint">
          <p>{t('matching.connectHint')}</p>
        </div>
      </section>
    </div>
  )
}