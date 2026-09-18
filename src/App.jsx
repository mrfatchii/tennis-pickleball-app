import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import { Header, Footer } from './components/Header'
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

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useApp()
  if (!currentUser) return <Navigate to="/login" replace />
  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DiscoverPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/member/:id" element={<MemberProfilePage />} />
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
    </Routes>
  )
}

const AppShell = () => {
  const { currentUser, lang } = useApp()

  return (
    <div className={`app lang-${lang}`}>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
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

  if (!currentUser) {
    return (
      <BrowserRouter>
        <AppLoginShell />
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
