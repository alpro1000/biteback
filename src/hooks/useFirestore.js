import { useCallback, useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase.js';

export function useFirestore() {
  const [circles, setCircles] = useState([]);
  const [bridges, setBridges] = useState([]);

  const loadCircles = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'circles'));
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCircles(docs);
    } catch (error) {
      console.warn('Не удалось получить circles', error);
      setCircles([]);
    }
  }, []);

  const loadBridges = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'bridges'));
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBridges(docs);
    } catch (error) {
      console.warn('Не удалось получить bridges', error);
      setBridges([]);
    }
  }, []);

  useEffect(() => {
    loadCircles();
    loadBridges();
  }, [loadCircles, loadBridges]);

  const addCircle = useCallback(async ({ name, story }) => {
    const docRef = await addDoc(collection(db, 'circles'), {
      name,
      story,
      createdAt: new Date().toISOString(),
    });
    await loadCircles();
    return docRef.id;
  }, [loadCircles]);

  const addDish = useCallback(async ({ title, description, circleId }) => {
    const docRef = await addDoc(collection(db, 'dishes'), {
      title,
      description,
      circleId: circleId || null,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  }, []);

  return {
    circles,
    bridges,
    addCircle,
    addDish,
    refreshCircles: loadCircles,
    refreshBridges: loadBridges,
  };
}

export default useFirestore;
