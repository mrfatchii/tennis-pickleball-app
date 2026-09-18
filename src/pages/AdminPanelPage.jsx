import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { L } from '../i18n'
import { Link } from 'react-router-dom'

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText, danger = true }) {
  const { t } = useApp()
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
        <h3>{title || t('common.confirmDelete')}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCancel}>
            {t('common.cancel')}
          </button>
          <button className={danger ? 'btn-danger' : 'btn-primary'} onClick={onConfirm}>
            {confirmText || t('common.delete')}
          </button>
        </div>
      </div>
    </div>
  )
}

function Toast({ message, type, onClose }) {
  const { t } = useApp()
  useState(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  )
}

export default function AdminPanelPage() {
  const { t, lang, members, courts, listings, groups, reviews, currentUser, deleteMember, deleteCourt, updateListing } = useApp()
  const [activeTab, setActiveTab] = useState('overview')
  const [toast, setToast] = useState(null)

  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: null, item: null })
  const [editingMember, setEditingMember] = useState(null)
  const [editingCourt, setEditingCourt] = useState(null)
  const [editingListing, setEditingListing] = useState(null)

  const stats = {
    members: members.length,
    courts: courts.length,
    listings: listings.length,
    groups: groups.length,
    reviews: reviews.length
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleDelete = (type, item) => {
    setConfirmModal({ isOpen: true, type, item })
  }

  const confirmDelete = () => {
    const { type, item } = confirmModal
    if (type === 'member') {
      if (item.id === currentUser?.id) {
        showToast(t('admin.adminCannotDeleteSelf'), 'error')
      } else {
        deleteMember(item.id)
        showToast(t('admin.memberDeleted'), 'success')
      }
    } else if (type === 'court') {
      deleteCourt(item.id)
      showToast(t('admin.courtDeleted'), 'success')
    } else if (type === 'listing') {
      updateListing(item.id, { ...item, deleted: true })
      showToast(t('admin.listingDeleted'), 'success')
    }
    setConfirmModal({ isOpen: false, type: null, item: null })
  }

  const handleRoleChange = (memberId, newRole) => {
    const updatedMembers = members.map(m => m.id === memberId ? { ...m, role: newRole } : m)
    localStorage.setItem('courtside_members', JSON.stringify(updatedMembers))
    window.dispatchEvent(new Event('storage'))
    showToast(t('admin.memberUpdated'), 'success')
    setEditingMember(null)
  }

  const handleCourtUpdate = (courtId, updates) => {
    const updatedCourts = courts.map(c => c.id === courtId ? { ...c, ...updates } : c)
    localStorage.setItem('courtside_courts', JSON.stringify(updatedCourts))
    window.dispatchEvent(new Event('storage'))
    showToast(t('admin.listingUpdated'), 'success')
    setEditingCourt(null)
  }

  const handleListingUpdate = (listingId, updates) => {
    updateListing(listingId, updates)
    showToast(t('admin.listingUpdated'), 'success')
    setEditingListing(null)
  }

  const getMemberById = (id) => members.find(m => m.id === id)

  return (
    <div className="page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={t('common.confirmDelete')}
        message={
          confirmModal.type === 'member' ? t('admin.deleteMemberConfirm') :
          confirmModal.type === 'court' ? t('admin.deleteCourtConfirm') :
          t('admin.deleteListingConfirm')
        }
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, type: null, item: null })}
        confirmText={t('common.delete')}
      />

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
            <button
              className={`admin-tab ${activeTab === 'listings' ? 'active' : ''}`}
              onClick={() => setActiveTab('listings')}
            >
              {t('admin.manageListings')}
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
                      <th>{t('admin.actions')}</th>
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
                          {editingMember?.id === member.id ? (
                            <select
                              value={editingMember.role}
                              onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                              className="form-input"
                            >
                              <option value="player">{t('admin.selectRole')}</option>
                              <option value="coach">Coach</option>
                              <option value="admin">Admin</option>
                            </select>
                          ) : (
                            <span className={`badge badge-${member.role || 'player'}`}>
                              {member.role || 'player'}
                            </span>
                          )}
                        </td>
                        <td>{member.sports?.join(', ')}</td>
                        <td className="actions-cell">
                          {editingMember?.id === member.id ? (
                            <>
                              <button
                                className="btn-sm btn-primary"
                                onClick={() => handleRoleChange(member.id, editingMember.role)}
                              >
                                {t('common.save')}
                              </button>
                              <button
                                className="btn-sm btn-secondary"
                                onClick={() => setEditingMember(null)}
                              >
                                {t('common.cancel')}
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn-sm btn-icon"
                                onClick={() => setEditingMember({ ...member })}
                                title={t('admin.editMember')}
                              >
                                ✏️
                              </button>
                              <button
                                className="btn-sm btn-icon btn-danger"
                                onClick={() => handleDelete('member', member)}
                                title={t('admin.deleteMember')}
                                disabled={member.id === currentUser?.id}
                              >
                                🗑️
                              </button>
                            </>
                          )}
                        </td>
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
                      <th>{t('admin.manageBy')}</th>
                      <th>{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courts.map(court => {
                      const manager = court.claimedBy ? getMemberById(court.claimedBy) : null
                      return (
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
                          <td>
                            {manager ? (
                              <Link to={`/member/${manager.id}`}>{L(manager.name, lang)}</Link>
                            ) : (
                              <span className="text-muted">{t('admin.noManager')}</span>
                            )}
                          </td>
                          <td className="actions-cell">
                            <button
                              className="btn-sm btn-icon"
                              onClick={() => setEditingCourt(court)}
                              title={t('admin.editCourt')}
                            >
                              ✏️
                            </button>
                            <button
                              className="btn-sm btn-icon btn-danger"
                              onClick={() => handleDelete('court', court)}
                              title={t('admin.deleteCourt')}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {editingCourt && (
                <div className="modal-overlay" onClick={() => setEditingCourt(null)}>
                  <div className="modal-content edit-modal" onClick={e => e.stopPropagation()}>
                    <h3>{t('admin.editCourt')}</h3>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      handleCourtUpdate(editingCourt.id, editingCourt)
                    }}>
                      <div className="form-group">
                        <label>{t('admin.courtName')}</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editingCourt.name?.en || ''}
                          onChange={(e) => setEditingCourt({
                            ...editingCourt,
                            name: { ...editingCourt.name, en: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label>{t('admin.district')}</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editingCourt.district || ''}
                          onChange={(e) => setEditingCourt({ ...editingCourt, district: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>{t('admin.sport')}</label>
                        <select
                          className="form-input"
                          value={editingCourt.sport || ''}
                          onChange={(e) => setEditingCourt({ ...editingCourt, sport: e.target.value })}
                        >
                          <option value="">Select sport</option>
                          <option value="tennis">Tennis</option>
                          <option value="pickleball">Pickleball</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>{t('admin.surface')}</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editingCourt.surface || ''}
                          onChange={(e) => setEditingCourt({ ...editingCourt, surface: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>{t('admin.hours')}</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editingCourt.hours || ''}
                          onChange={(e) => setEditingCourt({ ...editingCourt, hours: e.target.value })}
                          placeholder="e.g. 6:00 AM - 10:00 PM"
                        />
                      </div>
                      <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={() => setEditingCourt(null)}>
                          {t('common.cancel')}
                        </button>
                        <button type="submit" className="btn-primary">
                          {t('common.save')}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="admin-section">
              <h2>{t('admin.manageListings')}</h2>
              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>{t('admin.title')}</th>
                      <th>{t('admin.price')}</th>
                      <th>{t('admin.category')}</th>
                      <th>{t('admin.condition')}</th>
                      <th>{t('admin.seller')}</th>
                      <th>{t('admin.status')}</th>
                      <th>{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.filter(l => !l.deleted).map(listing => {
                      const seller = getMemberById(listing.sellerId)
                      return (
                        <tr key={listing.id}>
                          <td>
                            <Link to={`/marketplace`}>
                              {listing.title}
                            </Link>
                          </td>
                          <td>
                            {listing.price === 0 ? t('marketplace.free') : `HKD ${listing.price}`}
                          </td>
                          <td>{listing.category}</td>
                          <td>{listing.condition}</td>
                          <td>
                            {seller ? (
                              <Link to={`/member/${seller.id}`}>{L(seller.name, lang)}</Link>
                            ) : (
                              <span className="text-muted">Unknown</span>
                            )}
                          </td>
                          <td>
                            <span className={`badge ${listing.status === 'available' ? 'badge-available' : 'badge-sold'}`}>
                              {listing.status === 'available' ? t('marketplace.available') : t('marketplace.sold')}
                            </span>
                          </td>
                          <td className="actions-cell">
                            <button
                              className="btn-sm btn-icon"
                              onClick={() => {
                                const newStatus = listing.status === 'available' ? 'sold' : 'available'
                                handleListingUpdate(listing.id, { ...listing, status: newStatus })
                              }}
                              title={listing.status === 'available' ? t('marketplace.markSold') : t('marketplace.markAvailable')}
                            >
                              🔄
                            </button>
                            <button
                              className="btn-sm btn-icon btn-danger"
                              onClick={() => handleDelete('listing', listing)}
                              title={t('admin.deleteListing')}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      )
                    })}
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
