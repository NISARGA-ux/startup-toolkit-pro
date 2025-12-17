import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";


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
