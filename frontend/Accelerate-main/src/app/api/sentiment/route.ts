import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a healthcare NLP engine. Analyze the patient review. 
Respond ONLY in this exact JSON (no backticks, no markdown):
{"sentiment":"Positive|Neutral|Negative","score":0-100,"category":"Waiting Time|Staff Behaviour|Billing|Cleanliness|Facilities|General","recommendation":"one short actionable sentence"}`;

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: "Review text required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(fallbackAnalysis(text));
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\nReview: ${text}` }] },
          ],
          generationConfig: { temperature: 0.2, maxOutputTokens: 256 },
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json(fallbackAnalysis(text));
    }

    const data = await res.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return NextResponse.json(parsed);
    }
    return NextResponse.json(fallbackAnalysis(text));
  } catch {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}

function fallbackAnalysis(text: string) {
  const lower = text.toLowerCase();
  let sentiment: "Positive" | "Neutral" | "Negative" = "Neutral";
  let score = 50;
  let category = "General";

  if (/excellent|amazing|kind|great|good|fast/.test(lower)) {
    sentiment = "Positive";
    score = 78;
  }
  if (/horrible|rude|confusing|bad|dirty|slow/.test(lower)) {
    sentiment = "Negative";
    score = 28;
  }
  if (/wait|waiting/.test(lower)) {
    category = "Waiting Time";
    score = Math.min(score, 40);
    sentiment = "Negative";
  }
  if (/bill|billing/.test(lower)) category = "Billing";
  if (/staff|nurse|doctor/.test(lower) && /rude/.test(lower)) category = "Staff Behaviour";
  if (/clean/.test(lower)) category = "Cleanliness";

  return {
    sentiment,
    score,
    category,
    recommendation:
      sentiment === "Negative"
        ? "Address the primary complaint within 24 hours and follow up with the patient."
        : "Continue current service standards and request a formal testimonial.",
  };
}
