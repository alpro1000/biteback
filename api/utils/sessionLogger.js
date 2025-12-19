import { getFirestore } from './firestore.js';

export async function logDevSession(coderName, summary, changedFiles = [], nextTasks = []) {
  const db = getFirestore();

  if (!db) {
    return;
  }

  const sessionEntry = {
    date: new Date().toISOString(),
    coder_name: coderName,
    summary,
    changed_files: changedFiles,
    next_tasks: nextTasks,
  };

  await db.collection('sessions').add(sessionEntry);
}
