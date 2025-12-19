import { getFirestore } from '../utils/firestore.js';

export default async function handler(req, res) {
  if (req.method && req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const db = getFirestore();

  if (!db) {
    res.status(500).json({ error: 'Firestore is not configured' });
    return;
  }

  const {
    name,
    owner_id: ownerId,
    members = [],
    visibility = 'private',
    description = '',
    bridges = [],
    values = [],
  } = req.body || {};

  if (!name) {
    res.status(400).json({ error: 'Circle name is required' });
    return;
  }

  const payload = {
    name,
    owner_id: ownerId || null,
    members,
    visibility,
    description,
    bridges,
    values,
    created_at: new Date().toISOString(),
  };

  const docRef = await db.collection('circles').add(payload);

  res.status(200).json({ circle_id: docRef.id, ...payload });
}
