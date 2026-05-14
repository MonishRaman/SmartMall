import { useEffect, useState } from "react";
import employeeService from "../../services/employeeService";

function Employees() {
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [form, setForm] = useState({ name: "", role: "Sales Associate", email: "", phone: "" });

	const loadEmployees = async () => {
		setLoading(true);
		setError("");

		try {
			const { data } = await employeeService.list();
			setEmployees(data || []);
		} catch (loadError) {
			setError(loadError?.response?.data?.message || "Unable to load employee records");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadEmployees();
	}, []);

	const handleCreate = async () => {
		if (!form.name.trim() || !form.role.trim()) {
			setError("Please provide a name and role for the employee.");
			return;
		}

		setSaving(true);
		setError("");

		try {
			const { data } = await employeeService.create({
				name: form.name.trim(),
				role: form.role.trim(),
				email: form.email.trim(),
				phone: form.phone.trim(),
			});
			setEmployees((current) => [data, ...current]);
			setForm({ name: "", role: "Sales Associate", email: "", phone: "" });
		} catch (submitError) {
			setError(submitError?.response?.data?.message || "Unable to save employee");
		} finally {
			setSaving(false);
		}
	};

	return (
		<section className="space-y-6">
			<div>
				<p className="text-sm text-slate-400">Shop Owner</p>
				<h1 className="text-3xl font-semibold text-white">Employees</h1>
				<p className="mt-2 max-w-3xl text-sm text-slate-300">Employee records are now stored in the backend and can be managed from the shop owner portal.</p>
			</div>

			{error ? <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

			<div className="glass-panel rounded-3xl border border-white/10 p-5">
				<div className="grid gap-4 lg:grid-cols-4">
					<input
						type="text"
						value={form.name}
						onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
						placeholder="Employee name"
						className="rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
					/>
					<input
						type="text"
						value={form.role}
						onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
						placeholder="Role"
						className="rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
					/>
					<input
						type="email"
						value={form.email}
						onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
						placeholder="Email"
						className="rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
					/>
					<input
						type="text"
						value={form.phone}
						onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
						placeholder="Phone"
						className="rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
					/>
				</div>
				<button
					type="button"
					onClick={handleCreate}
					disabled={saving}
					className="mt-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-slate-950 disabled:opacity-50"
				>
					{saving ? "Adding" : "Add employee"}
				</button>
			</div>

			{loading ? (
				<p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">Loading employee roster...</p>
			) : null}

			<div className="grid gap-4 md:grid-cols-2">
				{employees.map((employee) => (
					<article key={employee.id} className="glass-panel rounded-3xl border border-white/10 p-5">
						<h3 className="text-xl font-semibold text-white">{employee.name}</h3>
						<p className="mt-2 text-sm text-slate-400">{employee.role}</p>
						{employee.email ? <p className="mt-2 text-sm text-slate-400">{employee.email}</p> : null}
						{employee.phone ? <p className="mt-1 text-sm text-slate-400">{employee.phone}</p> : null}
					</article>
				))}
			</div>
		</section>
	);
}

export default Employees;
