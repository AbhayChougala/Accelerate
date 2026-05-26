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
  pageTitle?: string;
  lastUpdated?: string;
  frontendContext?: {
    pageTitle?: string;
    path?: string;
    filters?: Partial<FilterState>;
    lastUpdated?: string;
  };
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
  frontendContext,
}: {
  message: string;
  messages: ChatMessage[];
  dashboardContext: ReturnType<typeof buildDashboardContext>;
  aiPipelineReference: unknown;
  frontendContext: ChatRequest["frontendContext"];
}) {
  const history = messages
    .slice(-8)
    .map((item) => `${item.role === "assistant" ? "Assistant" : "User"}: ${item.content}`)
    .join("\n");

  return `You are Accelerate AI, an executive hospital analytics assistant embedded inside the Accelerate dashboard.

Answer using only the supplied dashboard context, frontend context, and ai_pipline/Data.json reference. If a metric is unavailable, say that it is not available in the current dashboard context. For questions about "this page", "current screen", "here", or visible filters, prioritize the frontend context and active dashboard view. For arithmetic questions, use the exactMetrics block first and show the final number clearly. Keep answers concise, practical, and grounded in the data.

Current user question:
${message}

Recent chat history:
${history || "No previous messages."}

Frontend context from the active dashboard screen:
${JSON.stringify(frontendContext, null, 2)}

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

function getConversationalReply(message: string) {
  const normalized = message.toLowerCase().replace(/[^\w\s]/g, "").trim();
  const greetings = new Set(["hi", "hello", "hey", "hey there", "good morning", "good afternoon", "good evening"]);

  if (greetings.has(normalized)) {
    return "Hello! I'm Accelerate AI. I can help with hospital performance, bed availability, ICU occupancy, profitability, departments, claims, and forecasts. What would you like to check?";
  }

  if (["thanks", "thank you", "thx"].includes(normalized)) {
    return "You're welcome. Ask me whenever you want to inspect another hospital metric.";
  }

  return null;
}

function getFrontendContextAnswer(message: string, frontendContext: NonNullable<ChatRequest["frontendContext"]>) {
  const normalized = message.toLowerCase();
  const asksCurrentPage =
    normalized.includes("current page") ||
    normalized.includes("this page") ||
    normalized.includes("current screen") ||
    normalized.includes("where am i") ||
    normalized.includes("which page");
  const asksFilters =
    normalized.includes("filter") ||
    normalized.includes("branch selected") ||
    normalized.includes("selected branch");

  if (asksCurrentPage) {
    return `You are currently on the ${frontendContext.pageTitle || "active dashboard"} page (${frontendContext.path || "route unavailable"}).`;
  }

  if (asksFilters) {
    const filters = frontendContext.filters;
    if (!filters) return "No frontend filters were provided with this chat request.";

    return `Current filters: date range ${filters.dateRange || "not set"}, branch ${filters.branch || "not set"}, department ${filters.department || "not set"}, doctor ${filters.doctor || "not set"}.`;
  }

  return null;
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

  const conversationalReply = getConversationalReply(message);
  if (conversationalReply) {
    return NextResponse.json({ reply: conversationalReply });
  }

  const frontendContext = {
    pageTitle: body.pageTitle,
    path: body.activePage,
    filters: body.filters,
    lastUpdated: body.lastUpdated,
    ...body.frontendContext,
  };

  const dashboardContext = buildDashboardContext({
    filters: body.filters,
    activePage: body.activePage,
    pageTitle: body.pageTitle,
    lastUpdated: body.lastUpdated,
  });
  const aiPipelineReference = await readAiPipelineReference();
  const deterministicAnswer = getDeterministicAnswer(message, dashboardContext);
  const frontendContextAnswer = getFrontendContextAnswer(message, frontendContext);

  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          frontendContextAnswer ||
          deterministicAnswer ||
          "Gemini is not configured yet. Add GEMINI_API_KEY to frontend/Accelerate-main/.env.local and restart the dev server.",
      },
      { status: frontendContextAnswer || deterministicAnswer ? 200 : 503 },
    );
  }

  const prompt = buildPrompt({
    message,
    messages: body.messages ?? [],
    dashboardContext,
    aiPipelineReference,
    frontendContext,
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
            frontendContextAnswer ||
            deterministicAnswer ||
            "Gemini could not answer right now, but the dashboard context was prepared successfully.",
          error: details,
        },
        { status: frontendContextAnswer || deterministicAnswer ? 200 : 502 },
      );
    }

    const data = await response.json();
    const reply = extractGeminiText(data) || frontendContextAnswer || deterministicAnswer;

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
          frontendContextAnswer ||
          deterministicAnswer ||
          "Unable to reach Gemini right now. Please check your network and API key configuration.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: frontendContextAnswer || deterministicAnswer ? 200 : 502 },
    );
  }
}
