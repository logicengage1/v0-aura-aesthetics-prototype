import { NextRequest, NextResponse } from "next/server"
import { SYSTEM_PROMPT } from "@/lib/chat-prompt"

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
const MODEL = "claude-sonnet-5"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export async function POST(req: NextRequest) {
  let messages: ChatMessage[]
  try {
    const body = await req.json()
    messages = body?.messages
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages is required." }, { status: 400 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Chat is not configured." }, { status: 500 })
  }

  let reply = ""
  try {
    const anthropicRes = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 300,
        thinking: { type: "disabled" },
        system: SYSTEM_PROMPT,
        messages,
      }),
    })

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text()
      console.error("Anthropic API error:", anthropicRes.status, errText)
      return NextResponse.json({ error: "Chat service is unavailable." }, { status: 502 })
    }

    const data = await anthropicRes.json()
    const textBlock = data?.content?.find((block: { type: string }) => block.type === "text")
    reply = textBlock?.text ?? ""
  } catch (err) {
    console.error("Chat route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }

  logLead(messages, reply).catch((err) => console.error("Airtable logging failed:", err))

  return NextResponse.json({ reply })
}

async function logLead(messages: ChatMessage[], reply: string) {
  const token = process.env.AIRTABLE_TOKEN
  const base = process.env.AIRTABLE_BASE
  const table = process.env.AIRTABLE_TABLE
  if (!token || !base || !table) return

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content ?? ""

  await fetch(`https://api.airtable.com/v0/${base}/${table}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        Name: "Chat Lead",
        Appointment: new Date().toISOString(),
        Treatment: lastUserMessage.slice(0, 100),
        Reply: reply.slice(0, 500),
      },
    }),
  })
}
