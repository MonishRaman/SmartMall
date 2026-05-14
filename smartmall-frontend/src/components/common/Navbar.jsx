import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

function Navbar({ title = "SmartMallX" }) {
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const { theme, toggleTheme } = useTheme();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
			<div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
				<div>
					<p className="text-xs uppercase tracking-[0.35em] text-teal-300/80">SmartMallX</p>
					<h1 className="text-xl font-semibold text-white sm:text-2xl">{title}</h1>
				</div>

				<div className="flex items-center gap-3">
					<div className="hidden text-right sm:block">
						<p className="text-sm text-slate-300">Welcome back</p>
						<p className="text-sm font-medium text-white">{user?.name || user?.email || "Guest"}</p>
					</div>

					<button
						type="button"
						onClick={toggleTheme}
						className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-teal-400/40 hover:bg-teal-400/10"
						aria-label="Toggle theme"
					>
						{theme === "midnight" ? <FiSun /> : <FiMoon />}
					</button>

					<button
						type="button"
						onClick={handleLogout}
						className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:border-red-400/40 hover:bg-red-500/10"
					>
						<FiLogOut />
						Logout
					</button>
				</div>
			</div>
		</header>
	);
}

export default Navbar;
