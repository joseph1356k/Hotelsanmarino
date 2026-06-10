import { buildAiAnswersJson } from "@/content/ai-answer-content";

export function GET() {
  return Response.json(buildAiAnswersJson(), {
    headers: {
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
