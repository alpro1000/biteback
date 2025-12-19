import { useMemo } from 'react';
import { useFirestore } from '../hooks/useFirestore.js';

export default function BridgePanel() {
  const { circles, bridges } = useFirestore();

  const bridgeHints = useMemo(() => {
    if (!circles.length) return 'Создайте хотя бы два круга, чтобы построить мост обмена.';
    if (circles.length === 1) return 'Добавьте ещё один Circle для обмена блюдами.';
    return 'Соединяйте города вкусов: выберите два круга и настройте правила доброго обмена!';
  }, [circles]);

  return (
    <section className="glow-card rounded-2xl bg-white/90 p-6 border-l-4 border-wood">
      <p className="section-kicker">Bridges</p>
      <h2 className="section-title">Мосты между Circles</h2>
      <p className="mt-2 text-sm text-wood/70">{bridgeHints}</p>

      <div className="mt-4 space-y-3">
        {bridges.length === 0 && (
          <div className="alert bg-cream border border-dashed border-olive/50">
            <div>
              <h4 className="font-semibold text-wood">Пока нет мостов</h4>
              <p className="text-sm text-wood/70">Используйте Firestore, чтобы хранить и делиться правилами обмена.</p>
            </div>
          </div>
        )}

        {bridges.map((bridge) => (
          <div key={bridge.id} className="rounded-xl border border-olive/30 bg-olive/5 p-4">
            <p className="text-sm font-semibold text-olive">
              {bridge.from} → {bridge.to}
            </p>
            <p className="text-wood/70 text-sm">{bridge.rule || 'Свободный обмен добрыми делами и блюдами'}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
