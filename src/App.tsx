import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

import Card from "./components/Card";

export default function App() {
  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <main className="ml-64 flex-1 p-6">
        {/* DASHBOARD START */}
        <h2 className="text-3xl font-bold mb-6">
          Good evening, Founder 👋
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card title="🔥 Burn Rate" value="$4,200 / month" />
          <Card title="⏳ Runway" value="8 months" />
          <Card title="📈 Equity Left" value="62%" />
          <Card title="🎯 Stage" value="MVP" />
        </div>
        {/* DASHBOARD END */}
      </main>
    </div>
  );
}


export default function App() {
return (
<div className="flex bg-slate-950 text-white min-h-screen">
<Sidebar />
<main className="ml-64 flex-1 p-6">
<Dashboard />
</main>
</div>
);
}
