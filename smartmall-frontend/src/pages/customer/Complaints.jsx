import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import complaintService from "../../services/complaintService";

function Complaints() {
	const { user } = useAuth();
	const [complaints, setComplaints] = useState([]);
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	const loadComplaints = async () => {
		if (!user?.id) {
			setLoading(false);
			return;
		}

		setLoading(true);
		setError("");

		try {
			const { data } = await complaintService.list(user.id);
			setComplaints(data || []);
		} catch (loadError) {
			setError(loadError?.response?.data?.message || "Unable to load complaints");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadComplaints();
	}, [user?.id]);

	const handleCreate = async () => {
		if (!description.trim()) {
			setError("Please describe the complaint before submitting.");
			return;
		}

		setSaving(true);
		setError("");

		try {
			const { data } = await complaintService.create({
				user: { id: user.id },
				description: description.trim(),
			});
			setComplaints((current) => [data, ...current]);
			setDescription("");
		} catch (submitError) {
			setError(submitError?.response?.data?.message || "Unable to submit complaint");
		} finally {
			setSaving(false);
		}
	};

	return (
		<section className="space-y-6">
			<div>
				<p className="text-sm text-slate-400">Customer</p>
				<h1 className="text-3xl font-semibold text-white">Complaints</h1>
				<p className="mt-2 max-w-3xl text-sm text-slate-300">All of your submitted complaints are backed by the backend complaint service.</p>
			</div>

			{error ? <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}

			<div className="glass-panel rounded-3xl border border-white/10 p-5">
				<label className="block text-sm text-slate-300">Describe your issue</label>
				<textarea
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					rows={4}
					className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
				/>
				<button
					type="button"
					onClick={handleCreate}
					disabled={saving}
					className="mt-4 rounded-2xl bg-gradient-to-r from-red-400 to-orange-400 px-5 py-3 font-semibold text-slate-950 disabled:opacity-50"
				>
					{saving ? "Submitting..." : "Raise Complaint"}
				</button>
			</div>

			{loading ? (
				<p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">Loading complaints...</p>
			) : null}

			<div className="grid gap-4 lg:grid-cols-2">
				{complaints.map((item) => (
					<article key={item.id} className="glass-panel rounded-3xl border border-white/10 p-5">
						<p className="text-sm text-slate-400">#{item.id}</p>
						<h3 className="mt-2 text-xl font-semibold text-white">{item.description}</h3>
						<p className="mt-2 text-sm text-slate-400">{item.status}</p>
					</article>
				))}
			</div>
		</section>
	);
}

export default Complaints;
