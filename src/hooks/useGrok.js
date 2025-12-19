export async function generateDescription(text) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/grok`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  return data.text || 'Ошибка генерации 😔';
}

export async function generateCircleStory(name) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/grok`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: `Создай тёплое описание семейного круга "${name}"` }),
  });
  const data = await res.json();
  return data.text || 'Ошибка генерации 😔';
}
