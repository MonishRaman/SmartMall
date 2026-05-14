import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "midnight");

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	const value = useMemo(() => ({
		theme,
		setTheme,
		toggleTheme: () => setTheme((current) => (current === "midnight" ? "dawn" : "midnight")),
	}), [theme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}

export default ThemeContext;
