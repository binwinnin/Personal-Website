"use client"

import { useState, useRef, useEffect } from "react"

const CHAT_TRANSCRIPT_FORM_ID = "YOUR_CHAT_FORM_ID"

type Message = { role: "user" | "assistant"; content: string }

const GREETING: Message = {
  role: "assistant",
  content: "Hi! I'm the Lakes Region Web Co. assistant. I can help you learn about our packages, services, or get you to the right part of the page. What can I help you with?",
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [ended, setEnded] = useState(false)
  const [sent, setSent] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading || ended) return
    setInput("")
    const updated: Message[] = [...messages, { role: "user", content: text }]
    setMessages(updated)
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      setMessages([...updated, { role: "assistant", content: data.text }])
    } catch {
      setMessages([...updated, { role: "assistant", content: "Sorry, something went wrong. Please try again or call us at (413) 275-3135." }])
    } finally {
      setLoading(false)
    }
  }

  const endChat = async () => {
    setEnded(true)
    const transcript = messages
      .map((m) => `${m.role === "assistant" ? "Bot" : "Visitor"}: ${m.content}`)
      .join("\n\n")
    try {
      await fetch(`https://formspree.io/f/${CHAT_TRANSCRIPT_FORM_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "New Chat Transcript — Lakes Region Web Co.",
          transcript,
          _replyto: "no-reply@lrwc.com",
        }),
      })
      setSent(true)
    } catch {
      setSent(true)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="chat-fab"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">LR</div>
              <div>
                <div className="chat-name">Lakes Region Web Co.</div>
                <div className="chat-status">AI Assistant</div>
              </div>
            </div>
            <button onClick={endChat} disabled={ended} className="chat-end-btn" title="End conversation and email transcript">
              {ended ? (sent ? "Transcript sent ✓" : "Sending…") : "End Chat"}
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble-wrap ${m.role}`}>
                <div className={`chat-bubble ${m.role}`}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-bubble-wrap assistant">
                <div className="chat-bubble assistant chat-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            {ended && (
              <div className="chat-bubble-wrap assistant">
                <div className="chat-bubble assistant">Thanks for chatting! We'll be in touch. You can also reach us at (413) 275-3135.</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <input
              ref={inputRef}
              className="chat-input"
              placeholder={ended ? "Conversation ended" : "Type a message…"}
              value={input}
              disabled={ended}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button className="chat-send-btn" onClick={send} disabled={loading || ended || !input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
