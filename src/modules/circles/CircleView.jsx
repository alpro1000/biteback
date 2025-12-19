export default function CircleView({ circle }) {
  if (!circle) {
    return <p className="text-gray-500">Круг не выбран</p>;
  }

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold">{circle.name}</h4>
          <p className="text-xs uppercase tracking-wide text-gray-500">{circle.visibility || 'private'}</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
          {circle.members?.length || 0} участников
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{circle.description || 'Описание пока не добавлено'}</p>
      <div className="mt-3 space-y-1 text-xs text-gray-500">
        <p>Владелец: {circle.owner_id || '—'}</p>
        <p>Мосты: {circle.bridges?.length || 0}</p>
      </div>
    </div>
  );
}
