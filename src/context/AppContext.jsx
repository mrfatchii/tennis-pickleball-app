import React, { createContext, useContext, useMemo, useState } from 'react'
import { courts as seedCourts, reviews as seedReviews, members as seedMembers, groups as seedGroups, listings as seedListings, connections as seedConnections, connectRequests as seedRequests, messages as seedMessages, sports, districts, surfaces, environments, levels, groupTypes, gearCategories, conditions, playStyles } from '../data'
import { dict, L } from '../i18n'

const AppContext = createContext(null)

export const useApp = () => useContext(AppContext)

const todayISO = () => new Date().toISOString().slice(0, 10)
const nowISO = () => new Date().toISOString()

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState('en')
  const [currentUserId, setCurrentUserId] = useState('m1')
  const [courts, setCourts] = useState(seedCourts)
  const [reviews, setReviews] = useState(seedReviews)
  const [members, setMembers] = useState(seedMembers)
  const [groups, setGroups] = useState(seedGroups)
  const [listings, setListings] = useState(seedListings)
  const [connections, setConnections] = useState(seedConnections)
  const [connectRequests, setConnectRequests] = useState(seedRequests)
  const [messages, setMessages] = useState(seedMessages)
  const [toast, setToast] = useState(null)

  const t = useMemo(() => (key) => {
    const keys = key.split('.')
    let node = dict[lang]
    for (const k of keys) node = node?.[k]
    return node ?? key
  }, [lang])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3200)
  }

  const currentUser = members.find((m) => m.id === currentUserId) || null
  const isAdmin = currentUser?.role === 'admin'

  const courtById = (id) => courts.find((c) => c.id === id)

  const reviewsForCourt = (courtId) => reviews.filter((r) => r.courtId === courtId)

  const courtRating = (courtId) => {
    const rs = reviewsForCourt(courtId)
    if (!rs.length) return null
    const avg = rs.reduce((s, r) => s + r.rating, 0) / rs.length
    return Math.round(avg * 10) / 10
  }

  const memberById = (id) => members.find((m) => m.id === id)

  const isConnected = (a, b) =>
    connections.some((c) => (c.userA === a && c.userB === b) || (c.userA === b && c.userB === a))

  const connectionCount = (memberId) => connections.filter((c) => c.userA === memberId || c.userB === memberId).length

  const requestState = (fromId, toId) => {
    const req = connectRequests.find(
      (r) => (r.from === fromId && r.to === toId) || (r.from === toId && r.to === fromId)
    )
    return req || null
  }

  const groupById = (id) => groups.find((g) => g.id === id)

  const listingById = (id) => listings.find((l) => l.id === id)

  const memberListings = (memberId) => listings.filter((l) => l.sellerId === memberId)

  const conversationsFor = (memberId) => {
    return messages
      .filter((m) => m.participants.includes(memberId))
      .sort((a, b) => {
        const lb = a.messages[a.messages.length - 1].at
        const rb = b.messages[b.messages.length - 1].at
        return rb.localeCompare(lb)
      })
  }

  const connectedMembers = (memberId) => {
    return connections
      .filter((c) => c.userA === memberId || c.userB === memberId)
      .map((c) => memberById(c.userA === memberId ? c.userB : c.userA))
      .filter(Boolean)
  }

  const login = (memberId) => {
    setCurrentUserId(memberId)
    showToast(`${t('login.continueAs')} ${members.find((m) => m.id === memberId)?.name}`)
  }

  const logout = () => setCurrentUserId(null)

  const addReview = (courtId, rating, text) => {
    const review = {
      id: `r${Date.now()}`,
      courtId,
      authorId: currentUserId,
      rating,
      date: todayISO(),
      text
    }
    setReviews((prev) => [...prev, review])
    showToast(t('reviews.reviewUpdated'))
  }

  const deleteReview = (reviewId) => setReviews((prev) => prev.filter((r) => r.id !== reviewId))

  const claimCourt = (courtId) => {
    setCourts((prev) => prev.map((c) => (c.id === courtId ? { ...c, claimedBy: currentUserId } : c)))
    showToast(t('courtMgmt.claimRequested'))
  }

  const unclaimCourt = (courtId) => {
    setCourts((prev) => prev.map((c) => (c.id === courtId ? { ...c, claimedBy: null } : c)))
  }

  const updateCourt = (courtId, patch) => {
    setCourts((prev) => prev.map((c) => (c.id === courtId ? { ...c, ...patch } : c)))
    showToast(t('courtMgmt.listingUpdated'))
  }

  const updateProfile = (memberId, patch) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, ...patch } : m)))
    showToast(t('members.profileUpdated'))
  }

  const sendConnectRequest = (toId) => {
    setConnectRequests((prev) => [
      ...prev,
      { id: `cr${Date.now()}`, from: currentUserId, to: toId, status: 'pending', sentAt: todayISO() }
    ])
    showToast(t('matching.requestSent'))
  }

  const acceptRequest = (requestId) => {
    const req = connectRequests.find((r) => r.id === requestId)
    if (!req) return
    setConnections((prev) => [
      ...prev,
      { id: `cn${Date.now()}`, userA: req.from, userB: req.to, since: todayISO() }
    ])
    setConnectRequests((prev) => prev.filter((r) => r.id !== requestId))
    showToast(t('matching.requestAccepted'))
  }

  const declineRequest = (requestId) => {
    setConnectRequests((prev) => prev.filter((r) => r.id !== requestId))
    showToast(t('matching.requestDeclined'))
  }

  const sendMessage = (conversationId, participantIds, text) => {
    const msg = { from: currentUserId, text, at: nowISO() }
    const existing = messages.find((m) => m.id === conversationId)
    if (existing) {
      setMessages((prev) =>
        prev.map((m) => (m.id === conversationId ? { ...m, messages: [...m.messages, msg] } : m))
      )
      return conversationId
    } else {
      const newId = `con${Date.now()}`
      setMessages((prev) => [
        ...prev,
        { id: newId, participants: participantIds, messages: [msg] }
      ])
      return newId
    }
  }

  const createGroup = (groupData) => {
    const group = {
      id: `g${Date.now()}`,
      adminId: currentUserId,
      members: [currentUserId],
      activities: [],
      ...groupData
    }
    setGroups((prev) => [...prev, group])
    showToast(t('groups.groupCreated'))
    return group.id
  }

  const joinGroup = (groupId) => {
    const g = groupById(groupId)
    if (!g) return
    if (g.type === 'public') {
      setGroups((prev) =>
        prev.map((x) => (x.id === groupId ? { ...x, members: [...x.members, currentUserId] } : x))
      )
      showToast(t('groups.joined'))
    } else {
      showToast(t('groups.pendingApproval'))
    }
  }

  const leaveGroup = (groupId) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, members: g.members.filter((m) => m !== currentUserId) } : g))
    )
  }

  const addActivity = (groupId, activity) => {
    const act = { id: `a${Date.now()}`, joined: [currentUserId], ...activity }
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, activities: [...g.activities, act] } : g))
    )
    showToast(t('groups.activityCreated'))
  }

  const joinActivity = (groupId, activityId) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              activities: g.activities.map((a) =>
                a.id === activityId && !a.joined.includes(currentUserId)
                  ? { ...a, joined: [...a.joined, currentUserId] }
                  : a
              )
            }
          : g
      )
    )
  }

  const createListing = (listingData) => {
    const listing = {
      id: `l${Date.now()}`,
      sellerId: currentUserId,
      status: 'available',
      listedOn: todayISO(),
      ...listingData
    }
    setListings((prev) => [...prev, listing])
    showToast(t('marketplace.listingCreated'))
    return listing.id
  }

  const updateListing = (listingId, patch) => {
    setListings((prev) => prev.map((l) => (l.id === listingId ? { ...l, ...patch } : l)))
    showToast(t('marketplace.statusChanged'))
  }

  const deleteListing = (listingId) => {
    setListings((prev) => prev.filter((l) => l.id !== listingId))
    showToast(t('marketplace.listingDeleted'))
  }

  const value = {
    lang,
    setLang,
    t,
    currentUser,
    currentUserId,
    isAdmin,
    login,
    logout,
    toast,
    showToast,
    courts,
    reviews,
    members,
    groups,
    listings,
    connections,
    connectRequests,
    messages,
    L,
    sports,
    districts,
    surfaces,
    environments,
    levels,
    groupTypes,
    gearCategories,
    conditions,
    playStyles,
    courtById,
    reviewsForCourt,
    courtRating,
    memberById,
    isConnected,
    connectionCount,
    requestState,
    groupById,
    listingById,
    memberListings,
    conversationsFor,
    connectedMembers,
    addReview,
    deleteReview,
    claimCourt,
    unclaimCourt,
    updateCourt,
    updateProfile,
    sendConnectRequest,
    acceptRequest,
    declineRequest,
    sendMessage,
    createGroup,
    joinGroup,
    leaveGroup,
    addActivity,
    joinActivity,
    createListing,
    updateListing,
    deleteListing
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}