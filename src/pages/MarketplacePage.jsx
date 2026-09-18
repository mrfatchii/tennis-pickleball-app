import { useMemo, useState } from 'react'
import { useNavigate, useParams, Link, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Avatar, EmptyState } from '../components/ui'
import { listingPhoto, gearCategories } from '../data'

const categoryIcons = {
  all: '📦',
  rackets: '🏸',
  strings: '🧵',
  shoes: '👟',
  apparel: '👕',
  bags: '🎒',
  courtEquip: '🏟️',
  accessories: '🎾',
  other: '🔧',
}

const categoryLabels = {
  all: { en: 'All', zh: '全部' },
  rackets: { en: 'Rackets', zh: '球拍' },
  strings: { en: 'Strings', zh: '球線' },
  shoes: { en: 'Shoes', zh: '球鞋' },
  apparel: { en: 'Apparel', zh: '服裝' },
  bags: { en: 'Bags', zh: '球袋' },
  courtEquip: { en: 'Court Equip', zh: '場地用品' },
  accessories: { en: 'Accessories', zh: '配件' },
  other: { en: 'Other', zh: '其他' },
}

const getCatLabel = (cat, lang) => categoryLabels[cat]?.[lang] ?? categoryLabels[cat]?.en ?? cat

export const MarketplacePage = () => {
  const { t, L, lang, listings } = useApp()
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState('all')
  const [condition, setCondition] = useState('all')
  const [status, setStatus] = useState('all')
  const [district, setDistrict] = useState('all')
  const [showSell, setShowSell] = useState(params.get('sell') === '1')

  const filtered = useMemo(() => {
    let list = listings
    if (category !== 'all') list = list.filter((l) => l.category === category)
    if (condition !== 'all') list = list.filter((l) => l.condition === condition)
    if (status !== 'all') list = list.filter((l) => l.status === status)
    if (district !== 'all') list = list.filter((l) => l.district === district)
    return list
  }, [listings, category, condition, status, district])

  return (
    <div className="page marketplace-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">{t('marketplace.title')}</h1>
          <p className="page-subtitle">{t('marketplace.subtitle')}</p>
          <div className="hero-actions">
            <Link to="/marketplace/mine" className="btn btn-outline btn-lg">
              {t('marketplace.myListings')}
            </Link>
            <button className="btn btn-lime btn-lg" onClick={() => setShowSell(true)}>
              + {t('marketplace.sell')}
            </button>
          </div>
        </div>
      </section>

      <section className="filter-section">
        <div className="container">
          <div className="marketplace-categories">
            <button
              className={`marketplace-cat-chip${category === 'all' ? ' active' : ''}`}
              onClick={() => setCategory('all')}
            >
              <span className="cat-icon">📦</span>
              <span>{getCatLabel('all', lang)}</span>
            </button>
            {gearCategories.map((cat) => (
              <button
                key={cat}
                className={`marketplace-cat-chip${category === cat ? ' active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                <span className="cat-icon">{categoryIcons[cat]}</span>
                <span>{getCatLabel(cat, lang)}</span>
              </button>
            ))}
          </div>
          <div className="filter-row filter-row-secondary">
            <label className="select-wrap">
              <span className="select-label">{t('marketplace.filterCondition')}</span>
              <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                <option value="all">{t('search.all')}</option>
                {['new', 'likeNew', 'lightlyUsed', 'heavilyUsed'].map((c) => (
                  <option key={c} value={c}>{t(`conditions.${c}`)}</option>
                ))}
              </select>
            </label>
            <label className="select-wrap">
              <span className="select-label">{t('marketplace.filterStatus')}</span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="all">{t('search.all')}</option>
                <option value="available">{t('listingStatus.available')}</option>
                <option value="sold">{t('listingStatus.sold')}</option>
              </select>
            </label>
            <label className="select-wrap">
              <span className="select-label">{t('marketplace.filterDistrict')}</span>
              <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                <option value="all">{t('search.all')}</option>
                {['cw', 'wc', 'ea', 'so', 'ytm', 'ssp', 'kc', 'wts', 'kt', 'kwts', 'tw', 'tm', 'yl', 'no', 'tp', 'st', 'sk', 'is'].map((d) => (
                  <option key={d} value={d}>{t(`districts.${d}`)}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="results-section">
        <div className="container">
          <div className="results-head">
            <p className="results-count">
              <strong>{filtered.length}</strong> {filtered.length === 1 ? t('marketplace.item') : t('marketplace.resultsFound')}
            </p>
          </div>
          {filtered.length === 0 ? (
            <EmptyState icon="🛍️" title={t('marketplace.noListings')} />
          ) : (
            <div className="listing-grid">
              {filtered.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </section>

      {showSell && (
        <SellModal
          onClose={() => {
            setShowSell(false)
            setParams({}, { replace: true })
          }}
        />
      )}
    </div>
  )
}

const ListingCard = ({ listing }) => {
  const { t, L, lang, memberById } = useApp()
  const navigate = useNavigate()
  const seller = memberById(listing.sellerId)
  return (
    <div
      className={`listing-card ${listing.status === 'sold' ? 'listing-card-sold' : ''}`}
      onClick={() => navigate(`/marketplace/${listing.id}`)}
    >
      <div className="listing-photo-wrap">
        <img src={listing.photo} alt={L(listing.title, lang)} loading="lazy" />
        {listing.status === 'sold' && <span className="listing-status-badge sold">Sold</span>}
      </div>
      <div className="listing-body">
        <div className="listing-price">HK${listing.price}</div>
        <h3 className="listing-title">{L(listing.title, lang)}</h3>
        <div className="listing-tags">
          <span className="level-chip">{t(`gearCategories.${listing.category}`)}</span>
          <span className="level-chip">{t(`conditions.${listing.condition}`)}</span>
        </div>
        <div className="listing-seller">
          <Avatar member={seller} size={22} />
          <span>{seller?.name}</span>
          <span className="listing-district">• {t(`districts.${listing.district}`)}</span>
        </div>
      </div>
    </div>
  )
}

export const MarketplaceDetailPage = () => {
  const { id } = useParams()
  const { t, L, lang, listingById, memberById, updateListing, deleteListing, currentUser, isConnected } = useApp()
  const navigate = useNavigate()
  const listing = listingById(id)

  if (!listing) {
    return (
      <div className="page">
        <div className="container">
          <EmptyState icon="🤔" title="Listing not found" />
        </div>
      </div>
    )
  }

  const seller = memberById(listing.sellerId)
  const isMine = currentUser && listing.sellerId === currentUser.id
  const canMessage = currentUser && !isMine && isConnected(currentUser.id, listing.sellerId)

  return (
    <div className="page listing-detail-page">
      <section className="page-hero">
        <div className="container">
          <button className="btn-back" onClick={() => navigate('/marketplace')}>← {t('common.back')}</button>
        </div>
      </section>
      <section className="results-section">
        <div className="container listing-detail-layout">
          <div className="listing-detail-photo">
            <img src={listing.photo} alt={L(listing.title, lang)} />
          </div>
          <div className="listing-detail-info">
            <div className="listing-tags">
              <span className="level-chip">{t(`gearCategories.${listing.category}`)}</span>
              <span className="level-chip">{t(`conditions.${listing.condition}`)}</span>
              <span className={`listing-status-badge ${listing.status === 'sold' ? 'sold' : 'available'}`}>
                {t(`listingStatus.${listing.status}`)}
              </span>
            </div>
            <h1 className="listing-detail-title">{L(listing.title, lang)}</h1>
            <div className="listing-detail-price">HK${listing.price}</div>
            <p className="listing-detail-desc">{L(listing.description, lang)}</p>
            <div className="detail-fact">
              <span className="fact-label">{t('marketplace.seller')}</span>
              <span className="listing-seller" style={{ cursor: 'pointer' }} onClick={() => navigate(`/member/${seller?.id}`)}>
                <Avatar member={seller} size={24} /> {seller?.name}
              </span>
            </div>
            <div className="detail-fact">
              <span className="fact-label">{t('marketplace.location')}</span>
              <span>{t(`districts.${listing.district}`)}</span>
            </div>
            <div className="detail-fact">
              <span className="fact-label">{t('marketplace.listedOn')}</span>
              <span>{listing.listedOn}</span>
            </div>

            {isMine ? (
              <div className="listing-manage-actions">
                <button
                  className={`btn ${listing.status === 'available' ? 'btn-forest' : 'btn-outline'}`}
                  onClick={() => updateListing(listing.id, { status: listing.status === 'available' ? 'sold' : 'available' })}
                >
                  {listing.status === 'available' ? t('marketplace.markSold') : t('marketplace.markAvailable')}
                </button>
                <button
                  className="btn btn-danger-outline"
                  onClick={() => {
                    deleteListing(listing.id)
                    navigate('/marketplace/mine')
                  }}
                >
                  {t('marketplace.deleteListing')}
                </button>
              </div>
            ) : (
              <div className="listing-contact-block">
                <button
                  className={`btn btn-lime btn-lg ${!canMessage ? 'btn-disabled' : ''}`}
                  disabled={!canMessage}
                  onClick={() => canMessage && navigate(`/messages?to=${listing.sellerId}`)}
                >
                  {t('marketplace.contactSeller')}
                </button>
                {!canMessage && (
                  <p className="listing-contact-hint">
                    {currentUser
                      ? t('matching.connectHint')
                      : t('login.demoHint')}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export const MyListingsPage = () => {
  const { t, L, lang, memberListings, currentUser, memberById, updateListing, deleteListing } = useApp()
  const navigate = useNavigate()
  const mine = currentUser ? memberListings(currentUser.id) : []

  return (
    <div className="page my-listings-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">{t('marketplace.myListings')}</h1>
          <p className="page-subtitle">{t('marketplace.subtitle')}</p>
          <button className="btn btn-lime btn-lg" onClick={() => navigate('/marketplace?sell=1')}>
            + {t('marketplace.sell')}
          </button>
        </div>
      </section>
      <section className="results-section">
        <div className="container">
          {mine.length === 0 ? (
            <EmptyState
              icon="🛍️"
              title={t('marketplace.noMyListings')}
              action={
                <Link to="/marketplace?sell=1" className="btn btn-forest">
                  {t('marketplace.sell')}
                </Link>
              }
            />
          ) : (
            <div className="my-listings-list">
              {mine.map((l) => (
                <div key={l.id} className="my-listing-row">
                  <img src={l.photo} alt={L(l.title, lang)} className="my-listing-thumb" />
                  <div className="my-listing-info">
                    <div className="my-listing-title-row">
                      <h3 className="listing-title">{L(l.title, lang)}</h3>
                      <span className={`listing-status-badge ${l.status === 'sold' ? 'sold' : 'available'}`}>
                        {t(`listingStatus.${l.status}`)}
                      </span>
                    </div>
                    <div className="my-listing-meta">
                      <span className="listing-price">HK${l.price}</span>
                      <span>• {t(`gearCategories.${l.category}`)}</span>
                      <span>• {t(`conditions.${l.condition}`)}</span>
                      <span>• {t(`districts.${l.district}`)}</span>
                    </div>
                  </div>
                  <div className="my-listing-actions">
                    <button
                      className={`btn ${l.status === 'available' ? 'btn-forest' : 'btn-outline'} btn-sm`}
                      onClick={() => updateListing(l.id, { status: l.status === 'available' ? 'sold' : 'available' })}
                    >
                      {l.status === 'available' ? t('marketplace.markSold') : t('marketplace.markAvailable')}
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => navigate(`/marketplace/${l.id}`)}>
                      {t('marketplace.viewListing')}
                    </button>
                    <button className="btn btn-danger-outline btn-sm" onClick={() => deleteListing(l.id)}>
                      {t('marketplace.deleteListing')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

const SellModal = ({ onClose }) => {
  const { t, createListing, gearCategories, conditions, districts } = useApp()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [titleZh, setTitleZh] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('rackets')
  const [condition, setCondition] = useState('likeNew')
  const [district, setDistrict] = useState('kc')
  const [description, setDescription] = useState('')
  const [descriptionZh, setDescriptionZh] = useState('')
  const [photoPrompt, setPhotoPrompt] = useState('')

  const submit = () => {
    if (!title.trim() || !price) return
    const prompt = photoPrompt.trim() || title.trim()
    createListing({
      title: { en: title.trim(), zh: titleZh.trim() || title.trim() },
      price: Number(price) || 0,
      category,
      condition,
      district,
      description: { en: description.trim(), zh: descriptionZh.trim() || description.trim() },
      photo: listingPhoto(prompt)
    })
    onClose()
    navigate('/marketplace')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{t('marketplace.sell')}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body form-stack">
          <div className="form-row">
            <label className="field">
              <span className="field-label">{t('marketplace.titleLabel')} (EN) *</span>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('marketplace.titlePlaceholder')} />
            </label>
            <label className="field">
              <span className="field-label">{t('marketplace.titleLabel')} (繁中)</span>
              <input value={titleZh} onChange={(e) => setTitleZh(e.target.value)} placeholder={t('marketplace.titlePlaceholder')} />
            </label>
          </div>
          <div className="form-row">
            <label className="field">
              <span className="field-label">{t('marketplace.price')} *</span>
              <input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="850" />
            </label>
            <label className="field">
              <span className="field-label">{t('marketplace.category')}</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {gearCategories.map((c) => (
                  <option key={c} value={c}>{t(`gearCategories.${c}`)}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span className="field-label">{t('marketplace.condition')}</span>
              <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                {conditions.map((c) => (
                  <option key={c} value={c}>{t(`conditions.${c}`)}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span className="field-label">{t('marketplace.filterDistrict')}</span>
              <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                {districts.map((d) => (
                  <option key={d} value={d}>{t(`districts.${d}`)}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="field">
            <span className="field-label">{t('marketplace.description')} (EN)</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('marketplace.descPlaceholder')} rows={3} />
          </label>
          <label className="field">
            <span className="field-label">{t('marketplace.description')} (繁中)</span>
            <textarea value={descriptionZh} onChange={(e) => setDescriptionZh(e.target.value)} placeholder={t('marketplace.descPlaceholder')} rows={3} />
          </label>
          <label className="field">
            <span className="field-label">{t('marketplace.photo')}</span>
            <input value={photoPrompt} onChange={(e) => setPhotoPrompt(e.target.value)} placeholder="e.g. Babolat Pure Drive racket" />
          </label>
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>{t('common.cancel')}</button>
          <button className="btn btn-lime" onClick={submit} disabled={!title.trim() || !price}>
            {t('marketplace.sell')}
          </button>
        </div>
      </div>
    </div>
  )
}
