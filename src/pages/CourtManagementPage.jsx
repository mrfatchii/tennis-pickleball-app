import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Avatar, SportTag, EmptyState } from '../components/ui'

export const CourtManagementPage = () => {
  const { t, L, lang, courts: allCourts, currentUser, isAdmin } = useApp()
  const navigate = useNavigate()
  const [tab, setTab] = useState('mine')
  const [showClaim, setShowClaim] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  const myClaimed = allCourts.filter((c) => c.claimedBy === currentUser?.id)
  const unclaimed = allCourts.filter((c) => !c.claimedBy)
  const allCourtsForAdmin = isAdmin ? allCourts : []

  return (
    <div className="page court-mgmt-page">
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
        </div>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h1 className="page-title">{t('courtMgmt.title')}</h1>
            {isAdmin && (
              <span className="court-mgmt-admin-badge">
                👑 {lang === 'zh' ? '管理員模式' : 'Admin Mode'}
              </span>
            )}
          </div>
          <p className="page-subtitle">{t('courtMgmt.subtitle')}</p>
        </div>
      </section>

      {isAdmin && (
        <section style={{ background: '#eff6ff', borderBottom: '1px solid #bfdbfe' }}>
          <div className="container" style={{ padding: '12px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#1e40af' }}>
              <span>ℹ️</span>
              <span>
                {lang === 'zh'
                  ? '你以管理員身份登入，可以管理所有場地或只管理自己的場地。'
                  : 'You are logged in as Admin. You can manage all courts or just your own courts.'}
              </span>
            </div>
          </div>
        </section>
      )}

      <section className="filter-section">
        <div className="container">
          <div className="filter-row filter-row-primary">
            <div className="chip-group">
              <button
                className={`chip ${tab === 'mine' ? 'chip-active chip-sport' : ''}`}
                onClick={() => setTab('mine')}
              >
                {t('courtMgmt.myCourts')} ({myClaimed.length})
              </button>
              <button
                className={`chip ${tab === 'unclaimed' ? 'chip-active chip-sport' : ''}`}
                onClick={() => setTab('unclaimed')}
              >
                {t('courtMgmt.unclaimed')} ({unclaimed.length})
              </button>
              <button
                className={`chip ${tab === 'claim' ? 'chip-active chip-sport' : ''}`}
                onClick={() => setShowClaim(true)}
              >
                + {t('courtMgmt.claimNew')}
              </button>
              {isAdmin && (
                <button
                  className={`chip ${tab === 'all' ? 'chip-active chip-sport' : ''}`}
                  onClick={() => setTab('all')}
                  style={{ background: '#3b82f620', borderColor: '#3b82f6' }}
                >
                  👑 {lang === 'zh' ? '所有場地' : 'All Courts'} ({allCourts.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="results-section">
        <div className="container">
          {tab === 'mine' && (
            myClaimed.length === 0 ? (
              <EmptyState
                icon="🏟️"
                title={t('courtMgmt.noMyCourts')}
                action={
                  <button className="btn btn-forest" onClick={() => setTab('unclaimed')}>
                    {t('courtMgmt.findCourts')}
                  </button>
                }
              />
            ) : (
              <div className="court-mgmt-list">
                {myClaimed.map((court) => (
                  <ManagedCourtCard key={court.id} court={court} />
                ))}
              </div>
            )
          )}

          {tab === 'unclaimed' && (
            unclaimed.length === 0 ? (
              <EmptyState icon="✅" title={t('courtMgmt.allClaimed')} />
            ) : (
              <div className="court-mgmt-list">
                {unclaimed.map((court) => (
                  <div key={court.id} className="court-mgmt-row">
                    <div className="court-mgmt-row-info" onClick={() => navigate(`/court/${court.id}`)}>
                      <div className="court-mgmt-thumb">
                        <img src={court.photos[0]} alt={L(court.name, lang)} loading="lazy" />
                      </div>
                      <div>
                        <h3 className="court-mgmt-row-name">{L(court.name, lang)}</h3>
                        <div className="court-mgmt-row-meta">
                          <SportTag sport={court.sport} small />
                          <span className="court-address-small">{court.address}</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-lime" onClick={() => navigate(`/court/${court.id}`)}>
                      {t('courtMgmt.viewAndClaim')}
                    </button>
                  </div>
                ))}
              </div>
            )
          )}

          {tab === 'all' && isAdmin && (
            allCourts.length === 0 ? (
              <EmptyState icon="🎾" title={lang === 'zh' ? '沒有場地' : 'No courts'} />
            ) : (
              <div className="court-mgmt-list">
                {allCourts.map((court) => (
                  <ManagedCourtCard key={court.id} court={court} isAdminView={true} />
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
            <h3>{lang === 'zh' ? '確認取消認領' : 'Confirm Unclaim'}</h3>
            <p>{lang === 'zh'
              ? '確定要取消認領這個場地嗎？這將會移除你對這個場地的管理權限。'
              : 'Are you sure you want to unclaim this court? This will remove your management rights for this court.'}</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowDeleteConfirm(null)}>
                {t('common.cancel')}
              </button>
              <button className="btn-danger" onClick={() => {
                unclaimCourt(showDeleteConfirm)
                setShowDeleteConfirm(null)
              }}>
                {t('common.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showClaim && <ClaimNewModal onClose={() => setShowClaim(false)} />}
    </div>
  )
}

const ManagedCourtCard = ({ court, isAdminView = false }) => {
  const { t, L, lang, claimCourt, unclaimCourt, courts: allCourts, courtRating, updateCourt, deleteCourt, currentUser } = useApp()
  const navigate = useNavigate()
  const rating = courtRating(court.id)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(L(court.name, lang))
  const [nameZh, setNameZh] = useState(court.name.zh)
  const [address, setAddress] = useState(court.address)
  const [hours, setHours] = useState(court.hours)
  const [editPhoto, setEditPhoto] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const isMyCourt = court.claimedBy === currentUser?.id

  const save = () => {
    updateCourt(court.id, {
      name: { en: name.trim(), zh: nameZh.trim() || name.trim() },
      address: address.trim(),
      hours: hours.trim(),
      ...(editPhoto.trim() && { photos: [editPhoto.trim(), ...court.photos.slice(1)] })
    })
    setEditMode(false)
  }

  return (
    <div className="court-mgmt-card">
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
            <h3>{lang === 'zh' ? '確認刪除場地' : 'Confirm Delete Court'}</h3>
            <p>{lang === 'zh'
              ? `確定要刪除「${L(court.name, lang)}」嗎？此操作無法撤銷。`
              : `Are you sure you want to delete "${L(court.name, lang)}"? This action cannot be undone.`}</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                {t('common.cancel')}
              </button>
              <button className="btn-danger" onClick={() => {
                deleteCourt(court.id)
                setShowDeleteConfirm(false)
              }}>
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="court-mgmt-card-head">
        <div className="court-mgmt-card-thumb" onClick={() => navigate(`/court/${court.id}`)}>
          <img src={court.photos[0]} alt={L(court.name, lang)} loading="lazy" />
          {court.claimedBy ? (
            <span className="court-mgmt-claimed-badge">✓ {t('courtMgmt.claimed')}</span>
          ) : (
            <span className="court-mgmt-claimed-badge" style={{ background: '#f59e0b' }}>⏳ {t('courtMgmt.unclaimed')}</span>
          )}
          {isAdminView && (
            <span className="court-mgmt-admin-badge" style={{ position: 'absolute', top: '8px', right: '8px' }}>
              👑 Admin
            </span>
          )}
        </div>
        <div className="court-mgmt-card-info">
          {editMode ? (
            <div className="form-stack">
              <label className="field">
                <span className="field-label">{t('courtMgmt.name')} (EN)</span>
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className="field">
                <span className="field-label">{t('courtMgmt.name')} (繁中)</span>
                <input value={nameZh} onChange={(e) => setNameZh(e.target.value)} />
              </label>
              <label className="field">
                <span className="field-label">{t('courtMgmt.address')}</span>
                <input value={address} onChange={(e) => setAddress(e.target.value)} />
              </label>
              <label className="field">
                <span className="field-label">{t('courtMgmt.hours')}</span>
                <input value={hours} onChange={(e) => setHours(e.target.value)} />
              </label>
              <label className="field">
                <span className="field-label">{t('courtMgmt.photoUrl')}</span>
                <input value={editPhoto} onChange={(e) => setEditPhoto(e.target.value)} placeholder="https://..." />
              </label>
              <div className="modal-foot" style={{ marginTop: 8 }}>
                <button className="btn btn-outline" onClick={() => setEditMode(false)}>{t('common.cancel')}</button>
                <button className="btn btn-lime" onClick={save}>{t('common.save')}</button>
              </div>
            </div>
          ) : (
            <>
              <div className="court-mgmt-card-name" onClick={() => navigate(`/court/${court.id}`)}>
                <h3>{L(court.name, lang)}</h3>
                {rating > 0 && <span className="rating-pill-sm">★ {rating.toFixed(1)}</span>}
              </div>
              <div className="court-mgmt-card-meta">
                <SportTag sport={court.sport} small />
                <span className="court-address-small">{court.address}</span>
              </div>
              <div className="court-mgmt-stats">
                <span>⏰ {court.hours}</span>
                <span>📍 {t(`districts.${court.district}`)}</span>
                <span>🌿 {court.surface}</span>
              </div>
              <div className="court-mgmt-facilities">
                {court.lit && <span className="facility-chip">💡 {t('courtMgmt.lit')}</span>}
                {court.free && <span className="facility-chip">🆓 {t('courtMgmt.free')}</span>}
                {court.environment && <span className="facility-chip">{court.environment === 'indoor' ? '🏠' : court.environment === 'outdoor' ? '☀️' : '⛺'} {t(`environments.${court.environment}`)}</span>}
              </div>
              <div className="court-mgmt-actions">
                {(isMyCourt || isAdminView) && (
                  <>
                    <button className="btn btn-forest btn-sm" onClick={() => setEditMode(true)}>
                      ✏️ {t('courtMgmt.edit')}
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => navigate(`/court/${court.id}`)}>
                      👁️ {t('courtMgmt.viewPage')}
                    </button>
                    {isMyCourt && (
                      <button
                        className="btn btn-outline btn-sm btn-danger-outline"
                        onClick={() => setShowDeleteConfirm(true)}
                      >
                        {t('courtMgmt.unclaim')}
                      </button>
                    )}
                  </>
                )}
                {isAdminView && isMyCourt && (
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ borderColor: '#ef4444', color: '#ef4444' }}
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    🗑️ {lang === 'zh' ? '刪除場地' : 'Delete Court'}
                  </button>
                )}
                {isAdminView && !isMyCourt && (
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ borderColor: '#ef4444', color: '#ef4444' }}
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    🗑️ {lang === 'zh' ? '刪除場地' : 'Delete Court'}
                  </button>
                )}
                {!isMyCourt && !isAdminView && court.claimedBy && (
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {lang === 'zh' ? '由其他會員管理' : 'Managed by another member'}
                  </span>
                )}
                {!isMyCourt && !isAdminView && !court.claimedBy && (
                  <button className="btn btn-lime btn-sm" onClick={() => navigate(`/court/${court.id}`)}>
                    {t('courtMgmt.viewAndClaim')}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const ClaimNewModal = ({ onClose }) => {
  const { t, L, lang, courts: allCourts, claimCourt } = useApp()
  const navigate = useNavigate()
  const unclaimed = allCourts.filter((c) => !c.claimedBy)
  const [selected, setSelected] = useState(null)

  const claim = () => {
    if (!selected) return
    claimCourt(selected)
    onClose()
    navigate(`/court/${selected}`)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{t('courtMgmt.claimNew')}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <p className="modal-hint">{t('courtMgmt.claimHint')}</p>
          <div className="claim-list">
            {unclaimed.map((c) => (
              <div
                key={c.id}
                className={`claim-option ${selected === c.id ? 'selected' : ''}`}
                onClick={() => setSelected(c.id)}
              >
                <img src={c.photos[0]} alt={L(c.name, lang)} className="claim-thumb" />
                <div>
                  <strong>{L(c.name, lang)}</strong>
                  <div className="court-address-small">{c.address}</div>
                </div>
                {selected === c.id && <span className="claim-check">✓</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>{t('common.cancel')}</button>
          <button className="btn btn-lime" onClick={claim} disabled={!selected}>
            {t('courtMgmt.claim')}
          </button>
        </div>
      </div>
    </div>
  )
}
