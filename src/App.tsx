import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Teams } from "./pages/Teams";
import { Tasks } from "./pages/Tasks";
import { Properties } from "./pages/Properties";
import { Settings } from "./pages/Settings";
import Index from "./pages/Index"; // Changed to default import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout><Outlet /></DashboardLayout>}>
          <Route index element={<Dashboard />} />
          <Route path="agents" element={<Index />} />
          <Route path="teams" element={<Teams />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="properties" element={<Properties />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;