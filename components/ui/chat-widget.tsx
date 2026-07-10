"use client"

import { useState, useEffect, useRef } from "react"
import { useBooking, type TreatmentArea } from "@/lib/booking-context"

const TREATMENT_AREAS: TreatmentArea[] = [
  "forehead",
  "crows-feet",
  "frown-lines",
  "bunny-lines",
  "lip-flip",
  "neck-bands",
]

const BOOK_NOW_MARKER = /\[\[BOOK_NOW(?::([a-z-]+))?\]\]\s*$/i

function parseBookingCta(text: string): { cleaned: string; treatment?: TreatmentArea; ready: boolean } {
  const match = text.match(BOOK_NOW_MARKER)
  if (!match) return { cleaned: text, ready: false }
  const slug = match[1] as TreatmentArea | undefined
  const treatment = slug && TREATMENT_AREAS.includes(slug) ? slug : undefined
  return { cleaned: text.slice(0, match.index).trim(), treatment, ready: true }
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  isTyping?: boolean
  bookingReady?: boolean
  bookingTreatment?: TreatmentArea
}

interface QuickReply {
  label: string
  value: string
}

export function ChatWidget() {
  const { setIsOpen: setBookingOpen, toggleTreatment } = useBooking()
  const [isOpen, setIsOpen]           = useState(false)
  const [messages, setMessages]       = useState<Message[]>([])
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([])
  const [input, setInput]             = useState('')
  const [isLoading, setIsLoading]     = useState(false)
  const [history, setHistory]         = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const messagesEndRef                = useRef<HTMLDivElement>(null)
  const textareaRef                   = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) initConversation()
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function initConversation() {
    setMessages([{
      role: 'assistant',
      content: "Thanks for visiting Aura Aesthetics 👋 Ask me anything about our Botox treatments, pricing, or process — or I can help you book a consultation right away."
    }])
    setQuickReplies([
      { label: "What treatments do you offer?", value: "What treatment areas do you offer?" },
      { label: "Pricing 💆",                    value: "What are your prices?" },
      { label: "Book a consultation 📅",         value: "I want to book an appointment." },
    ])
  }

  // ── BOOKING HANDOFF ────────────────────────────────────────
  function handleBookNow(treatment?: TreatmentArea) {
    if (treatment) toggleTreatment(treatment)
    setIsOpen(false)
    setBookingOpen(true)
  }

  // ── MAIN SEND FUNCTION ────────────────────────────────────
  async function sendMessage(value?: string, displayLabel?: string) {
    const text = (value || input).trim()
    if (!text || isLoading) return

    setMessages(prev => [...prev, { role: 'user', content: displayLabel || text }])
    setInput('')
    setQuickReplies([])
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    const newHistory = [...history, { role: 'user' as const, content: text }]
    setHistory(newHistory)
    setIsLoading(true)
    setMessages(prev => [...prev, { role: 'assistant', content: '', isTyping: true }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory }),
      })

      if (!res.ok) throw new Error('Chat request failed')

      const data = await res.json()
      const rawReply: string = data?.reply || "We're having a moment — please try again shortly 🌸"
      const { cleaned, treatment, ready } = parseBookingCta(rawReply)

      setHistory(prev => [...prev, { role: 'assistant', content: rawReply }])
      setMessages(prev => prev.map((m, i) =>
        i === prev.length - 1
          ? { role: 'assistant', content: cleaned, bookingReady: ready, bookingTreatment: treatment }
          : m
      ))
    } catch {
      setMessages(prev => prev.map((m, i) =>
        i === prev.length - 1
          ? { role: 'assistant', content: "We're having a moment — please try again shortly 🌸" }
          : m
      ))
    }

    setIsLoading(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px'
  }

  // ── RENDER ────────────────────────────────────────────────
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .aura-widget { font-family: 'Inter', system-ui, sans-serif; }
        .aura-bubble-bot  { background:#FDFBF7; border:1px solid #E2D9C9; color:#2C2C2C; border-bottom-left-radius:4px; }
        .aura-bubble-user { background:#2C2C2C; color:white; border-bottom-right-radius:4px; }
        .aura-dot { width:6px;height:6px;background:#767676;border-radius:50%;animation:auraBounce 1.2s infinite; }
        .aura-dot:nth-child(2){animation-delay:.2s}
        .aura-dot:nth-child(3){animation-delay:.4s}
        @keyframes auraBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
        @keyframes auraFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes auraPulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .aura-msg { animation: auraFadeUp 0.25s ease; }
        .aura-launcher { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s; }
        .aura-launcher:hover { transform: scale(1.08) rotate(8deg); box-shadow: 0 16px 40px -10px rgba(152,169,147,0.5); }
        .aura-qr:hover { background: #98A993 !important; color: #fff !important; }
      ` }} />

      {/* ── LAUNCHER BUTTON ── */}
      <button
        className="aura-launcher"
        onClick={() => setIsOpen(o => !o)}
        aria-label="Open Aura chat"
        style={{
          position:'fixed', bottom:24, right:24, width:64, height:64,
          borderRadius:'50%', background:'#98A993', border:'none', cursor:'pointer',
          boxShadow:'0 10px 30px -10px rgba(0,0,0,0.12)',
          display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999,
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {/* ── WIDGET SHELL ── */}
      {isOpen && (
        <div
          className="aura-widget"
          style={{
            position:'fixed', bottom:100, right:16,
            width:'min(392px, calc(100vw - 32px))', maxHeight:'min(640px, calc(100vh - 120px))',
            display:'flex', flexDirection:'column',
            background:'#F5F0E8', borderRadius:'2rem',
            boxShadow:'0 10px 30px -10px rgba(0,0,0,0.12), 0 4px 10px -5px rgba(0,0,0,0.04)',
            border:'1px solid #E2D9C9', zIndex:9998, overflow:'hidden',
            animation:'auraFadeUp 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* HEADER */}
          <div style={{
            background:'#98A993', padding:'20px 22px 18px',
            display:'flex', alignItems:'center', gap:12,
            flexShrink:0, position:'relative', overflow:'hidden',
          }}>
            <div style={{ position:'absolute', top:'-40%', right:'-20%', width:140, height:140, background:'rgba(255,255,255,0.08)', borderRadius:'50%' }} />
            <div style={{ width:42, height:42, background:'rgba(255,255,255,0.18)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0, position:'relative', zIndex:1 }}>✨</div>
            <div style={{ flex:1, position:'relative', zIndex:1 }}>
              <div style={{ fontFamily:"'Playfair Display', Georgia, serif", color:'#fff', fontSize:16, fontWeight:600 }}>Aura Aesthetics</div>
              <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.82)', display:'flex', alignItems:'center', gap:5, marginTop:3, textTransform:'uppercase', letterSpacing:'0.1em', fontWeight:600 }}>
                <span style={{ width:6, height:6, background:'#C9A96E', borderRadius:'50%', display:'inline-block', animation:'auraPulse 2s infinite' }} />
                Online now
              </div>
            </div>
          </div>

          {/* MESSAGES */}
          <div style={{ flex:1, overflowY:'auto', padding:'18px 16px 8px', display:'flex', flexDirection:'column', gap:12 }}>
            {messages.map((msg, i) => (
              <div key={i} className="aura-msg" style={{ display:'flex', alignItems:'flex-end', gap:8, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width:26, height:26, background:'#98A993', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0 }}>✨</div>
                )}
                <div
                  className={msg.role === 'assistant' ? 'aura-bubble-bot' : 'aura-bubble-user'}
                  style={{ maxWidth:'80%', padding: msg.isTyping ? '15px 18px' : '12px 16px', borderRadius:18, fontSize:14, lineHeight:1.55, wordBreak:'break-word', display: msg.isTyping ? 'flex' : 'block', gap: msg.isTyping ? 5 : 0 }}
                >
                  {msg.isTyping ? (
                    <><span className="aura-dot"/><span className="aura-dot"/><span className="aura-dot"/></>
                  ) : (
                    <>
                      <span dangerouslySetInnerHTML={{ __html:
                        msg.content
                          .replace(/&/g,'&amp;')
                          .replace(/</g,'&lt;')
                          .replace(/>/g,'&gt;')
                          .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
                          .replace(/\n/g,'<br/>')
                      }} />
                      {msg.bookingReady && (
                        <button
                          onClick={() => handleBookNow(msg.bookingTreatment)}
                          style={{ display:'block', marginTop:10, width:'100%', background:'#98A993', color:'#fff', border:'none', borderRadius:14, padding:'10px 14px', fontSize:13.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}
                        >
                          Book Now 📅
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* QUICK REPLIES */}
          {quickReplies.length > 0 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, padding:'0 16px 10px' }}>
              {quickReplies.map((qr, i) => (
                <button
                  key={i}
                  className="aura-qr"
                  onClick={() => sendMessage(qr.value, qr.label)}
                  style={{ background:'#FDFBF7', border:'1.5px solid #98A993', color:'#7E9078', borderRadius:20, padding:'7px 14px', fontSize:12.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit', transition:'background 0.2s, color 0.2s' }}
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {/* INPUT BAR */}
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 14px', borderTop:'1px solid #E2D9C9', background:'#FDFBF7', flexShrink:0 }}>
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Ask us anything..."
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              style={{ flex:1, border:'1.5px solid #E2D9C9', borderRadius:22, padding:'10px 16px', fontSize:14, fontFamily:'inherit', background:'#F5F0E8', color:'#2C2C2C', outline:'none', resize:'none', maxHeight:90, lineHeight:1.4 }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              style={{ width:40, height:40, borderRadius:'50%', background:'#98A993', border:'none', cursor: isLoading ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', opacity: isLoading || !input.trim() ? 0.4 : 1, flexShrink:0 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

          <div style={{ textAlign:'center', fontSize:9.5, color:'#767676', padding:'5px 0 9px', letterSpacing:'0.05em', textTransform:'uppercase', fontWeight:600, background:'#FDFBF7' }}>
            Aura Aesthetics & Wellness · AI Concierge
          </div>
        </div>
      )}
    </>
  )
}
