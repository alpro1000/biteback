import admin from 'firebase-admin';

let cachedDb = null;

function getFirestore() {
  if (cachedDb) {
    return cachedDb;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  const app = admin.apps.length
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });

  cachedDb = admin.firestore(app);
  return cachedDb;
}

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
