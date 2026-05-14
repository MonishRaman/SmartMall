import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { getDashboardRoute, normalizeRole } from "../../utils/roleUtils";

function Register() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		role: "CUSTOMER",
		shopName: "",
		category: "GENERAL",
		floorNumber: "",
		monthlyRent: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const isShopOwner = normalizeRole(form.role) === "SHOP_OWNER";

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError("");

		try {
			const registrationPayload = {
				...form,
				role: normalizeRole(form.role),
			};
			const { data } = await authService.register(registrationPayload);
			const normalizedRole = normalizeRole(data.role || registrationPayload.role);
			login(data.token, {
				id: data.userId,
				shopId: data.shopId,
				name: data.name,
				email: data.email,
				role: normalizedRole,
			});
			navigate(getDashboardRoute(normalizedRole), { replace: true });
		} catch (registerError) {
			setError(registerError?.response?.data?.message || "Unable to create account");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="page-shell flex min-h-screen items-center justify-center px-4 py-10">
			<motion.form
				onSubmit={handleSubmit}
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				className="glass-panel w-full max-w-xl rounded-[2rem] border border-white/10 p-8 lg:p-10"
			>
				<p className="text-sm text-slate-400">Join SmartMallX</p>
				<h1 className="mt-2 text-3xl font-semibold text-white">Create account</h1>

				{[
					["name", "Full name", "text"],
					["email", "Email", "email"],
					["password", "Password", "password"],
				].map(([key, label, type]) => (
					<label key={key} className="mt-4 grid gap-2 text-sm text-slate-300">
						<span>{label}</span>
						<input
							type={type}
							value={form[key]}
							onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
							className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400/50"
							placeholder={label}
						/>
					</label>
				))}

				<label className="mt-4 grid gap-2 text-sm text-slate-300">
					<span>Role</span>
					<select
						value={form.role}
						onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
						className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-teal-400/50"
					>
						<option value="CUSTOMER">CUSTOMER</option>
						<option value="SHOP_OWNER">SHOP_OWNER / Shop Keeper</option>
						{/* <option value="ADMIN">ADMIN</option> */}
					</select>
				</label>

				{isShopOwner ? (
					<div className="mt-4 grid gap-4 md:grid-cols-2">
						{[
							["shopName", "Shop name"],
							["category", "Category"],
							["floorNumber", "Floor number"],
							["monthlyRent", "Monthly rent"],
						].map(([key, label]) => (
							<label key={key} className="grid gap-2 text-sm text-slate-300">
								<span>{label}</span>
								<input
									type={key === "monthlyRent" || key === "floorNumber" ? "number" : "text"}
									value={form[key]}
									onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
									className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400/50"
									placeholder={label}
								/>
							</label>
						))}
					</div>
				) : null}

				{error ? <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

				<button
					type="submit"
					disabled={loading}
					className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{loading ? "Creating account..." : "Register"}
				</button>

				<p className="mt-6 text-center text-sm text-slate-400">
					Already have an account? <Link to="/" className="text-teal-300 hover:text-teal-200">Back to login</Link>
				</p>
			</motion.form>
		</div>
	);
}

export default Register;
