// ===============================================
// app/page.tsx
// ===============================================
import Header from '@/components/Header';
import BreachTimelineExplorer from '@/components/BreachTimelineExplorer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="py-8">
        <h1 className="font-heading mb-6 text-2xl font-semibold text-brx-navy">
          Breach Notification Timeline Explorer
        </h1>
        <p className="mb-8 text-sm text-brx-text-body">
          Simple frontend only concept demo inspired by BreachRx’s Cyber RegScout. <span className="font-medium text-brx-text-heading"> Not legal advice</span>
        </p>
        <BreachTimelineExplorer />
      </main>
    </>
  );
}