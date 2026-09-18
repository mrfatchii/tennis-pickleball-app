import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Avatar, SportTag, EmptyState } from '../components/ui'

export const MemberProfilePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    t, L, lang, memberById, currentUserId, updateProfile,
    connectionCount, isConnected, sendConnectRequest, requestState,
    courts, courtById, levels, playStyles, districts
  } = useApp()
  const member = memberById(id)

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const isMe = member?.id === currentUserId
  const loggedIn = !!currentUserId

  if (!member) return <div className="container page"><h1>404</h1></div>

  const connected = isConnected(currentUserId, member.id)
  const req = requestState(currentUserId, member.id)
  const favCourts = member.favCourts?.map(courtById).filter(Boolean) || []
  const connCount = connectionCount(member.id)

  const startEdit = () => {
    setForm({
      name: member.name,
      nameZh: member.nameZh,
      bio: member.bio,
      level: member.level,
      playStyle: member.playStyle || 'both',
      district: member.district,
      sports: [...member.sports],
      favCourts: [...(member.favCourts || [])]
    })
    setEditing(true)
  }

  const save = () => {
    updateProfile(member.id, {
      name: form.name,
      nameZh: form.nameZh,
      bio: { en: form.bio?.en || form.bio, zh: form.bio?.zh || form.bio },
      level: form.level,
      playStyle: form.playStyle,
      district: form.district,
      sports: form.sports
    })
    setEditing(false)
  }

  const toggleSport = (s) => {
    setForm((f) => ({
      ...f,
      sports: f.sports.includes(s) ? f.sports.filter((x) => x !== s) : [...f.sports, s]
    }))
  }

  const levelDesc = (lvl) => {
    const n = parseFloat(lvl)
    if (n >= 5.5) return { en: 'Elite', zh: '精英' }
    if (n >= 4.5) return { en: 'Advanced', zh: '高級' }
    if (n >= 3.5) return { en: 'Intermediate+', zh: '中高級' }
    if (n >= 2.5) return { en: 'Intermediate', zh: '中級' }
    if (n >= 1.5) return { en: 'Beginner+', zh: '初學者+' }
    return { en: 'Beginner', zh: '初學者' }
  }

  if (editing) {
    return (
      <div className="page">
        <div className="container">
          <div className="profile-edit">
            <h1>{t('members.editProfile')}</h1>
            <div className="edit-grid">
              <label>
                <span>{t('members.fullName')} (EN)</span>
                <input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label>
                <span>{t('members.fullName')} (繁)</span>
                <input value={form.nameZh || ''} onChange={(e) => setForm({ ...form, nameZh: e.target.value })} />
              </label>
              <label className="col-span-2">
                <span>{t('members.bio')}</span>
                <textarea
                  rows={4}
                  value={(form.bio && (form.bio.en || form.bio)) || ''}
                  onChange={(e) => setForm({ ...form, bio: { en: e.target.value, zh: form.bio?.zh || form.bio } })}
                  placeholder={t('members.bioPlaceholder')}
                />
              </label>
              <label>
                <span>{t('members.skillLevel')}</span>
                <select value={form.level || ''} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                  {levels.map((l) => (
                    <option key={l} value={l}>{t(`levels.${l}`)} — {L(levelDesc(l), lang)}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t('members.playStyle') || 'Playing Style'}</span>
                <select value={form.playStyle || 'both'} onChange={(e) => setForm({ ...form, playStyle: e.target.value })}>
                  {playStyles.map((ps) => (
                    <option key={ps} value={ps}>{t(`playStyles.${ps}`)}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t('members.district')}</span>
                <select value={form.district || ''} onChange={(e) => setForm({ ...form, district: e.target.value })}>
                  {districts.map((d) => (
                    <option key={d} value={d}>{t(`districts.${d}`)}</option>
                  ))}
                </select>
              </label>
              <div>
                <span className="form-label">{t('members.sports')}</span>
                <div className="chip-group">
                  {['tennis', 'pickleball', 'both'].map((s) => (
                    <button
                      key={s}
                      className={`chip ${form.sports?.includes(s) ? 'chip-active chip-sport' : ''}`}
                      onClick={() => toggleSport(s)}
                    >
                      {t(`sports.${s}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="edit-actions">
              <button className="btn btn-forest" onClick={save}>{t('common.save')}</button>
              <button className="btn btn-ghost" onClick={() => setEditing(false)}>{t('common.cancel')}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      {/* ── PROFILE HEADER ── */}
      <div className="profile-header">
        <div className="profile-header-bg" />
        <div className="container profile-header-inner">
          <div className="profile-header-left">
            <div className="profile-avatar-wrap">
              <Avatar member={member} size={112} lang={lang} />
              {member.isCoach && <span className="coach-badge badge-lg">🏆 COACH</span>}
            </div>
          </div>
          <div className="profile-header-info">
            <div className="profile-name-row">
              <h1 className="profile-name">{member.name}</h1>
              {lang === 'zh' && member.nameZh && (
                <span className="profile-name-zh">{member.nameZh}</span>
              )}
            </div>
            <div className="profile-meta">
              <span className="profile-meta-item">📍 {t(`districts.${member.district}`)}</span>
              <span className="profile-meta-item">🗓 {t('members.memberSince')} {member.joined}</span>
              {isMe && <span className="profile-meta-item me-chip">👤 {lang === 'zh' ? '我的帳戶' : 'My Account'}</span>}
            </div>
            <div className="profile-tags">
              {member.sports.map((s) => (
                <SportTag key={s} sport={s} lang={lang} />
              ))}
              <span className="level-chip big">{t(`levels.${member.level}`)}</span>
              {member.playStyle && (
                <span className="playstyle-chip big">{t(`playStyles.${member.playStyle}`)}</span>
              )}
            </div>
            {member.bio && (
              <p className="profile-bio">{L(member.bio, lang)}</p>
            )}
          </div>
          <div className="profile-header-actions">
            {isMe ? (
              <button className="btn btn-forest" onClick={startEdit}>
                ✎ {t('members.editProfile')}
              </button>
            ) : (loggedIn && !connected && !req) ? (
              <button className="btn btn-lime" onClick={() => sendConnectRequest(member.id)}>
                + {t('matching.connect')}
              </button>
            ) : (loggedIn && req?.from === currentUserId) ? (
              <button className="btn btn-outline" disabled>⏳ {t('matching.requestSent')}</button>
            ) : (loggedIn && connected) ? (
              <button className="btn btn-outline" disabled>✓ {t('matching.connected')}</button>
            ) : null}
            {loggedIn && !isMe && (
              <Link to="/messages" className="btn btn-ghost">💬 {t('nav.messages')}</Link>
            )}
          </div>
        </div>
        {/* ── STATS BAR ── */}
        <div className="profile-stats-bar container">
          <div className="stat-item">
            <span className="stat-num">{t(`levels.${member.level}`)}</span>
            <span className="stat-label">{L(levelDesc(member.level), lang)}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">{connCount}</span>
            <span className="stat-label">{t('members.connections')}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">{member.joined}</span>
            <span className="stat-label">{t('members.memberSince')}</span>
          </div>
          {member.playStyle && (
            <>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-num">{t(`playStyles.${member.playStyle}`)}</span>
                <span className="stat-label">{t('members.playStyle') || 'Style'}</span>
              </div>
            </>
          )}
          {member.isCoach && (
            <>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-num">🏆</span>
                <span className="stat-label">{lang === 'zh' ? '認證教練' : 'Certified Coach'}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container profile-body">
        <div className="profile-columns">
          <div className="profile-col-main">

            {/* Coach Section */}
            {member.isCoach && (
              <div className="profile-section coach-section">
                <div className="coach-section-header">
                  <h2>🏆 {t('coach.title')}</h2>
                  {member.coachCertifications?.length > 0 && (
                    <div className="cert-badge">
                      ✓ {t('coach.certBadge')}
                    </div>
                  )}
                </div>

                <div className="coach-info-grid">
                  <div className="coach-info-card">
                    <span className="coach-info-icon">🎯</span>
                    <div>
                      <strong>{t('coach.yearsExperience')}</strong>
                      <p>{member.coachExp} {t('coach.yearsShort')}</p>
                    </div>
                  </div>
                  <div className="coach-info-card">
                    <span className="coach-info-icon">📊</span>
                    <div>
                      <strong>{t('members.skillLevel')}</strong>
                      <p>{t(`levels.${member.level}`)} — {L(levelDesc(member.level), lang)}</p>
                    </div>
                  </div>
                  <div className="coach-info-card">
                    <span className="coach-info-icon">💰</span>
                    <div>
                      <strong>{t('coach.pricing')}</strong>
                      <p>{member.pricing ? L(member.pricing, lang) : '—'}</p>
                    </div>
                  </div>
                  {member.availableForLessons && (
                    <div className="coach-info-card available">
                      <span className="coach-info-icon">✅</span>
                      <div>
                        <strong>{t('coach.availableForLessons')}</strong>
                        <p>{lang === 'zh' ? '可預約' : 'Booking open'}</p>
                      </div>
                    </div>
                  )}
                </div>

                {member.coachCertifications?.length > 0 && (
                  <div className="coach-certifications">
                    <h3>📜 {t('coach.certifications')}</h3>
                    <div className="cert-list">
                      {member.coachCertifications.map((cert, idx) => (
                        <div key={idx} className="cert-item">
                          <span className="cert-icon">🏅</span>
                          <div className="cert-info">
                            <strong>{L(cert.name, lang)}</strong>
                            <span className="cert-year">{cert.year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {member.coachingAreas?.length > 0 && (
                  <div className="coach-areas">
                    <h3>📋 {t('coach.coachingAreas')}</h3>
                    <div className="areas-chips">
                      {member.coachingAreas.map((area) => (
                        <span key={area} className="area-chip">
                          {t(`coach.area${area.charAt(0).toUpperCase() + area.slice(1)}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {member.bio && (
                  <div className="coach-bio">
                    <strong>{lang === 'zh' ? '教練簡介' : 'About'}</strong>
                    <p>{L(member.bio, lang)}</p>
                  </div>
                )}
                {loggedIn && !isMe && !connected && (
                  <div className="coach-cta">
                    <button className="btn btn-forest" onClick={() => sendConnectRequest(member.id)}>
                      📩 {t('coach.contactCoach')}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Favorite Courts */}
            <div className="profile-section">
              <h2>🏟 {t('members.favoriteCourts')}</h2>
              {favCourts.length ? (
                <div className="fav-court-grid">
                  {favCourts.map((c) => (
                    <Link to={`/court/${c.id}`} className="fav-court-card" key={c.id}>
                      <div className="fav-court-img" style={{ backgroundImage: `url(${c.photos[0]})` }} />
                      <div className="fav-court-body">
                        <strong>{L(c.name, lang)}</strong>
                        <span>{t(`districts.${c.district}`)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState icon="🏟" title={t('members.noFavCourts')} />
              )}
            </div>
          </div>

          <div className="profile-col-side">
            {/* Contact */}
            <div className="sidebar-card">
              <h3>📬 {t('members.contact')}</h3>
              {loggedIn ? (
                <ul className="contact-list">
                  <li><span>✉️</span><span>{member.email}</span></li>
                  <li><span>📞</span><span>{member.phone}</span></li>
                </ul>
              ) : (
                <p className="sidebar-muted">{t('members.contactPrivate')}</p>
              )}
            </div>

            {/* Level Guide */}
            <div className="sidebar-card level-guide">
              <h3>📊 {lang === 'zh' ? 'NTRP 等級參考' : 'NTRP Level Guide'}</h3>
              <div className="level-guide-list">
                {levels.slice(0, 7).map((l) => (
                  <div key={l} className={`level-guide-row ${member.level === l ? 'active' : ''}`}>
                    <span className="level-guide-val">{l}</span>
                    <span className="level-guide-desc">{L(levelDesc(l), lang)}</span>
                    {member.level === l && <span className="level-guide-you">★</span>}
                  </div>
                ))}
                {levels.length > 7 && (
                  <p className="level-guide-more">{lang === 'zh' ? `... 還有 ${levels.length - 7} 個更高等级` : `... and ${levels.length - 7} higher levels`}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
