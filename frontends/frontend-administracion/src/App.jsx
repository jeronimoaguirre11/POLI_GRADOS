import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PanelAdministracion from "./pages/PanelAdministracion.jsx";

export default function App() {
  return (
    <ProtectedRoute rol="SUPERADMIN">
      {(usuario) => <PanelAdministracion usuario={usuario} />}
    </ProtectedRoute>
  );
}
