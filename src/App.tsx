import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tasks } from "@/pages/Tasks";
import { WorkflowManagement } from "@/pages/WorkflowManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout><Outlet /></DashboardLayout>}>
          <Route index element={<Tasks />} />
          <Route path="/workflow" element={<WorkflowManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;