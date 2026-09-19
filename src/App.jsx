import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useApp } from './context/AppContext'
import { Header, Footer } from './components/Header'
import { CourtMap } from './components/CourtCard'
import { ToastProvider } from './components/Toast'
import ErrorBoundary from './components/ErrorBoundary'
import { DiscoverPage } from './pages/DiscoverPage'
import { CourtDetailPage } from './pages/CourtDetailPage'
import { MembersPage } from './pages/MembersPage'
import { MemberProfilePage } from './pages/MemberProfilePage'
import { MatchingPage } from './pages/MatchingPage'
import { MessagesPage } from './pages/MessagesPage'
import { GroupsPage, GroupDetailPage } from './pages/GroupsPage'
import { MarketplacePage, MarketplaceDetailPage, MyListingsPage } from './pages/MarketplacePage'
import { CourtManagementPage } from './pages/CourtManagementPage'
import { LoginPage } from './pages/LoginPage'
import AdminPanelPage from './pages/AdminPanelPage'
import NotFoundPage from './pages/NotFoundPage'

const CourtMapModal = ({ court, onClose }) => {
  const { t, L, lang } = useApp()
  
  if (!court) return null
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-map" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{L(court.name, lang)}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="court-map-single">
            <CourtMap courts={[court]} activeId={court.id} onSelect={() => {}} />
          </div>
          <div className="court-map-info">
            <p className="court-address">
              <span className="meta-pin">📍</span>
              {L(court.address, lang)}
            </p>
            <a 
              href={`https://www.google.com/maps?q=${court.lat},${court.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-forest btn-sm"
            >
              {t('common.openInMaps')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useApp()
  if (!currentUser) return <Navigate to="/login" replace />
  return children
}

const AdminRoute = ({ children }) => {
  const { currentUser, isAdmin } = useApp()
  if (!currentUser) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DiscoverPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/member/:id" element={<MemberProfilePage />} />
      <Route path="/admin" element={
        <AdminRoute><AdminPanelPage /></AdminRoute>
      } />
      <Route path="/matching" element={
        <ProtectedRoute><MatchingPage /></ProtectedRoute>
      } />
      <Route path="/messages" element={
        <ProtectedRoute><MessagesPage /></ProtectedRoute>
      } />
      <Route path="/groups" element={<GroupsPage />} />
      <Route path="/groups/:id" element={<GroupDetailPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/marketplace/:id" element={<MarketplaceDetailPage />} />
      <Route path="/marketplace/mine" element={
        <ProtectedRoute><MyListingsPage /></ProtectedRoute>
      } />
      <Route path="/courts/manage" element={
        <ProtectedRoute><CourtManagementPage /></ProtectedRoute>
      } />
      <Route path="/court/:id" element={<CourtDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

const AppShell = () => {
  const { currentUser, lang } = useApp()
  const [selectedCourtForMap, setSelectedCourtForMap] = useState(null)

  useEffect(() => {
    const handleShowCourtMap = (e) => {
      setSelectedCourtForMap(e.detail)
    }
    window.addEventListener('showCourtMap', handleShowCourtMap)
    return () => window.removeEventListener('showCourtMap', handleShowCourtMap)
  }, [])

  return (
    <div className={`app lang-${lang}`}>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
      {selectedCourtForMap && (
        <CourtMapModal 
          court={selectedCourtForMap} 
          onClose={() => setSelectedCourtForMap(null)} 
        />
      )}
    </div>
  )
}

const AppLoginShell = () => {
  return (
    <div className="app">
      <AppRoutes />
    </div>
  )
}

export default function App() {
  const { currentUser } = useApp()

  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          {!currentUser ? <AppLoginShell /> : <AppShell />}
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  )
}
