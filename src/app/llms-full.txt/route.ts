import { buildLlmsFullTxt } from "@/content/ai-answer-content";

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
