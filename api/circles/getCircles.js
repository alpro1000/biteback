import { getFirestore } from '../utils/firestore.js';

export default async function handler(_req, res) {
  const db = getFirestore();

  if (!db) {
    res.status(500).json({ error: 'Firestore is not configured' });
    return;
  }

  const snapshot = await db.collection('circles').get();
  const circles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  res.status(200).json({ circles });
}
