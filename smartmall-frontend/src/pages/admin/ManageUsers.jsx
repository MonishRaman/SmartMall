import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { compactNumber } from "../../utils/dashboardData";

const roleOptions = ["CUSTOMER", "SHOP_OWNER", "ADMIN"];

function ManageUsers() {
	const [users, setUsers] = useState([]);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState({
		name: "",
		email: "",
		role: "CUSTOMER",
		password: "",
	});
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const loadUsers = async () => {
		setLoading(true);
		setError("");

		try {
			const { data } = await userService.list();
			setUsers(data || []);
		} catch (loadError) {
			setError(loadError?.response?.data?.message || "Unable to load users");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadUsers();
	}, []);

	const resetForm = () => {
		setEditing(null);
		setForm({ name: "", email: "", role: "CUSTOMER", password: "" });
		setError("");
		setSuccess("");
	};

	const handleSubmit = async () => {
		if (!form.name.trim() || !form.email.trim() || !form.role.trim() || (!editing && !form.password.trim())) {
			setError("Please provide name, email, role, and a password for new users.");
			return;
		}

		setSaving(true);
		setError("");
		setSuccess("");

		try {
			if (editing) {
				await userService.update(editing.id, {
					name: form.name.trim(),
					email: form.email.trim(),
					role: form.role,
					password: form.password.trim() || undefined,
				});
				setSuccess("User updated successfully.");
			} else {
				await userService.create({
					name: form.name.trim(),
					email: form.email.trim(),
					role: form.role,
					password: form.password.trim(),
				});
				setSuccess("User created successfully.");
			}

			resetForm();
			await loadUsers();
		} catch (submitError) {
			setError(submitError?.response?.data?.message || "Unable to save user");
		} finally {
			setSaving(false);
		}
	};

	const handleEdit = (user) => {
		setEditing(user);
		setForm({
			name: user.name || "",
			email: user.email || "",
			role: user.role || "CUSTOMER",
			password: "",
		});
		setError("");
		setSuccess("");
	};

	const handleDelete = async (user) => {
		setError("");
		setSuccess("");

		try {
			await userService.remove(user.id);
			setSuccess("User deleted successfully.");
			await loadUsers();
		} catch (deleteError) {
			setError(deleteError?.response?.data?.message || "Unable to delete user");
		}
	};

	const roleCount = users.reduce((summary, currentUser) => {
		const role = String(currentUser.role || "UNKNOWN").toUpperCase();
		summary[role] = (summary[role] || 0) + 1;
		return summary;
	}, {});

	return (
		<div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
			<section className="glass-panel rounded-[2rem] border border-white/10 p-6">
				<div className="mb-5">
					<p className="text-sm text-slate-400">Administration</p>
					<h1 className="text-3xl font-semibold text-white">Manage Users</h1>
					<p className="mt-2 text-sm text-slate-400">Manage registered accounts and user roles with live backend operations.</p>
					<div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
						<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(users.length)} users</span>
						<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(roleCount.CUSTOMER || 0)} customers</span>
						<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(roleCount.SHOP_OWNER || 0)} shop owners</span>
						<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(roleCount.ADMIN || 0)} admins</span>
					</div>
				</div>

				{error ? <p className="mb-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
				{success ? <p className="mb-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</p> : null}
				{loading ? <p className="mb-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">Loading users...</p> : null}

				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<label className="text-sm text-slate-300">Name</label>
						<input
							type="text"
							value={form.name}
							onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
							placeholder="Full name"
							className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
						/>
					</div>
					<div>
						<label className="text-sm text-slate-300">Email</label>
						<input
							type="email"
							value={form.email}
							onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
							placeholder="name@example.com"
							className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
						/>
					</div>
					<div>
						<label className="text-sm text-slate-300">Role</label>
						<select
							value={form.role}
							onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
							className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
						>
							{roleOptions.map((role) => (
								<option key={role} value={role}>{role}</option>
							))}
						</select>
					</div>
					<div>
						<label className="text-sm text-slate-300">Password</label>
						<input
							type="password"
							value={form.password}
							onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
							placeholder={editing ? "Leave blank to keep password" : "Enter password"}
							className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
						/>
					</div>
				</div>

				<button
					type="button"
					onClick={handleSubmit}
					disabled={saving}
					className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-slate-950 disabled:opacity-50"
				>
					{saving ? "Saving..." : editing ? "Update user" : "Add user"}
				</button>
			</section>

			<section className="glass-panel rounded-[2rem] border border-white/10 p-6">
				<div className="mb-5">
					<p className="text-sm text-slate-400">User roster</p>
					<h2 className="text-2xl font-semibold text-white">All accounts</h2>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{users.map((user) => (
						<article key={user.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
							<div className="flex items-center justify-between gap-3">
								<p className="text-xs uppercase tracking-[0.3em] text-teal-300/70">{user.role}</p>
								<div className="flex gap-2">
									<button
										type="button"
										onClick={() => handleEdit(user)}
										className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200"
									>
										Edit
									</button>
									<button
										type="button"
										onClick={() => handleDelete(user)}
										className="rounded-2xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs text-red-200"
									>
										Delete
									</button>
								</div>
							</div>
							<h3 className="mt-4 text-xl font-semibold text-white">{user.name}</h3>
							<p className="mt-2 text-sm text-slate-400">{user.email}</p>
						</article>
					))}
				</div>
			</section>
		</div>
	);
}

export default ManageUsers;
