import { useEffect, useState } from 'react';
import { createBridge, fetchCircles } from './CircleAPI.js';

export default function BridgeView() {
  const [circles, setCircles] = useState([]);
  const [fromCircle, setFromCircle] = useState('');
  const [toCircle, setToCircle] = useState('');
  const [type, setType] = useState('exchange');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchCircles().then(setCircles).catch(() => setStatus('Не удалось загрузить круги'));
  }, []);

  async function handleBridge() {
    setStatus(null);
    if (!fromCircle || !toCircle) {
      setStatus('Выберите оба круга');
      return;
    }

    try {
      const bridge = await createBridge({ circleA: fromCircle, circleB: toCircle, type });
      setStatus(`Мост создан: ${bridge.bridge_id}`);
    } catch (err) {
      setStatus(`Ошибка: ${err.message}`);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-md space-y-3">
      <div>
        <h3 className="text-xl font-semibold">Мосты между Circles</h3>
        <p className="text-sm text-gray-500">Bridges объединяют приватные кластеры в общий слой.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-gray-700">
          Из круга
          <select
            className="mt-1 w-full rounded-md border p-2"
            value={fromCircle}
            onChange={(e) => setFromCircle(e.target.value)}
          >
            <option value="">Выберите...</option>
            {circles.map((circle) => (
              <option key={circle.id} value={circle.id}>
                {circle.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-gray-700">
          В круг
          <select
            className="mt-1 w-full rounded-md border p-2"
            value={toCircle}
            onChange={(e) => setToCircle(e.target.value)}
          >
            <option value="">Выберите...</option>
            {circles.map((circle) => (
              <option key={circle.id} value={circle.id}>
                {circle.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="text-sm font-medium text-gray-700">
        Тип моста
        <select className="mt-1 w-full rounded-md border p-2" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="exchange">Обмен блюдами</option>
          <option value="challenge">Кулинарный челлендж</option>
          <option value="friendship">Дружба</option>
        </select>
      </label>
      <button
        type="button"
        onClick={handleBridge}
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Создать мост
      </button>
      {status && <p className="text-sm text-gray-700">{status}</p>}
    </div>
  );
}
