import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export const LoginPage = () => {
  const { t, L, lang, members, login } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState('pick')
  const [selectedId, setSelectedId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const demoMembers = members.slice(0, 8)

  const handlePick = (id) => {
    setSelectedId(id)
    setStep('details')
  }

  const handleLogin = () => {
    if (!email.trim()) {
      setError(t('login.emailRequired'))
      return
    }
    if (!password.trim()) {
      setError(t('login.passwordRequired'))
      return
    }
    login(selectedId)
    navigate('/')
  }

  const handleSkip = () => {
    login('m1')
    navigate('/')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="#8bd450"/>
            <circle cx="24" cy="24" r="10" fill="none" stroke="#1d1a2f" strokeWidth="3"/>
            <line x1="24" y1="4" x2="24" y2="14" stroke="#1d1a2f" strokeWidth="3" strokeLinecap="round"/>
            <line x1="24" y1="34" x2="24" y2="44" stroke="#1d1a2f" strokeWidth="3" strokeLinecap="round"/>
            <line x1="4" y1="24" x2="14" y2="24" stroke="#1d1a2f" strokeWidth="3" strokeLinecap="round"/>
            <line x1="34" y1="24" x2="44" y2="24" stroke="#1d1a2f" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <h1 className="login-title">CourtSide HK</h1>
          <p className="login-tagline">{t('login.tagline')}</p>
        </div>

        {step === 'pick' && (
          <>
            <h2 className="login-step-title">{t('login.pickTitle')}</h2>
            <p className="login-step-hint">{t('login.pickHint')}</p>
            <div className="login-members-grid">
              {demoMembers.map((m) => (
                <button
                  key={m.id}
                  className="login-member-btn"
                  onClick={() => handlePick(m.id)}
                >
                  <div className="login-member-avatar">
                    {m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="login-member-info">
                    <span className="login-member-name">{m.name}</span>
                    <span className="login-member-level">{t(`levels.${m.level}`)}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="login-divider">{t('login.or')}</div>
            <button className="btn btn-lime btn-block" onClick={handleSkip}>
              {t('login.skip')}
            </button>
          </>
        )}

        {step === 'details' && (
          <>
            <button className="login-back-btn" onClick={() => setStep('pick')}>
              ← {t('common.back')}
            </button>
            <h2 className="login-step-title">{t('login.detailsTitle')}</h2>
            <div className="form-stack">
              <label className="field">
                <span className="field-label">{t('login.email')}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="you@example.com"
                />
              </label>
              <label className="field">
                <span className="field-label">{t('login.password')}</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••"
                />
              </label>
              {error && <p className="form-error">{error}</p>}
              <p className="login-demo-note">{t('login.demoNote')}</p>
            </div>
            <button className="btn btn-lime btn-block" onClick={handleLogin}>
              {t('login.signIn')}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
