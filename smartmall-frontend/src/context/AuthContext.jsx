import { createContext, useEffect, useMemo, useState } from "react";
import { normalizeRole } from "../utils/roleUtils";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		const stored = localStorage.getItem("user");
		if (!stored) {
			return null;
		}
		const parsed = JSON.parse(stored);
		return parsed ? { ...parsed, role: normalizeRole(parsed.role) } : null;
	});

	const [token, setToken] = useState(() => localStorage.getItem("token") || "");

	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		} else {
			localStorage.removeItem("token");
		}
	}, [token]);

	const value = useMemo(() => ({
		user,
		token,
		isAuthenticated: Boolean(token),
		login: (nextToken, nextUser) => {
			setToken(nextToken);
			setUser(nextUser ? { ...nextUser, role: normalizeRole(nextUser.role) } : null);
		},
		logout: () => {
			setToken("");
			setUser(null);
		},
		setUser,
	}), [token, user]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
