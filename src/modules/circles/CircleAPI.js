const headers = { 'Content-Type': 'application/json' };

export async function createCircle(payload) {
  const res = await fetch('/api/circles/createCircle', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Не удалось создать круг');
  }

  return res.json();
}

export async function fetchCircles() {
  const res = await fetch('/api/circles/getCircles');

  if (!res.ok) {
    throw new Error('Не удалось загрузить круги');
  }

  const data = await res.json();
  return data.circles || [];
}

export async function createBridge(payload) {
  const res = await fetch('/api/circles/createBridge', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Не удалось создать мост между кругами');
  }

  return res.json();
}
