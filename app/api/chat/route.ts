import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system:
      "당신은 초중학교 학생들에게 수학을 가르치는 친절하고 다정한 AI 수학 선생님입니다. " +
      "학생이 수학 질문을 하면, 단답형으로 정답만 알려주지 말고 학생이 스스로 원리를 이해할 수 있도록 풀이 과정과 힌트를 제공하세요. " +
      "친절하고 따뜻한 어조(해요체/하십시오체)를 사용하며, 적절한 이모티콘을 섞어서 지루하지 않게 답변해주세요.",
  });

  return result.toTextStreamResponse();
}
