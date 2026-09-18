import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Avatar, EmptyState } from '../components/ui'

const fmtTime = (iso) => {
  const d = new Date(iso)
  const now = new Date()
  const sameDay = d.toDateString() === now.toDateString()
  const hh = d.getHours().toString().padStart(2, '0')
  const mm = d.getMinutes().toString().padStart(2, '0')
  if (sameDay) return `${hh}:${mm}`
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')} ${hh}:${mm}`
}

export const MessagesPage = () => {
  const {
    t, L, lang, currentUserId, currentUser,
    conversationsFor, memberById, connectedMembers,
    messages, sendMessage
  } = useApp()

  const [params, setParams] = useSearchParams()
  const [activeConvId, setActiveConvId] = useState(params.get('to') ? `pending-${params.get('to')}` : null)
  const [text, setText] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [newTargetId, setNewTargetId] = useState(null)
  const bottomRef = useRef(null)

  const myConvos = conversationsFor(currentUserId)
  const connected = connectedMembers(currentUserId)

  useEffect(() => {
    if (params.get('to')) {
      const toId = params.get('to')
      const existing = messages.find(
        (m) => m.participants.includes(currentUserId) && m.participants.includes(toId)
      )
      if (existing) {
        setActiveConvId(existing.id)
      } else {
        setActiveConvId(`pending-${toId}`)
        setNewTargetId(toId)
      }
      setParams({}, { replace: true })
    }
  }, [params])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConvId, messages])

  const otherParticipant = (conv) => {
    const otherId = conv.participants.find((p) => p !== currentUserId)
    return memberById(otherId)
  }

  const send = () => {
    if (!text.trim()) return
    if (activeConvId && activeConvId.startsWith('pending-')) {
      const toId = activeConvId.slice(8)
      const newConvId = sendMessage(null, [currentUserId, toId], { en: text, zh: text })
      setActiveConvId(newConvId)
      setText('')
      setShowNew(false)
      setNewTargetId(null)
      return
    }
    if (activeConvId) {
      sendMessage(activeConvId, null, { en: text, zh: text })
      setText('')
    }
  }

  const startConversation = (memberId) => {
    setNewTargetId(memberId)
    setShowNew(true)
    setActiveConvId(`pending-${memberId}`)
  }

  const activeConv = activeConvId && !activeConvId.startsWith('pending-')
    ? messages.find((m) => m.id === activeConvId)
    : null
  const activeOther = activeConv ? otherParticipant(activeConv) : newTargetId ? memberById(newTargetId) : null

  return (
    <div className="page messages-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">{t('messages.title')}</h1>
          <p className="page-subtitle">{t('messages.subtitle')}</p>
        </div>
      </section>

      <section className="container messages-layout">
        <div className="messages-sidebar">
          <div className="messages-sidebar-head">
            <span className="messages-sidebar-title">{t('messages.inbox')}</span>
            <button
              className="icon-btn btn-round"
              onClick={() => setShowNew((s) => !s)}
              title={t('messages.newConversation')}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            </button>
          </div>

          {showNew && (
            <div className="new-conv-panel">
              <p className="new-conv-title">{t('messages.connectedPlayers')}</p>
              {connected.length === 0 ? (
                <p className="sidebar-muted">{t('messages.noConversations')}</p>
              ) : (
                connected.map((m) => (
                  <button
                    key={m.id}
                    className={`new-conv-row ${newTargetId === m.id ? 'active' : ''}`}
                    onClick={() => startConversation(m.id)}
                  >
                    <Avatar member={m} size={32} lang={lang} />
                    <span>{m.name}</span>
                  </button>
                ))
              )}
            </div>
          )}

          <div className="conv-list">
            {myConvos.length === 0 && !showNew ? (
              <EmptyState icon="💬" title={t('messages.noConversations')} />
            ) : (
              myConvos.map((conv) => {
                const other = otherParticipant(conv)
                const last = conv.messages[conv.messages.length - 1]
                return (
                  <button
                    key={conv.id}
                    className={`conv-row ${activeConvId === conv.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveConvId(conv.id)
                      setShowNew(false)
                      setNewTargetId(null)
                    }}
                  >
                    <Avatar member={other} size={44} lang={lang} />
                    <div className="conv-row-body">
                      <div className="conv-row-top">
                        <strong>{other?.name}</strong>
                        <span className="conv-time">{fmtTime(last.at)}</span>
                      </div>
                      <p className="conv-preview">
                        {last.from === currentUserId ? `${t('messages.you')}: ` : ''}
                        {L(last.text, lang)}
                      </p>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        <div className="messages-main">
          {activeOther ? (
            <>
              <div className="chat-head">
                <Link to={`/member/${activeOther.id}`} className="chat-user">
                  <Avatar member={activeOther} size={40} lang={lang} />
                  <div>
                    <strong>{activeOther.name}</strong>
                    <span className="chat-status">
                      {isOnline(activeOther) ? t('messages.online') : t('messages.lastSeen')}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="chat-body">
                {activeConv ? (
                  activeConv.messages.map((m, i) => {
                    const mine = m.from === currentUserId
                    const author = mine ? currentUser : activeOther
                    const prev = activeConv.messages[i - 1]
                    const showAvatar = !prev || prev.from !== m.from
                    return (
                      <div className={`chat-row ${mine ? 'mine' : ''}`} key={i}>
                        {!mine && (showAvatar ? <Avatar member={author} size={30} lang={lang} /> : <span className="chat-avatar-spacer" />)}
                        <div className="chat-bubble-wrap">
                          <div className="chat-bubble">{L(m.text, lang)}</div>
                          <span className="chat-time">{fmtTime(m.at)}</span>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="chat-empty-new">
                    <Avatar member={activeOther} size={56} lang={lang} />
                    <p>{t('messages.selectPlayer')}</p>
                    <p className="sidebar-muted">{L(activeOther.bio, lang)}</p>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
              <div className="chat-input-bar">
                <input
                  type="text"
                  placeholder={t('messages.messagePlaceholder')}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                />
                <button className="btn btn-lime" onClick={send} disabled={!text.trim()}>
                  {t('messages.send')}
                </button>
              </div>
            </>
          ) : (
            <div className="chat-empty">
              <EmptyState
                icon="💬"
                title={t('messages.emptyTitle')}
                subtitle={t('messages.emptySubtitle')}
                action={
                  <button className="btn btn-forest" onClick={() => setShowNew(true)}>
                    {t('messages.newConversation')}
                  </button>
                }
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

const isOnline = () => true