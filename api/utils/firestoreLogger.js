import { getFirestore } from './firestore.js';

export async function logLlmUsage({ modelUsed, taskType, prompt, response, latencyMs }) {
  const db = getFirestore();

  if (!db) {
    return;
  }

  const logEntry = {
    model_used: modelUsed,
    task_type: taskType || 'general',
    prompt,
    response,
    latency_ms: latencyMs,
    timestamp: new Date().toISOString(),
  };

  await db.collection('llm_logs').add(logEntry);
}
