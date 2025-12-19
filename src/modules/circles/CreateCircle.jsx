import { useState } from 'react';
import useLLM from '../../hooks/useLLM.js';
import { createCircle } from './CircleAPI.js';

export default function CreateCircle() {
  const { generate, loading, source } = useLLM();
  const [name, setName] = useState('Круг соседей');
  const [values, setValues] = useState('доброта, пироги, походы');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(null);

  async function handleGenerate() {
    const generated = await generate('circle_description', {
      name,
      values: values.split(',').map((v) => v.trim()).filter(Boolean),
    });
    setDescription(generated);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    try {
      await createCircle({
        name,
        description,
        values: values.split(',').map((v) => v.trim()).filter(Boolean),
        members: [],
        bridges: [],
      });
      setStatus('Круг создан и сохранён в Firestore.');
    } catch (err) {
      setStatus(`Ошибка: ${err.message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-white p-6 shadow-md">
      <div>
        <h3 className="text-xl font-semibold">Создать Circle</h3>
        <p className="text-sm text-gray-500">Глобальный слой → свой круг → мосты к друзьям.</p>
      </div>

      <label className="block text-sm font-medium text-gray-700">
        Название
        <input
          type="text"
          className="mt-1 w-full rounded-md border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="block text-sm font-medium text-gray-700">
        Ценности (через запятую)
        <input
          type="text"
          className="mt-1 w-full rounded-md border p-2"
          value={values}
          onChange={(e) => setValues(e.target.value)}
        />
      </label>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Описание круга</label>
        <textarea
          className="w-full rounded-md border p-3"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Сгенерируйте или напишите описание"
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-md bg-rose-600 px-4 py-2 text-white hover:bg-rose-700"
        >
          {loading ? 'Генерация...' : 'Сгенерировать через LLM'}
        </button>
        {source && <p className="text-xs text-gray-500">Источник: {source}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        disabled={loading}
      >
        Сохранить Circle
      </button>

      {status && <p className="text-sm text-gray-700">{status}</p>}
    </form>
  );
}
