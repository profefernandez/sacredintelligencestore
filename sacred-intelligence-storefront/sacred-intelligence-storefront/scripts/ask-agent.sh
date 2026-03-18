#!/bin/bash
# Ask the LaunchLemonade agent a question about the codebase
# Usage: ./scripts/ask-agent.sh "What access control levels did we define?"
# Usage with conversation: ./scripts/ask-agent.sh "Follow up question" <conversation_id>

set -e

# Load env
ENV_FILE="$(dirname "$0")/../.env.local"
if [ -f "$ENV_FILE" ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

if [ -z "$LAUNCHLEMONADE_API_KEY" ]; then
  echo "Error: LAUNCHLEMONADE_API_KEY not set in .env.local"
  exit 1
fi

QUESTION="${1:?Usage: ask-agent.sh \"your question\" [conversation_id]}"
CONVERSATION_ID="${2:-}"
ASSISTANT_ID="1773794058613x210191474170527740"

RESPONSE=$(curl -s -X POST https://sip.launchlemonade.app/api/1.1/wf/run_assistant \
  -H "Authorization: Bearer $LAUNCHLEMONADE_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"assistant_id\": \"$ASSISTANT_ID\",
    \"conversation_id\": \"$CONVERSATION_ID\",
    \"input\": \"$QUESTION\"
  }")

echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
