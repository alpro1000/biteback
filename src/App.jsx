import AddDish from './components/AddDish.jsx';
import BridgePanel from './components/BridgePanel.jsx';
import CreateCircle from './components/CreateCircle.jsx';
import Layout from './components/Layout.jsx';

export default function App() {
  return (
    <Layout>
      <header className="bg-cherry text-white shadow-md">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="section-kicker text-white/80">BiteBack</p>
            <h1 className="text-3xl font-display">🍲 Family Food Barter</h1>
            <p className="text-sm text-white/80">Обмен вкусами без денег: семейные круги, мосты и LLM-подсказки.</p>
          </div>
          <span className="badge-soft bg-white/10 text-white">MVP Preview</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">
        <section className="grid gap-6 lg:grid-cols-2">
          <AddDish />
          <CreateCircle />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <BridgePanel />
          <div className="glow-card rounded-2xl bg-white/90 p-6">
            <h3 className="section-title">Готовность к Render</h3>
            <p className="mt-2 text-sm text-wood/70">
              Настройки Vite и API работают через переменные среды. После деплоя убедитесь, что указаны{' '}
              <span className="font-semibold">VITE_API_URL</span> и ключ <span className="font-semibold">GROK_API_KEY</span>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge-soft bg-cherry/10 text-cherry">Vite + React</span>
              <span className="badge-soft bg-olive/10 text-olive">Tailwind + DaisyUI</span>
              <span className="badge-soft bg-wood/10 text-wood">Firebase Ready</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-6 text-sm text-wood/70">
        Made with ❤️ by the BiteBack Family
      </footer>
    </Layout>
  );
}
