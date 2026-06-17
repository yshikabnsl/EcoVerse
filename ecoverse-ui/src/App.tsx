import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import WasteClassifier from "./pages/WasteClassifier";
import PickupSchedule from "./pages/PickupSchedule";
import Rewards from "./pages/Rewards";
import RouteOptimization from "./pages/RouteOptimization";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedApp() {
  const { loading, user } = useAuth();
  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Layout />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedApp />}>
          <Route index element={<Dashboard />} />
          <Route path="classify" element={<WasteClassifier />} />
          <Route path="pickup" element={<PickupSchedule />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="routes" element={<RouteOptimization />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
