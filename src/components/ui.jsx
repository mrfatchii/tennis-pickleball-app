import { useApp } from '../context/AppContext'

export const Avatar = ({ member, size = 40, lang }) => {
  const { L } = useApp()
  if (!member) return null
  const initials = member.name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
  const sz = typeof size === 'number' ? `${size}px` : size
  return (
    <span
      className="avatar"
      style={{
        width: sz,
        height: sz,
        background: `linear-gradient(135deg, ${member.avatarColor}, ${member.avatarColor}cc)`,
        fontSize: `max(11px, ${parseFloat(sz) * 0.38}px)`
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

export const SportTag = ({ sport, lang }) => {
  const { t, L } = useApp()
  const label =
    sport === 'both' ? t('sports.both') : sport === 'tennis' ? t('sports.tennis') : t('sports.pickleball')
  const cls =
    sport === 'tennis' ? 'tag tag-tennis' : sport === 'pickleball' ? 'tag tag-pickleball' : 'tag tag-both'
  return <span className={cls}>{label}</span>
}

export const StarRating = ({ rating, size = 16, interactive = false, onChange }) => {
  const stars = [1, 2, 3, 4, 5]
  const rounded = Math.round(rating * 2) / 2
  return (
    <span className={`stars ${interactive ? 'stars-interactive' : ''}`}>
      {stars.map((s) => {
        const filled = rounded >= s
        const half = !filled && rounded >= s - 0.5
        return (
          <span
            key={s}
            className={`star ${half ? 'star-half' : ''}`}
            style={{ fontSize: size }}
            onClick={interactive ? () => onChange?.(s) : undefined}
            role={interactive ? 'button' : undefined}
            aria-label={interactive ? `${s} star` : undefined}
          >
            {filled ? '★' : half ? '⯨' : '☆'}
          </span>
        )
      })}
    </span>
  )
}

export const RatingPill = ({ rating }) => (
  <span className="rating-pill">
    <span className="rating-pill-star">★</span>
    {rating.toFixed(1)}
  </span>
)

export const Amt = ({ en, zh, lang }) => (
  <>
    {(lang === 'zh' && zh) || en}
  </>
)

export const EmptyState = ({ icon, title, subtitle, action }) => (
  <div className="empty-state">
    {icon && <div className="empty-icon">{icon}</div>}
    <h3>{title}</h3>
    {subtitle && <p>{subtitle}</p>}
    {action}
  </div>
)