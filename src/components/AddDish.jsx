import { useEffect, useState } from 'react';
import useLLM from '../hooks/useLLM.js';

export default function AddDish() {
  const { generate, loading, source } = useLLM();
  const [photoPrompt, setPhotoPrompt] = useState('домашняя шарлотка с корицей');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Автогенерация описания при загрузке страницы
    handleAutoDescription(photoPrompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAutoDescription(promptText) {
    const idea = await generate('rewrite_description', `Опиши блюдо: ${promptText}`);
    setDescription(idea);
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Добавить блюдо</h2>
      <label className="block text-sm font-medium text-gray-700">Описание блюда</label>
      <textarea
        className="mt-1 w-full rounded-md border p-3"
        rows={4}
        value={photoPrompt}
        onChange={(e) => setPhotoPrompt(e.target.value)}
        placeholder="Введите описание фото"
      />

      <button
        className="mt-3 inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-white hover:bg-rose-700"
        onClick={() => handleAutoDescription(photoPrompt)}
        disabled={loading}
      >
        {loading ? 'Генерируем...' : 'Автогенерация из Grok'}
      </button>

      <label className="block text-sm font-medium text-gray-700 mt-6">Сгенерированное описание</label>
      <textarea
        className="mt-1 w-full rounded-md border p-3"
        rows={6}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Здесь появится описание от LLM"
      />

      <p className="text-xs text-gray-500 italic mt-2">
        ✨ Описание сгенерировано с помощью Grok (xAI)
      </p>
      {source && (
        <p className="text-xs text-gray-400 mt-1">Источник: {source}</p>
      )}
    </div>
  );
}
