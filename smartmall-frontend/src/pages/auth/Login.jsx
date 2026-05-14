import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { getDashboardRoute, normalizeRole } from "../../utils/roleUtils";

function Login() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError("");

		try {
			const { data } = await authService.login({ email, password });
			const normalizedRole = normalizeRole(data.role || data.userRole || data.roleName);
			login(data.token, {
				id: data.userId,
				shopId: data.shopId,
				name: data.name,
				email: data.email,
				role: normalizedRole,
			});

			navigate(getDashboardRoute(normalizedRole), { replace: true });
		} catch (loginError) {
			setError(loginError?.response?.data?.message || "Invalid credentials");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="page-shell flex min-h-screen items-center justify-center px-4 py-10">
			<div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
				<motion.section
					initial={{ opacity: 0, x: -24 }}
					animate={{ opacity: 1, x: 0 }}
					className="glass-panel overflow-hidden rounded-[2rem] border border-white/10 p-8 lg:p-10"
				>
					<p className="text-xs uppercase tracking-[0.35em] text-teal-300/80">SmartMallX</p>
					<h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
						Mall operations, retail data, and customer experiences in one control plane.
					</h1>
					<p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
						Sign in to manage shops, products, parking, orders, and notifications from a single production-style dashboard.
					</p>

					<div className="mt-8 grid gap-4 sm:grid-cols-3">
						{[
							["Unified", "Sales, parking, and customer workflows"],
							["Secure", "JWT auth and protected routes"],
							["Responsive", "Designed for desktop and mobile"],
						].map(([title, copy]) => (
							<div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
								<h2 className="text-lg font-semibold text-white">{title}</h2>
								<p className="mt-2 text-sm text-slate-400">{copy}</p>
							</div>
						))}
					</div>
				</motion.section>

				<motion.form
					onSubmit={handleLogin}
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					className="glass-panel rounded-[2rem] border border-white/10 p-8 lg:p-10"
				>
					<p className="text-sm text-slate-400">Welcome back</p>
					<h2 className="mt-2 text-3xl font-semibold text-white">Login</h2>

					<label className="mt-6 grid gap-2 text-sm text-slate-300">
						<span>Email</span>
						<input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400/50"
							placeholder="admin@smartmallx.com"
						/>
					</label>

					<label className="mt-4 grid gap-2 text-sm text-slate-300">
						<span>Password</span>
						<input
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400/50"
							placeholder="Enter your password"
						/>
					</label>

					{error ? <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

					<button
						type="submit"
						disabled={loading}
						className="mt-6 w-full rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{loading ? "Signing in..." : "Login"}
					</button>

					<p className="mt-6 text-center text-sm text-slate-400">
						Don’t have an account? <Link to="/register" className="text-teal-300 hover:text-teal-200">Create one</Link>
					</p>
				</motion.form>
			</div>
		</div>
	);
}

export default Login;
