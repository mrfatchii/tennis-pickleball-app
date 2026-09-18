import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { SportTag, RatingPill, Avatar } from './ui'

export const CourtCard = ({ court, compact = false }) => {
  const { t, L, lang, courtRating, reviewsForCourt } = useApp()
  const navigate = useNavigate()
  const rating = courtRating(court.id)
  const reviews = reviewsForCourt(court.id)

  if (compact) {
    return (
      <div className="court-card" key={court.id}>
        <div
          className="court-card-img"
          style={{ backgroundImage: `url(${court.photos[0]})` }}
          role="img"
          aria-label={L(court.name, lang)}
        >
          <div className="court-card-img-top">
            <SportTag sport={court.sport} lang={lang} />
            {court.claimedBy && <span className="claimed-chip">✓ {t('courtMgmt.claimedBadge')}</span>}
          </div>
        </div>
        <div className="court-card-body">
          <div className="court-card-title-row">
            <h3 className="court-card-title">{L(court.name, lang)}</h3>
            {rating && <RatingPill rating={rating} />}
          </div>
          <p className="court-card-meta">
            <span>📍 {L(court.address, lang)}</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <article className="court-card" onClick={() => navigate(`/court/${court.id}`)}>
      <div
        className="court-card-img"
        style={{ backgroundImage: `url(${court.photos[0]})` }}
        role="img"
        aria-label={L(court.name, lang)}
      >
        <div className="court-card-img-top">
          <SportTag sport={court.sport} lang={lang} />
          {court.claimedBy && <span className="claimed-chip">✓ {t('courtMgmt.claimedBadge')}</span>}
        </div>
        <div className="court-card-img-bottom">
          <span className="court-env-chip">
            {t(`environments.${court.environment}`)}
          </span>
          <span className="court-surface-chip">{t(`surfaces.${court.surface}`)}</span>
        </div>
      </div>
      <div className="court-card-body">
        <div className="court-card-title-row">
          <h3 className="court-card-title">{L(court.name, lang)}</h3>
          {rating && <RatingPill rating={rating} />}
        </div>
        <p className="court-card-meta">
          <span className="meta-pin">📍</span>
          <span>{L(court.district ? t(`districts.${court.district}`) : '', lang)} · {L(court.address, lang)}</span>
        </p>
        <div className="court-card-tags">
          <span className="mini-chip">{t(`surfaces.${court.surface}`)}</span>
          <span className="mini-chip">{court.lights ? t('discover.lightsYes') : t('discover.lightsNo')}</span>
          <span className="mini-chip">{court.free ? t('discover.free') : ''}</span>
        </div>
        <div className="court-card-actions">
          <Link to={`/court/${court.id}`} className="btn btn-ghost btn-sm" onClick={(e) => e.stopPropagation()}>
            {t('discover.viewDetails')} →
          </Link>
        </div>
      </div>
    </article>
  )
}

export const CourtMap = ({ courts, activeId, onSelect }) => {
  const { t, L, lang } = useApp()
  const [hovered, setHovered] = useState(null)

  const lats = courts.map((c) => c.lat)
  const lngs = courts.map((c) => c.lng)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  const pad = 0.02
  const xSpan = (maxLng - minLng + pad * 2) || 1
  const ySpan = (maxLat - minLat + pad * 2) || 1
  const centerLng = (minLng + maxLng) / 2
  const centerLat = (minLat + maxLat) / 2

  return (
    <div className="court-map-wrap">
      <div className="court-map">
        {/* stylised "island" landmass */}
        <div className="map-land" />
        <div className="map-grid" />
        <span className="map-label map-label-hk" style={{ left: '63%', top: '34%' }}>
          New Territories
        </span>
        <span className="map-label map-label-kln" style={{ left: '55%', top: '52%' }}>
          Kowloon
        </span>
        <span className="map-label map-label-hki" style={{ left: '61%', top: '68%' }}>
          Hong Kong Is.
        </span>
        {courts.map((court) => {
          const x = ((court.lng - (centerLng - xSpan / 2)) / xSpan) * 100
          const y = 100 - ((court.lat - (centerLat - ySpan / 2)) / ySpan) * 100
          const isActive = activeId === court.id
          return (
            <button
              key={court.id}
              className={`map-marker map-marker-${court.sport} ${isActive ? 'active' : ''} ${hovered === court.id ? 'hovered' : ''}`}
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => onSelect?.(court.id)}
              onMouseEnter={() => setHovered(court.id)}
              onMouseLeave={() => setHovered(null)}
              title={L(court.name, lang)}
              aria-label={L(court.name, lang)}
            >
              {court.sport === 'tennis' ? '🎾' : court.sport === 'pickleball' ? '🏓' : '✦'}
            </button>
          )
        })}
        <div className="map-legend">
          <span className="legend-item"><span className="map-marker map-marker-tennis legend-dot">🎾</span> {t('map.tennisMarker')}</span>
          <span className="legend-item"><span className="map-marker map-marker-pickleball legend-dot">🏓</span> {t('map.pickleballMarker')}</span>
          <span className="legend-item"><span className="map-marker map-marker-both legend-dot">✦</span> {t('map.bothMarker')}</span>
        </div>
      </div>
    </div>
  )
}