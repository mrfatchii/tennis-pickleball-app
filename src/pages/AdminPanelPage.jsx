import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { L } from '../i18n'
import { Link } from 'react-router-dom'

export default function AdminPanelPage() {
  const { t, lang, members, courts, listings, groups, reviews, currentUser } = useApp()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    members: members.length,
    courts: courts.length,
    listings: listings.length,
    groups: groups.length,
    reviews: reviews.length
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>{t('nav.adminPanel')}</h1>
          <p className="page-subtitle">{t('admin.welcome')}</p>
        </div>

        <div className="admin-dashboard">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <div className="stat-value">{stats.members}</div>
                <div className="stat-label">{t('admin.members')}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎾</div>
              <div className="stat-content">
                <div className="stat-value">{stats.courts}</div>
                <div className="stat-label">{t('admin.courts')}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🛍</div>
              <div className="stat-content">
                <div className="stat-value">{stats.listings}</div>
                <div className="stat-label">{t('admin.listings')}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <div className="stat-value">{stats.groups}</div>
                <div className="stat-label">{t('admin.groups')}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <div className="stat-value">{stats.reviews}</div>
                <div className="stat-label">{t('admin.reviews')}</div>
              </div>
            </div>
          </div>

          <div className="admin-tabs">
            <button
              className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              {t('admin.overview')}
            </button>
            <button
              className={`admin-tab ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => setActiveTab('members')}
            >
              {t('admin.manageMembers')}
            </button>
            <button
              className={`admin-tab ${activeTab === 'courts' ? 'active' : ''}`}
              onClick={() => setActiveTab('courts')}
            >
              {t('admin.manageCourts')}
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="admin-section">
              <h2>{t('admin.systemInfo')}</h2>
              <div className="info-card">
                <p><strong>{t('admin.version')}:</strong> 0.1.0</p>
                <p><strong>{t('admin.lastUpdate')}:</strong> 2026-09-18</p>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="admin-section">
              <h2>{t('admin.manageMembers')}</h2>
              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>{t('admin.name')}</th>
                      <th>{t('admin.email')}</th>
                      <th>{t('admin.role')}</th>
                      <th>{t('admin.sports')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(member => (
                      <tr key={member.id}>
                        <td>
                          <Link to={`/member/${member.id}`}>
                            {L(member.name, lang)}
                          </Link>
                        </td>
                        <td>{member.email}</td>
                        <td>
                          <span className={`badge badge-${member.role || 'player'}`}>
                            {member.role || 'player'}
                          </span>
                        </td>
                        <td>{member.sports?.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'courts' && (
            <div className="admin-section">
              <h2>{t('admin.manageCourts')}</h2>
              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>{t('admin.courtName')}</th>
                      <th>{t('admin.district')}</th>
                      <th>{t('admin.sport')}</th>
                      <th>{t('admin.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courts.map(court => (
                      <tr key={court.id}>
                        <td>
                          <Link to={`/court/${court.id}`}>
                            {L(court.name, lang)}
                          </Link>
                        </td>
                        <td>{court.district}</td>
                        <td>{court.sport}</td>
                        <td>
                          <span className={`badge ${court.claimedBy ? 'badge-claimed' : 'badge-unclaimed'}`}>
                            {court.claimedBy ? t('common.claimed') : t('common.unclaimed')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
