import AddDish from './components/AddDish.jsx';
import BridgeView from './modules/circles/BridgeView.jsx';
import CirclesList from './modules/circles/CirclesList.jsx';
import CreateCircle from './modules/circles/CreateCircle.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-rose-600">BiteBack</p>
            <h1 className="text-2xl font-semibold">Family Food Barter</h1>
            <p className="text-sm text-gray-600">Обмен вкусами без денег: круги, мосты и LLM-подсказки.</p>
          </div>
          <span className="rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700">MVP Preview</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">
        <section className="grid gap-6 lg:grid-cols-2">
          <AddDish />
          <CreateCircle />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <CirclesList />
          <BridgeView />
        </section>
      </main>
    </div>
  );
}
