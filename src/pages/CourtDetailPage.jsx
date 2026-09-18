import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { SportTag, RatingPill, StarRating, Avatar } from '../components/ui'
import { CourtMap } from '../components/CourtMap'

export const CourtDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    t, L, lang, courtById, reviewsForCourt, courtRating, memberById,
    currentUser, currentUserId, addReview, deleteReview, claimCourt, unclaimCourt,
    updateCourt, isConnected, connectionCount, isAdmin
  } = useApp()
  const court = courtById(id)
  const [activePhoto, setActivePhoto] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editName, setEditName] = useState('')
  const [editNameZh, setEditNameZh] = useState('')
  const [editOpening, setEditOpening] = useState('')
  const [editAddress, setEditAddress] = useState('')
  const [editAddressZh, setEditAddressZh] = useState('')
  const [deleteReviewConfirm, setDeleteReviewConfirm] = useState(null)

  if (!court) {
    return (
      <div className="container page">
        <h1>404</h1>
        <Link to="/" className="btn btn-forest">{t('common.back')}</Link>
      </div>
    )
  }

  const avgRating = courtRating(court.id)
  const courtReviews = reviewsForCourt(court.id)
  const claimedBy = court.claimedBy ? memberById(court.claimedBy) : null
  const isMyCourt = court.claimedBy === currentUserId
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${L(court.name, lang)} ${L(court.address, lang)}`
  )}`

  const amenitiesLabels = {
    shower: { en: 'Showers', zh: '淋浴設施' },
    locker: { en: 'Lockers', zh: '儲物櫃' },
    proShop: { en: 'Pro shop', zh: '體育用品店' },
    water: { en: 'Drinking water', zh: '飲水機' },
    cafe: { en: 'Café', zh: '咖啡店' },
    stringing: { en: 'Stringing service', zh: '穿線服務' },
    rental: { en: 'Equipment rental', zh: '器材租借' },
    aircon: { en: 'Air conditioning', zh: '空調' },
    view: { en: 'Scenic view', zh: '景色優美' },
    seaView: { en: 'Sea view', zh: '海景' },
    parking: { en: 'Parking', zh: '停車場' }
  }

  const submitReview = () => {
    if (!reviewText.trim()) return
    addReview(court.id, rating, { en: reviewText, zh: reviewText })
    setReviewText('')
    setShowReviewForm(false)
    setRating(5)
  }

  const saveListing = () => {
    updateCourt(court.id, {
      name: { en: editName || L(court.name, 'en'), zh: editNameZh || L(court.name, 'zh') || L(court.name, 'en') },
      opening: { en: editOpening, zh: editOpening },
      address: { en: editAddress || L(court.address, 'en'), zh: editAddressZh || L(court.address, 'zh') || L(court.address, 'en') }
    })
    setEditMode(false)
  }

  const startEdit = () => {
    setEditName(L(court.name, 'en'))
    setEditNameZh(L(court.name, 'zh'))
    setEditOpening(court.opening.en || court.opening.zh || '')
    setEditAddress(L(court.address, 'en'))
    setEditAddressZh(L(court.address, 'zh'))
    setEditMode(true)
  }

  const shortName = court.name.en.split(' ')[0]

  return (
    <div className="page court-detail-page">
      <div className="container">
        <Link to="/" className="back-link">
          ← {t('common.back')} {t('discover.title')}
        </Link>
      </div>

      <section className="court-hero">
        <div className="hero-grid-bg" />
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
        </div>
        <div className="container court-hero-inner">
          <div className="court-gallery">
            <div
              className="court-gallery-main"
              style={{ backgroundImage: `url(${court.photos[activePhoto]})` }}
              role="img"
              aria-label={L(court.name, lang)}
            >
              {court.photos.length > 1 && (
                <div className="gallery-thumbs">
                  {court.photos.map((p, i) => (
                    <button
                      key={i}
                      className={`gallery-thumb ${i === activePhoto ? 'active' : ''}`}
                      style={{ backgroundImage: `url(${p})` }}
                      onClick={() => setActivePhoto(i)}
                      aria-label={`Photo ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="court-hero-info">
            <div className="court-hero-tags">
              <SportTag sport={court.sport} lang={lang} />
              {isMyCourt && <span className="chip chip-claimed">✓ {t('courtMgmt.claimedByYou')}</span>}
              {court.claimedBy && !isMyCourt && (
                <span className="chip chip-claimed">✓ {t('courtMgmt.claimedBadge')}</span>
              )}
              <span className="chip chip-mute">{t(`environments.${court.environment}`)}</span>
              <span className="chip chip-mute">{t(`surfaces.${court.surface}`)}</span>
            </div>

            <h1 className="court-name">
              {L(court.name, lang)}
              {lang === 'zh' && L(court.name, 'en') !== L(court.name, 'zh') && (
                <span className="court-name-en">{L(court.name, 'en')}</span>
              )}
            </h1>

            {avgRating ? (
              <div className="court-rating-row">
                <RatingPill rating={avgRating} />
                <span className="court-rating-num">{avgRating.toFixed(1)}</span>
                <span className="court-rating-text">
                  {t('discover.basedOn')} · {courtReviews.length} {courtReviews.length === 1 ? t('discover.review') : t('discover.reviewsCount')}
                </span>
              </div>
            ) : (
              <p className="court-rating-none">{t('reviews.noReviews')}</p>
            )}

            <ul className="court-facts">
              <li>
                <span className="fact-icon">📍</span>
                <div>
                  <strong>{t('discover.address')}</strong>
                  <span>{L(court.address, lang)}</span>
                </div>
              </li>
              <li>
                <span className="fact-icon">🚇</span>
                <div>
                  <strong>{t('discover.nearestMtr')}</strong>
                  <span>{L(court.nearestMtr, lang)}</span>
                </div>
              </li>
              <li>
                <span className="fact-icon">🕐</span>
                <div>
                  <strong>{t('discover.opening')}</strong>
                  <span>{L(court.opening, lang) || `${court.opening.en} / ${court.opening.zh}`}</span>
                </div>
              </li>
              <li>
                <span className="fact-icon">{court.lights ? '💡' : '🌙'}</span>
                <div>
                  <strong>{t('discover.lights')}</strong>
                  <span>{court.lights ? t('discover.lightsYes') : t('discover.lightsNo')}</span>
                </div>
              </li>
              <li>
                <span className="fact-icon">💰</span>
                <div>
                  <strong>{t('discover.amenities')}</strong>
                  <span>{court.free ? t('discover.freeAccess') : t('discover.paid')}</span>
                </div>
              </li>
            </ul>

            <div className="court-hero-actions">
              <a href={gmapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-lime">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                {t('common.openInMaps')}
              </a>
              {currentUserId && !isMyCourt && (
                <button className="btn btn-outline" onClick={() => setShowClaimModal(true)}>
                  ⌘ {t('courtMgmt.claimBtn')}
                </button>
              )}
              {isMyCourt && (
                <button className="btn btn-outline" onClick={() => (editMode ? saveListing() : startEdit())}>
                  {editMode ? t('common.save') : t('courtMgmt.editListing')}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {editMode && isMyCourt && (
        <section className="container edit-panel">
          <h3>{t('courtMgmt.editListing')}</h3>
          <div className="edit-grid">
            <label>
              <span>{t('members.fullName')} (EN)</span>
              <input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </label>
            <label>
              <span>{t('members.fullName')} (繁)</span>
              <input value={editNameZh} onChange={(e) => setEditNameZh(e.target.value)} />
            </label>
            <label>
              <span>{t('discover.address')} (EN)</span>
              <input value={editAddress} onChange={(e) => setEditAddress(e.target.value)} />
            </label>
            <label>
              <span>{t('discover.address')} (繁)</span>
              <input value={editAddressZh} onChange={(e) => setEditAddressZh(e.target.value)} />
            </label>
            <label>
              <span>{t('discover.opening')}</span>
              <input value={editOpening} onChange={(e) => setEditOpening(e.target.value)} />
            </label>
          </div>
          <div className="edit-actions">
            <button className="btn btn-forest" onClick={saveListing}>{t('common.save')}</button>
            <button className="btn btn-ghost" onClick={() => setEditMode(false)}>{t('common.cancel')}</button>
          </div>
        </section>
      )}

      <section className="container court-body">
        <div className="court-body-main">
          <div className="court-section">
            <h2>{t('discover.about')}</h2>
            <p className="court-about-text">{L(court.about, lang)}</p>
          </div>

          <div className="court-section">
            <h2>{t('discover.facilities')}</h2>
            <div className="amenity-grid">
              {court.amenities.map((a) => (
                <span key={a} className="amenity-chip">
                  ✓ {amenitiesLabels[a]?.[lang] || amenitiesLabels[a]?.en || a}
                </span>
              ))}
            </div>
          </div>

          <div className="court-section reviews-section">
            <div className="reviews-head">
              <h2>{t('reviews.title')}</h2>
              {currentUserId && !showReviewForm && (
                <button className="btn btn-forest btn-sm" onClick={() => setShowReviewForm(true)}>
                  ✎ {t('reviews.writeReview')}
                </button>
              )}
            </div>

            {avgRating && (
              <div className="reviews-summary">
                <div className="reviews-big-score">
                  <span className="big-score">{avgRating.toFixed(1)}</span>
                  <StarRating rating={avgRating} size={22} />
                  <span className="reviews-total">
                    {courtReviews.length} {courtReviews.length === 1 ? t('discover.review') : t('discover.reviewsCount')}
                  </span>
                </div>
              </div>
            )}

            {showReviewForm && currentUserId && (
              <div className="review-form">
                <h3>{t('reviews.yourRating')}</h3>
                <StarRating rating={rating} size={28} interactive onChange={setRating} />
                <div className="review-stars-hint">({rating}/5)</div>
                <textarea
                  placeholder={t('reviews.placeholder')}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                />
                <div className="review-form-actions">
                  <button className="btn btn-lime" onClick={submitReview} disabled={!reviewText.trim()}>
                    {t('reviews.post')}
                  </button>
                  <button className="btn btn-ghost" onClick={() => setShowReviewForm(false)}>
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            )}

            {courtReviews.length === 0 ? (
              <p className="no-reviews">{t('reviews.noReviews')}</p>
            ) : (
              <ul className="review-list">
                {courtReviews.map((r) => {
                  const author = memberById(r.authorId)
                  return (
                    <li key={r.id} className="review-item">
                      <Link to={`/member/${r.authorId}`}>
                        <Avatar member={author} size={44} lang={lang} />
                      </Link>
                      <div className="review-content">
                        <div className="review-top">
                          <Link to={`/member/${r.authorId}`} className="review-author">
                            {author?.name}
                          </Link>
                          <span className="review-date">{r.date}</span>
                          {(currentUserId === r.authorId || isAdmin) && (
                            <button
                              className="review-delete"
                              onClick={() => setDeleteReviewConfirm(r.id)}
                              title={t('reviews.deleteReview')}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                        <StarRating rating={r.rating} size={14} />
                        <p className="review-text">{L(r.text, lang)}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {deleteReviewConfirm && (
          <div className="modal-overlay" onClick={() => setDeleteReviewConfirm(null)}>
            <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
              <h3>{t('common.confirmDelete')}</h3>
              <p>{lang === 'zh'
                ? '確定要刪除這條評論嗎？此操作無法撤銷。'
                : 'Are you sure you want to delete this review? This action cannot be undone.'}</p>
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setDeleteReviewConfirm(null)}>
                  {t('common.cancel')}
                </button>
                <button className="btn-danger" onClick={() => {
                  deleteReview(deleteReviewConfirm)
                  setDeleteReviewConfirm(null)
                }}>
                  {t('common.delete')}
                </button>
              </div>
            </div>
          </div>
        )}

        <aside className="court-sidebar">
          <div className="sidebar-card">
            <h3>{t('courtMgmt.title')}</h3>
            <p className="sidebar-muted">{t('courtMgmt.claimInfo')}</p>
            {claimedBy ? (
              <div className="claim-owner">
                <Avatar member={claimedBy} size={40} lang={lang} />
                <div>
                  <strong>{claimedBy.name}</strong>
                  <span>
                    {t('courtMgmt.ownerName')} · {connectionCount(claimedBy.id)} {t('matching.connectionCount')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="claim-empty">
                <span className="chip chip-mute">{t('common.unclaimed')}</span>
                <p className="sidebar-muted">{t('courtMgmt.subtitle')}</p>
              </div>
            )}
            {!isMyCourt && currentUserId && (
              <button className="btn btn-outline btn-block" onClick={() => setShowClaimModal(true)}>
                ⌘ {t('courtMgmt.claimBtn')}
              </button>
            )}
            {isMyCourt && (
              <button className="btn btn-forest btn-block" onClick={() => (editMode ? saveListing() : startEdit())}>
                {editMode ? t('common.save') : t('courtMgmt.editListing')}
              </button>
            )}
          </div>

          <div className="sidebar-card">
            <h3>{t('common.viewOnMaps')}</h3>
            <CourtMap
              lat={court.lat}
              lng={court.lng}
              name={L(court.name, lang)}
            />
            <a href={gmapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-block" style={{ marginTop: 10 }}>
              📍 {t('common.openInMaps')}
            </a>
          </div>

          <div className="sidebar-card">
            <h3>{t('discover.facilities')}</h3>
            <div className="amenity-list">
              {court.amenities.map((a) => (
                <span key={a} className="amenity-row">
                  ✓ {amenitiesLabels[a]?.[lang] || amenitiesLabels[a]?.en || a}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {showClaimModal && (
        <div className="modal-overlay" onClick={() => setShowClaimModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{t('courtMgmt.claimBtn')}</h2>
            <p>{t('courtMgmt.claimInfo')}</p>
            <div className="modal-actions">
              <button
                className="btn btn-forest"
                onClick={() => {
                  claimCourt(court.id)
                  setShowClaimModal(false)
                }}
              >
                ✓ {t('courtMgmt.claimBtn')}
              </button>
              <button className="btn btn-ghost" onClick={() => setShowClaimModal(false)}>
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}