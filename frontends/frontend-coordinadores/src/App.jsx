import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardCoordinador from "./pages/DashboardCoordinador.jsx";

export default function App() {
  return (
    <ProtectedRoute rol="COORDINADOR">
      {(usuario) => <DashboardCoordinador usuario={usuario} />}
    </ProtectedRoute>
  );
}
