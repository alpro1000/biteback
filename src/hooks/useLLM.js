import { useState } from 'react';

export function useLLM() {
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  async function generate(taskType, prompt) {
    setLoading(true);
    setSource(null);

    try {
      const res = await fetch(`${API_URL}/api/llm-router`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskType, prompt }),
      });

      const data = await res.json();
      setSource(data?.source || 'unknown');
      return data.result || 'Не удалось получить ответ 😅';
    } catch (error) {
      return 'Произошла ошибка при генерации.';
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading, source };
}

export default useLLM;
