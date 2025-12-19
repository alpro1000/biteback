import { useState } from 'react';
import { generateCircleStory } from '../hooks/useGrok.js';
import { useFirestore } from '../hooks/useFirestore.js';

export default function CreateCircle() {
  const { addCircle } = useFirestore();
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!name) {
      setStatus('Сначала введите название круга.');
      return;
    }
    setLoading(true);
    setStatus('Генерируем описание через Grok...');
    const text = await generateCircleStory(name);
    setStory(text);
    setStatus('Описание готово ✨');
    setLoading(false);
  };

  const handleSave = async () => {
    if (!name) {
      setStatus('Название круга обязательно.');
      return;
    }
    try {
      await addCircle({ name, story });
      setStatus('Circle сохранён!');
      setName('');
      setStory('');
    } catch (error) {
      setStatus(`Не удалось сохранить: ${error.message}`);
    }
  };

  return (
    <section className="glow-card rounded-2xl bg-white/90 p-6 border-l-4 border-cherry">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="section-kicker">Сообщество</p>
          <h2 className="section-title">Создать Circle</h2>
        </div>
        <span className="badge-soft bg-olive/10 text-olive">Family</span>
      </div>

      <div className="mt-4 space-y-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder={'Название круга (например, "Бабушкины рецепты")'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="История или фокус круга"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={5}
        />

        <div className="flex flex-wrap gap-3">
          <button className={`btn btn-primary ${loading ? 'loading' : ''}`} onClick={handleGenerate} type="button">
            Сгенерировать историю
          </button>
          <button className="btn btn-outline btn-secondary" onClick={handleSave} type="button">
            Сохранить Circle
          </button>
        </div>

        {status && <p className="text-sm text-wood/70">{status}</p>}
        <p className="text-xs text-wood/60">LLM подскажет тёплое описание для вашего сообщества.</p>
      </div>
    </section>
  );
}
