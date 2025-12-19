import { useEffect, useState } from 'react';
import { fetchCircles } from './CircleAPI.js';

export default function CirclesList() {
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCircles();
        setCircles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-xl font-semibold">Семейные круги</h3>
        <p className="text-sm text-gray-500">Глобальный слой BiteBack + приватные Circles.</p>
      </div>
      {loading && <p className="text-gray-500">Загружаем список...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        {circles.map((circle) => (
          <div key={circle.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <h4 className="text-lg font-semibold">{circle.name}</h4>
            <p className="text-sm text-gray-600">{circle.description || 'Описание пока не добавлено'}</p>
            <p className="mt-2 text-xs text-gray-500">Участников: {circle.members?.length || 0}</p>
            <p className="text-xs text-gray-500">Мостов: {circle.bridges?.length || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
