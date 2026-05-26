import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  buildDashboardContext,
  getDeterministicAnswer,
} from "@/lib/chat/dashboardContext";
import type { FilterState } from "@/lib/types";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  message?: string;
  messages?: ChatMessage[];
  filters?: Partial<FilterState>;
  activePage?: string;
  lastUpdated?: string;
};

async function readAiPipelineReference() {
  const filePath = path.join(process.cwd(), "..", "..", "ai_pipline", "Data.json");

  try {
    const raw = await readFile(filePath, "utf8");
    if (!raw.trim()) return { note: "ai_pipline/Data.json is empty." };
    return JSON.parse(raw);
  } catch (error) {
    return {
      note: "Unable to read ai_pipline/Data.json.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

function buildPrompt({
  message,
  messages,
  dashboardContext,
  aiPipelineReference,
}: {
  message: string;
  messages: ChatMessage[];
  dashboardContext: ReturnType<typeof buildDashboardContext>;
  aiPipelineReference: unknown;
}) {
  const history = messages
    .slice(-8)
    .map((item) => `${item.role === "assistant" ? "Assistant" : "User"}: ${item.content}`)
    .join("\n");

  return `You are MedVista AI, an executive hospital analytics assistant embedded inside the MedVista dashboard.

Answer using only the supplied dashboard context and ai_pipline/Data.json reference. If a metric is unavailable, say that it is not available in the current dashboard context. For arithmetic questions, use the exactMetrics block first and show the final number clearly. Keep answers concise, practical, and grounded in the data.

Current user question:
${message}

Recent chat history:
${history || "No previous messages."}

Dashboard context from the frontend:
${JSON.stringify(dashboardContext, null, 2)}

ai_pipline/Data.json reference:
${JSON.stringify(aiPipelineReference, null, 2)}`;
}

function extractGeminiText(payload: {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}) {
  return payload.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const dashboardContext = buildDashboardContext({
    filters: body.filters,
    activePage: body.activePage,
    lastUpdated: body.lastUpdated,
  });
  const aiPipelineReference = await readAiPipelineReference();
  const deterministicAnswer = getDeterministicAnswer(message, dashboardContext);

  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          deterministicAnswer ||
          "Gemini is not configured yet. Add GEMINI_API_KEY to frontend/Accelerate-main/.env.local and restart the dev server.",
      },
      { status: deterministicAnswer ? 200 : 503 },
    );
  }

  const prompt = buildPrompt({
    message,
    messages: body.messages ?? [],
    dashboardContext,
    aiPipelineReference,
  });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topP: 0.9,
            maxOutputTokens: 700,
          },
        }),
      },
    );

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json(
        {
          reply:
            deterministicAnswer ||
            "Gemini could not answer right now, but the dashboard context was prepared successfully.",
          error: details,
        },
        { status: deterministicAnswer ? 200 : 502 },
      );
    }

    const data = await response.json();
    const reply = extractGeminiText(data) || deterministicAnswer;

    if (!reply) {
      return NextResponse.json(
        { error: "Gemini returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      {
        reply:
          deterministicAnswer ||
          "Unable to reach Gemini right now. Please check your network and API key configuration.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: deterministicAnswer ? 200 : 502 },
    );
  }
}
