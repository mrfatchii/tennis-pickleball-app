import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Avatar } from './ui'

const navItems = (t, currentUserId, isAdmin) => {
  const base = [
    { to: '/', label: t('nav.discover'), icon: 'discover' },
    { to: '/matching', label: t('nav.matching'), icon: 'matching' }
  ]
  if (currentUserId) {
    base.push({ to: '/groups', label: t('nav.groups'), icon: 'groups' })
    base.push({ to: '/marketplace', label: t('nav.marketplace'), icon: 'marketplace' })
  }
  if (isAdmin) {
    base.push({ to: '/members', label: t('nav.adminPanel') || 'Admin', icon: 'manage' })
  } else {
    base.push({ to: '/members', label: t('nav.members'), icon: 'members' })
  }
  return base
}

const Icons = {
  discover: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
  ),
  members: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
  matching: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 9 9" /></svg>
  ),
  groups: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
  marketplace: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
  ),
  messages: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  ),
  manage: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  )
}

export const Header = ({ onNavigate }) => {
  const { t, lang, setLang, currentUser, currentUserId, isAdmin, logout, members } = useApp()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const items = navItems(t, currentUserId, isAdmin)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="36" height="36">
              <rect width="40" height="40" rx="10" fill="var(--lime)" />
              <circle cx="20" cy="20" r="13" fill="none" stroke="var(--navy)" strokeWidth="4" />
              <circle cx="20" cy="20" r="4.5" fill="var(--navy)" />
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">CourtSide <em>HK</em></span>
            <span className="brand-sub">{t('tagline')}</span>
          </span>
        </Link>

        <nav className={`main-nav ${mobileOpen ? 'open' : ''}`}>
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="nav-icon">{Icons[item.icon]}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="header-right">
          {currentUserId && (
            <NavLink
              to="/messages"
              className={({ isActive }) => `icon-btn ${isActive ? 'active' : ''}`}
              title={t('nav.messages')}
            >
              {Icons.messages}
              <span className="sr-only">{t('nav.messages')}</span>
            </NavLink>
          )}

          <button
            className={`lang-toggle ${lang === 'zh' ? 'zh' : ''}`}
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            title={lang === 'en' ? '切換至繁體中文' : 'Switch to English'}
          >
            {lang === 'en' ? '繁' : 'EN'}
          </button>

          {currentUser ? (
            <div className="user-menu-wrap">
              <button className="user-menu-btn" onClick={() => setUserMenuOpen((o) => !o)}>
                <Avatar member={currentUser} size={34} lang={lang} />
                <span className="user-menu-name">{currentUser.name}</span>
                <svg className="chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {userMenuOpen && (
                <>
                  <div className="user-menu-overlay" onClick={() => setUserMenuOpen(false)} />
                  <div className="user-menu">
                    <div className="user-menu-header">
                      <Avatar member={currentUser} size={40} lang={lang} />
                      <div>
                        <strong>{currentUser.name}</strong>
                        <span>{currentUser.role === 'coach' ? t('badge.coach') : currentUser.role === 'admin' ? t('badge.admin') : t('badge.player')}</span>
                      </div>
                    </div>
                    <div className="user-menu-divider" />
                    <Link to={`/member/${currentUserId}`} className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                      <span>👤</span> {t('nav.myProfile')}
                    </Link>
                    <Link to="/marketplace/mine" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                      <span>🛍</span> {t('nav.myListings')}
                    </Link>
                    <Link to="/courts/manage" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                      <span>⌖</span> {t('nav.manage')}
                    </Link>
                    <div className="user-menu-divider" />
                    <button
                      className="user-menu-item user-menu-logout"
                      onClick={() => {
                        setUserMenuOpen(false)
                        logout()
                        navigate('/')
                      }}
                    >
                      <span>⏻</span> {t('nav.logout')}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              className="btn btn-lime btn-sm"
              onClick={() => {
                navigate('/login')
                setMobileOpen(false)
              }}
            >
              {t('nav.login')}
            </button>
          )}

          <button className="hamburger" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
            <span className={`hamburger-line ${mobileOpen ? 'x1' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? 'x2' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? 'x3' : ''}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="nav-icon">{Icons[item.icon]}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
          {currentUser && (
            <>
              <div className="mobile-nav-divider" />
              <Link to={`/member/${currentUserId}`} className="nav-link" onClick={() => setMobileOpen(false)}>
                <span className="nav-icon">{Icons.manage}</span>
                <span>{t('nav.myProfile')}</span>
              </Link>
              <Link to="/marketplace/mine" className="nav-link" onClick={() => setMobileOpen(false)}>
                <span>🛍</span>
                <span>{t('nav.myListings')}</span>
              </Link>
              <Link to="/courts/manage" className="nav-link" onClick={() => setMobileOpen(false)}>
                <span>⌖</span>
                <span>{t('nav.manage')}</span>
              </Link>
              <button
                className="btn btn-lime btn-block mobile-logout-btn"
                onClick={() => {
                  setMobileOpen(false)
                  logout()
                  navigate('/')
                }}
              >
                {t('nav.logout')}
              </button>
            </>
          )}
          {!currentUser && (
            <button
              className="btn btn-lime btn-block"
              onClick={() => {
                setMobileOpen(false)
                navigate('/login')
              }}
            >
              {t('nav.login')}
            </button>
          )}
        </div>
      )}
    </header>
  )
}

export const Footer = () => {
  const { t, lang, setLang } = useApp()
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <svg viewBox="0 0 40 40" width="28" height="28">
              <rect width="40" height="40" rx="10" fill="var(--lime)" />
              <circle cx="20" cy="20" r="13" fill="none" stroke="var(--navy)" strokeWidth="4" />
              <circle cx="20" cy="20" r="4.5" fill="var(--navy)" />
            </svg>
            <span className="brand-name footer-name">CourtSide <em>HK</em></span>
          </div>
          <p>{t('footer.about')}</p>
          <div className="footer-social">
            <a href="#" className="footer-social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="footer-social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="footer-social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>{t('footer.features')}</h4>
          <Link to="/">{t('nav.discover')}</Link>
          <Link to="/matching">{t('nav.matching')}</Link>
          <Link to="/groups">{t('nav.groups')}</Link>
          <Link to="/marketplace">{t('nav.marketplace')}</Link>
        </div>
        <div className="footer-col">
          <h4>{t('footer.community')}</h4>
          <Link to="/members">{t('nav.members')}</Link>
          <Link to="/messages">{t('nav.messages')}</Link>
          <Link to="/courts/manage">{t('nav.manage')}</Link>
          <Link to="/marketplace/mine">{t('nav.myListings')}</Link>
        </div>
        <div className="footer-col">
          <h4>{t('footer.language')}</h4>
          <button className="footer-lang" onClick={() => setLang('en')}>English</button>
          <button className="footer-lang" onClick={() => setLang('zh')}>繁體中文</button>
          <span className="footer-legal">{t('footer.legal')}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>{t('footer.madeIn')}</p>
        <p className="footer-disclaimer">{t('footer.disclaimer')}</p>
      </div>
    </footer>
  )
}

export const HeaderCTA = () => null
