import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Avatar, SportTag, EmptyState } from '../components/ui'

export const CourtManagementPage = () => {
  const { t, L, lang, courts: allCourts, currentUser } = useApp()
  const navigate = useNavigate()
  const [tab, setTab] = useState('mine')
  const [showClaim, setShowClaim] = useState(false)

  const myClaimed = allCourts.filter((c) => c.claimedBy === currentUser?.id)
  const unclaimed = allCourts.filter((c) => !c.claimedBy)

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
          <h1 className="page-title">{t('courtMgmt.title')}</h1>
          <p className="page-subtitle">{t('courtMgmt.subtitle')}</p>
        </div>
      </section>

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
        </div>
      </section>

      {showClaim && <ClaimNewModal onClose={() => setShowClaim(false)} />}
    </div>
  )
}

const ManagedCourtCard = ({ court }) => {
  const { t, L, lang, claimCourt, unclaimCourt, courts: allCourts, courtRating, updateCourt } = useApp()
  const navigate = useNavigate()
  const rating = courtRating(court.id)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(L(court.name, lang))
  const [nameZh, setNameZh] = useState(court.name.zh)
  const [address, setAddress] = useState(court.address)
  const [hours, setHours] = useState(court.hours)
  const [editPhoto, setEditPhoto] = useState('')

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
      <div className="court-mgmt-card-head">
        <div className="court-mgmt-card-thumb" onClick={() => navigate(`/court/${court.id}`)}>
          <img src={court.photos[0]} alt={L(court.name, lang)} loading="lazy" />
          <span className="court-mgmt-claimed-badge">✓ {t('courtMgmt.claimed')}</span>
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
                <button className="btn btn-forest btn-sm" onClick={() => setEditMode(true)}>
                  ✏️ {t('courtMgmt.edit')}
                </button>
                <button className="btn btn-outline btn-sm" onClick={() => navigate(`/court/${court.id}`)}>
                  👁️ {t('courtMgmt.viewPage')}
                </button>
                <button
                  className="btn btn-outline btn-sm btn-danger-outline"
                  onClick={() => {
                    unclaimCourt(court.id)
                  }}
                >
                  {t('courtMgmt.unclaim')}
                </button>
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
