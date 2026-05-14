import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { normalizeRole } from "../../utils/roleUtils";

function ProtectedRoute({ children, roles }) {
	const { isAuthenticated, user } = useAuth();
	const location = useLocation();
	const normalizedUserRole = normalizeRole(user?.role);
	const normalizedRoles = (roles || []).map((role) => normalizeRole(role));

	if (!isAuthenticated) {
		return <Navigate to="/" replace state={{ from: location }} />;
	}

	if (normalizedRoles.length && normalizedUserRole && !normalizedRoles.includes(normalizedUserRole)) {
		return <Navigate to="/not-found" replace />;
	}

	return children;
}

export default ProtectedRoute;
