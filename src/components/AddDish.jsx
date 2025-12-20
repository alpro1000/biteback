import { useState } from 'react';
import { generateDescription } from '../hooks/useGrok.js';
import { useFirestore } from '../hooks/useFirestore.js';

export default function AddDish() {
  const { addDish, circles } = useFirestore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [circleId, setCircleId] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleGenerate = async () => {
    if (!title) {
      setStatus('Введите название блюда, чтобы Grok подсказал описание.');
      return;
    }
    setLoading(true);
    setStatus('Генерируем описание через Grok...');
    const text = await generateDescription(title);
    setDescription(text);
    setLoading(false);
    setStatus('Описание готово 🎉');
  };

  const handleSave = async () => {
    if (!title) {
      setStatus('Название — обязательное поле.');
      return;
    }
    try {
      await addDish({ title, description, circleId });
      setStatus('Блюдо сохранено в Firestore!');
      setTitle('');
      setDescription('');
      setCircleId('');
    } catch (error) {
      setStatus(`Не удалось сохранить блюдо: ${error.message}`);
    }
  };

  return (
    <section className="glow-card rounded-2xl bg-white/90 p-6 border-l-4 border-olive">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="section-kicker">Добавление</p>
          <h2 className="section-title">Добавить блюдо</h2>
        </div>
        <span className="badge-soft bg-cherry/10 text-cherry">Grok LLM</span>
      </div>

      <div className="mt-4 space-y-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Название блюда"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Описание блюда"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <div className="flex flex-wrap gap-3">
          <button
            className={`btn btn-primary ${loading ? 'loading' : ''}`}
            onClick={handleGenerate}
            type="button"
          >
            Автогенерация через Grok
          </button>
          <button className="btn btn-outline btn-secondary" onClick={handleSave} type="button">
            Сохранить в Circle
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-wood">Привязать к Circle</label>
          <select
            className="select select-bordered w-full"
            value={circleId}
            onChange={(e) => setCircleId(e.target.value)}
          >
            <option value="">— Без круга (глобальный слой)</option>
            {circles.map((circle) => (
              <option key={circle.id} value={circle.id}>
                {circle.name}
              </option>
            ))}
          </select>
        </div>

        {status && <p className="text-sm text-wood/70">{status}</p>}
        <p className="text-xs text-wood/60 italic">✨ Описание сгенерировано с помощью Grok (xAI)</p>
      </div>
    </section>
  );
}
