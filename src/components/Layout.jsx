export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-cream text-wood" data-theme="biteback">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(196,30,58,0.08),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(107,142,35,0.08),transparent_25%)]" />
      {children}
    </div>
  );
}
