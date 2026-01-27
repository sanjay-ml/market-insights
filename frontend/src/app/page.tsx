import PortfolioSection from "@/components/PortfolioSection";
import InsightCards from "@/components/InsightCards";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-8 space-y-8">
      <header>
        <h1 className="text-4xl font-bold">Market Insights Dashboard</h1>
        <p className="text-zinc-400 mt-2">
          Equal-weighted portfolio performance and insights
        </p>
      </header>

      <InsightCards />
      <PortfolioSection />
    </main>
  );
}
