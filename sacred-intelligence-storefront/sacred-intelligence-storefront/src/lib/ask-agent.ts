/**
 * LaunchLemonade Agent Client
 * Query the SI knowledge base agent instead of loading full file context.
 * Saves tokens for architecture/design/spec questions.
 */

const AGENT_URL = "https://sip.launchlemonade.app/api/1.1/wf/run_assistant";
const ASSISTANT_ID = "1773794058613x210191474170527740";

interface AgentResponse {
  Conversation_ID: string;
  Error: string;
  Error_Reason: string;
  Response: string;
}

export async function askAgent(
  question: string,
  conversationId?: string
): Promise<AgentResponse> {
  const apiKey = process.env.LAUNCHLEMONADE_API_KEY;
  if (!apiKey) {
    throw new Error("LAUNCHLEMONADE_API_KEY not set in environment");
  }

  const res = await fetch(AGENT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistant_id: ASSISTANT_ID,
      conversation_id: conversationId ?? "",
      input: question,
    }),
  });

  if (!res.ok) {
    throw new Error(`Agent API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<AgentResponse>;
}
