import { useState } from 'react';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function useGrok() {
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState(null);
  const [error, setError] = useState(null);

  async function generateDescription(text) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/grok`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Не удалось связаться с Grok API');
      }

      const data = await response.json();
      setSource('grok');
      return data.text;
    } catch (err) {
      setError(err.message);
      return 'Ошибка генерации';
    } finally {
      setLoading(false);
    }
  }

  return { generateDescription, loading, source, error };
}

export default useGrok;
