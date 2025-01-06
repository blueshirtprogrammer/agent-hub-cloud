import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Teams } from "./pages/Teams";
import { Tasks } from "./pages/Tasks";
import { Properties } from "./pages/Properties";
import { Settings } from "./pages/Settings";
import { Index } from "./pages/Index"; // Assuming you have an Index page for Agents

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
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
