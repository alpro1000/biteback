import { getFieldValue, getFirestore } from '../utils/firestore.js';

export default async function handler(req, res) {
  if (req.method && req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const db = getFirestore();
  const FieldValue = getFieldValue();

  if (!db) {
    res.status(500).json({ error: 'Firestore is not configured' });
    return;
  }

  const { circleA, circleB, type = 'exchange' } = req.body || {};

  if (!circleA || !circleB) {
    res.status(400).json({ error: 'Both circles are required to create a bridge' });
    return;
  }

  const payload = {
    circles: [circleA, circleB],
    type,
    active: true,
    created_at: new Date().toISOString(),
  };

  const docRef = await db.collection('bridges').add(payload);
  const bridgeId = docRef.id;

  const batch = db.batch();
  const circleARef = db.collection('circles').doc(circleA);
  const circleBRef = db.collection('circles').doc(circleB);

  batch.set(circleARef, { bridges: FieldValue.arrayUnion(bridgeId) }, { merge: true });
  batch.set(circleBRef, { bridges: FieldValue.arrayUnion(bridgeId) }, { merge: true });

  await batch.commit();

  res.status(200).json({ bridge_id: bridgeId, ...payload });
}
