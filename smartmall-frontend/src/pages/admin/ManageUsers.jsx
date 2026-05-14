import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { compactNumber } from "../../utils/dashboardData";

function ManageUsers() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let isMounted = true;

		userService.list()
			.then(({ data }) => {
				if (isMounted) {
					setUsers(data || []);
				}
			})
			.catch((loadError) => {
				if (isMounted) {
					setError(loadError?.response?.data?.message || "Unable to load users");
				}
			})
			.finally(() => {
				if (isMounted) {
					setLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	const roleCount = users.reduce((summary, currentUser) => {
		const role = String(currentUser.role || "UNKNOWN").toUpperCase();
		summary[role] = (summary[role] || 0) + 1;
		return summary;
	}, {});

	return (
		<section className="glass-panel rounded-[2rem] border border-white/10 p-6">
			<div className="mb-5">
				<p className="text-sm text-slate-400">Administration</p>
				<h1 className="text-3xl font-semibold text-white">Manage Users</h1>
				<p className="mt-2 text-sm text-slate-400">The cards below come from the live user table.</p>
				<div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
					<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(users.length)} users</span>
					<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(roleCount.CUSTOMER || 0)} customers</span>
					<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(roleCount.SHOP_OWNER || 0)} shop owners</span>
					<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(roleCount.ADMIN || 0)} admins</span>
				</div>
			</div>

			{error ? <p className="mb-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
			{loading ? <p className="mb-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">Loading users...</p> : null}

			<div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
				{users.map((user) => (
					<article key={user.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
						<p className="text-xs uppercase tracking-[0.3em] text-teal-300/70">{user.role}</p>
						<h3 className="mt-2 text-xl font-semibold text-white">{user.name}</h3>
						<p className="mt-2 text-sm text-slate-400">{user.email}</p>
					</article>
				))}
			</div>
		</section>
	);
}

export default ManageUsers;
