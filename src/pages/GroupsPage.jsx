import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Avatar, SportTag, EmptyState } from '../components/ui'

export const GroupsPage = () => {
  const { t, L, lang, groups } = useApp()
  const [sport, setSport] = useState('all')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = useMemo(() => {
    let list = groups
    if (sport === 'tennis') list = list.filter((g) => g.sports.includes('tennis'))
    if (sport === 'pickleball') list = list.filter((g) => g.sports.includes('pickleball'))
    return list
  }, [groups, sport])

  const sportOptions = [
    ['all', t('search.all')],
    ['tennis', t('sports.tennis')],
    ['pickleball', t('sports.pickleball')]
  ]

  return (
    <div className="page groups-page">
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
        </div>
        <div className="container">
          <h1 className="page-title">{t('groups.title')}</h1>
          <p className="page-subtitle">{t('groups.subtitle')}</p>
          <div className="page-actions">
            <button className="btn btn-lime btn-lg" onClick={() => setShowCreate(true)}>
              + {t('groups.createGroup')}
            </button>
          </div>
        </div>
      </section>

      <section className="filter-section">
        <div className="container">
          <div className="filter-row filter-row-primary">
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
          </div>
        </div>
      </section>

      <section className="results-section">
        <div className="container">
          {filtered.length === 0 ? (
            <EmptyState
              icon="🥎"
              title={t('groups.noGroups')}
              action={
                <button className="btn btn-forest" onClick={() => setShowCreate(true)}>
                  {t('groups.createGroup')}
                </button>
              }
            />
          ) : (
            <div className="group-grid">
              {filtered.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </div>
      </section>

      {showCreate && <CreateGroupModal onClose={() => setShowCreate(false)} />}
    </div>
  )
}

const GroupCard = ({ group }) => {
  const { t, L, lang, currentUser, memberById, joinGroup } = useApp()
  const navigate = useNavigate()
  const admin = memberById(group.adminId)
  const isMember = currentUser && group.members.includes(currentUser.id)

  return (
    <div className="group-card" onClick={() => navigate(`/groups/${group.id}`)}>
      <div className="group-card-head">
        <div className="group-card-icon" style={{ backgroundColor: group.sports.length > 1 ? '#734f9a' : '#965fd4' }}>
          {group.sports.length > 1 ? '🏓' : group.sports[0] === 'tennis' ? '🎾' : '🏓'}
        </div>
        <div className="group-card-titles">
          <h3 className="group-card-name">{L(group.name, lang)}</h3>
          <div className="group-card-meta">
            <span className={`group-type-badge group-type-${group.type}`}>
              {t(`groupTypes.${group.type}`)}
            </span>
            <span className="group-card-count">
              {group.members.length} {group.members.length === 1 ? t('groups.member') : t('groups.members')}
            </span>
          </div>
        </div>
      </div>
      <div className="group-card-tags">
        {group.sports.map((s) => (
          <SportTag key={s} sport={s} small />
        ))}
        <span className="level-chip">{t(`levels.${group.level}`)}</span>
      </div>
      <p className="group-card-desc">{L(group.description, lang)}</p>
      <div className="group-card-venue">
        <span className="venue-label">{t('groups.venuePrefs')}:</span> {L(group.venuePrefs, lang)}
      </div>
      <div className="group-card-foot">
        <div className="group-card-admin">
          <Avatar member={admin} size={26} />
          <span>{admin?.name}</span>
        </div>
        {isMember ? (
          <span className="group-joined-badge">✓ {t('groups.joined')}</span>
        ) : (
          <button
            className={`btn ${group.type === 'public' ? 'btn-forest' : 'btn-outline'}`}
            onClick={(e) => {
              e.stopPropagation()
              joinGroup(group.id)
            }}
          >
            {group.type === 'public' ? t('groups.join') : t('groups.requestToJoin')}
          </button>
        )}
      </div>
    </div>
  )
}

const CreateGroupModal = ({ onClose }) => {
  const { t, createGroup, sports, groupTypes, levels } = useApp()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [nameZh, setNameZh] = useState('')
  const [type, setType] = useState('public')
  const [sportSel, setSportSel] = useState(['tennis'])
  const [level, setLevel] = useState('intermediate')
  const [venuePrefs, setVenuePrefs] = useState('')
  const [venuePrefsZh, setVenuePrefsZh] = useState('')
  const [description, setDescription] = useState('')
  const [descriptionZh, setDescriptionZh] = useState('')

  const toggleSport = (s) => {
    setSportSel((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  const submit = () => {
    if (!name.trim()) return
    const id = createGroup({
      name: { en: name.trim(), zh: nameZh.trim() || name.trim() },
      type,
      sports: sportSel,
      level,
      venuePrefs: { en: venuePrefs.trim(), zh: venuePrefsZh.trim() || venuePrefs.trim() },
      description: { en: description.trim(), zh: descriptionZh.trim() || description.trim() }
    })
    onClose()
    navigate(`/groups/${id}`)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{t('groups.createTitle')}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body form-stack">
          <label className="field">
            <span className="field-label">{t('groups.name')} (EN)</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('groups.namePlaceholder')} />
          </label>
          <label className="field">
            <span className="field-label">{t('groups.name')} (繁中)</span>
            <input value={nameZh} onChange={(e) => setNameZh(e.target.value)} placeholder={t('groups.namePlaceholder')} />
          </label>
          <div className="field">
            <span className="field-label">{t('groups.type')}</span>
            <div className="segmented">
              {groupTypes.map((gt) => (
                <button
                  key={gt}
                  className={`segment ${type === gt ? 'active' : ''}`}
                  onClick={() => setType(gt)}
                >
                  {t(`groupTypes.${gt}`)}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <span className="field-label">{t('groups.sports')}</span>
            <div className="chip-group">
              {sports.filter((s) => s !== 'both').map((s) => (
                <button
                  key={s}
                  className={`chip ${sportSel.includes(s) ? 'chip-active chip-sport' : ''}`}
                  onClick={() => toggleSport(s)}
                >
                  {t(`sports.${s}`)}
                </button>
              ))}
            </div>
          </div>
          <label className="field">
            <span className="field-label">{t('groups.skillLevel')}</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              {levels.map((lv) => (
                <option key={lv} value={lv}>{t(`levels.${lv}`)}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field-label">{t('groups.venuePrefs')} (EN)</span>
            <input value={venuePrefs} onChange={(e) => setVenuePrefs(e.target.value)} placeholder={t('groups.venuePrefsPlaceholder')} />
          </label>
          <label className="field">
            <span className="field-label">{t('groups.venuePrefs')} (繁中)</span>
            <input value={venuePrefsZh} onChange={(e) => setVenuePrefsZh(e.target.value)} placeholder={t('groups.venuePrefsPlaceholder')} />
          </label>
          <label className="field">
            <span className="field-label">{t('groups.description')} (EN)</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('groups.descPlaceholder')} rows={3} />
          </label>
          <label className="field">
            <span className="field-label">{t('groups.description')} (繁中)</span>
            <textarea value={descriptionZh} onChange={(e) => setDescriptionZh(e.target.value)} placeholder={t('groups.descPlaceholder')} rows={3} />
          </label>
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>{t('common.cancel')}</button>
          <button className="btn btn-lime" onClick={submit} disabled={!name.trim()}>
            {t('groups.create')}
          </button>
        </div>
      </div>
    </div>
  )
}

export const GroupDetailPage = () => {
  const { id } = useParams()
  const { t, L, lang, groupById, currentUser, memberById, joinGroup, leaveGroup, joinActivity, addActivity } = useApp()
  const navigate = useNavigate()
  const [showActivity, setShowActivity] = useState(false)
  const group = groupById(id)

  if (!group) {
    return (
      <div className="page">
        <div className="container">
          <EmptyState icon="🤔" title="Group not found" />
        </div>
      </div>
    )
  }

  const admin = memberById(group.adminId)
  const isMember = currentUser && group.members.includes(currentUser.id)
  const isAdmin = currentUser && group.adminId === currentUser.id

  return (
    <div className="page group-detail-page">
      <section className="page-hero group-detail-hero">
        <div className="container">
          <button className="btn-back" onClick={() => navigate('/groups')}>← {t('common.back')}</button>
          <div className="group-detail-head">
            <div className="group-detail-icon" style={{ backgroundColor: group.sports.length > 1 ? '#734f9a' : '#965fd4' }}>
              {group.sports.length > 1 ? '🏓' : group.sports[0] === 'tennis' ? '🎾' : '🏓'}
            </div>
            <div>
              <h1 className="page-title">{L(group.name, lang)}</h1>
              <div className="group-card-meta">
                <span className={`group-type-badge group-type-${group.type}`}>{t(`groupTypes.${group.type}`)}</span>
                <span className="group-card-count">
                  {group.members.length} {group.members.length === 1 ? t('groups.member') : t('groups.members')}
                </span>
                {group.type === 'invite' && !isMember && <span className="invite-hint">• {t('groups.inviteHint')}</span>}
              </div>
            </div>
          </div>
          <div className="group-card-tags">
            {group.sports.map((s) => (
              <SportTag key={s} sport={s} small />
            ))}
            <span className="level-chip">{t(`levels.${group.level}`)}</span>
          </div>
        </div>
      </section>

      <section className="results-section">
        <div className="container group-detail-layout">
          <div className="group-detail-main">
            <div className="detail-panel">
              <h2 className="panel-title">{t('groups.about')}</h2>
              <p className="detail-about-text">{L(group.description, lang)}</p>
              <div className="detail-fact">
                <span className="fact-label">{t('groups.venuePrefs')}</span>
                <span>{L(group.venuePrefs, lang)}</span>
              </div>
              <div className="detail-fact">
                <span className="fact-label">{t('groups.organizer')}</span>
                <span>{admin?.name}</span>
              </div>
            </div>

            <div className="detail-panel">
              <div className="panel-head-row">
                <h2 className="panel-title">{t('groups.activities')}</h2>
                {isMember && (
                  <button className="btn btn-forest btn-sm" onClick={() => setShowActivity(true)}>
                    + {t('groups.createActivity')}
                  </button>
                )}
              </div>
              {group.activities.length === 0 ? (
                <EmptyState icon="📅" title={t('groups.noGroups')} />
              ) : (
                <div className="activity-list">
                  {group.activities.map((a) => {
                    const spotsLeft = a.max - a.joined.length
                    const joined = currentUser && a.joined.includes(currentUser.id)
                    const full = spotsLeft <= 0
                    return (
                      <div key={a.id} className="activity-card">
                        <div className="activity-date-block">
                          <span className="activity-date">{a.date}</span>
                          <span className="activity-time">{a.time}</span>
                        </div>
                        <div className="activity-body">
                          <h4 className="activity-title">{L(a.title, lang)}</h4>
                          <div className="activity-venue">📍 {L(a.venue, lang)}</div>
                          <div className="activity-avatars">
                            {a.joined.map((mid) => (
                              <Avatar key={mid} member={memberById(mid)} size={24} />
                            ))}
                            <span className="activity-spots">
                              {spotsLeft > 0 ? `${spotsLeft} ${t('groups.activitySpots')}` : t('groups.activitySpots') + ' 0'}
                            </span>
                          </div>
                        </div>
                        {isMember && (
                          <button
                            className={`btn ${joined ? 'btn-done' : full ? 'btn-disabled' : 'btn-lime'}`}
                            disabled={joined || full}
                            onClick={() => joinActivity(group.id, a.id)}
                          >
                            {joined ? '✓ ' + t('groups.joinedActivity') : full ? t('groups.activitySpots') + ' 0' : t('groups.joinActivity')}
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="group-detail-side">
            <div className="detail-panel">
              <h2 className="panel-title">{t('groups.membersTab')} ({group.members.length})</h2>
              <div className="member-mini-list">
                {group.members.map((mid) => {
                  const m = memberById(mid)
                  return (
                    <div key={mid} className="member-mini-row" onClick={() => navigate(`/member/${mid}`)}>
                      <Avatar member={m} size={34} />
                      <div className="member-mini-info">
                        <span className="member-mini-name">{m?.name}</span>
                        <span className="member-mini-level">{t(`levels.${m?.level}`)}</span>
                      </div>
                      {group.adminId === mid && <span className="admin-badge">{t('groups.admin')}</span>}
                    </div>
                  )
                })}
              </div>
              {isMember ? (
                <button className="btn btn-outline btn-block btn-danger-outline" onClick={() => { leaveGroup(group.id); navigate('/groups') }}>
                  {t('groups.leave')}
                </button>
              ) : (
                <button
                  className={`btn ${group.type === 'public' ? 'btn-forest' : 'btn-outline'} btn-block`}
                  onClick={() => joinGroup(group.id)}
                >
                  {group.type === 'public' ? t('groups.join') : t('groups.requestToJoin')}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {showActivity && (
        <CreateActivityModal groupId={group.id} onClose={() => setShowActivity(false)} addActivity={addActivity} />
      )}
    </div>
  )
}

const CreateActivityModal = ({ groupId, onClose, addActivity }) => {
  const { t } = useApp()
  const [title, setTitle] = useState('')
  const [titleZh, setTitleZh] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState('')
  const [venueZh, setVenueZh] = useState('')
  const [max, setMax] = useState(8)

  const submit = () => {
    if (!title.trim() || !date || !time || !venue.trim()) return
    addActivity(groupId, {
      title: { en: title.trim(), zh: titleZh.trim() || title.trim() },
      date,
      time,
      venue: { en: venue.trim(), zh: venueZh.trim() || venue.trim() },
      max: Number(max) || 8
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{t('groups.createActivity')}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body form-stack">
          <label className="field">
            <span className="field-label">{t('groups.activityTitle')} (EN) *</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">{t('groups.activityTitle')} (繁中)</span>
            <input value={titleZh} onChange={(e) => setTitleZh(e.target.value)} />
          </label>
          <div className="form-row">
            <label className="field">
              <span className="field-label">{t('groups.activityDate')} *</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label className="field">
              <span className="field-label">{t('groups.activityTime')} *</span>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
          </div>
          <label className="field">
            <span className="field-label">{t('groups.activityVenue')} (EN) *</span>
            <input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder={t('groups.activityVenuePlaceholder')} />
          </label>
          <label className="field">
            <span className="field-label">{t('groups.activityVenue')} (繁中)</span>
            <input value={venueZh} onChange={(e) => setVenueZh(e.target.value)} placeholder={t('groups.activityVenuePlaceholder')} />
          </label>
          <label className="field">
            <span className="field-label">{t('groups.activityMax')}</span>
            <input type="number" min="2" max="64" value={max} onChange={(e) => setMax(e.target.value)} />
          </label>
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>{t('common.cancel')}</button>
          <button
            className="btn btn-lime"
            onClick={submit}
            disabled={!title.trim() || !date || !time || !venue.trim()}
          >
            {t('groups.createActivity')}
          </button>
        </div>
      </div>
    </div>
  )
}
