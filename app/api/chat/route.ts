import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a friendly assistant for Lakes Region Web Co., a custom web design company based in New Hampshire. Help visitors learn about the company and navigate the site. Keep replies short and conversational — 1–3 sentences max.

About the company:
- 100% custom websites, no templates
- NH-based, personal and local service
- Phone: (413) 275-3135

Packages:
- Startup: $299 — Great for small businesses getting online fast
- Professional: $499 — For growing businesses that need more
- Business Pro: $749 — Includes an AI chatbot (like this one!)

Page sections (tell users to click the nav or scroll):
- Home / Hero — top of the page
- Services — what we build and offer
- How It Works — our simple 3-step process
- Pricing — package comparison
- Contact — the form to get in touch

If someone is ready to start or has a specific question, point them to the contact section or give them the phone number. Be warm, helpful, and concise.`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages,
    })

    const text =
      response.content[0].type === "text" ? response.content[0].text : ""
    return NextResponse.json({ text })
  } catch (err) {
    console.error("Chat API error:", err)
    return NextResponse.json(
      { text: "Sorry, I'm having trouble right now. Please call us at (413) 275-3135." },
      { status: 500 }
    )
  }
}
