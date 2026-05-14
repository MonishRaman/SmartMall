import { useState } from "react";

function Complaints() {
	const [items, setItems] = useState([
		{ id: 1, title: "Delayed delivery", status: "OPEN" },
		{ id: 2, title: "Parking billing issue", status: "RESOLVED" },
	]);

	return (
		<section className="space-y-6">
			<div>
				<p className="text-sm text-slate-400">Customer</p>
				<h1 className="text-3xl font-semibold text-white">Complaints</h1>
			</div>
			<div className="grid gap-4 lg:grid-cols-2">
				{items.map((item) => (
					<article key={item.id} className="glass-panel rounded-3xl border border-white/10 p-5">
						<p className="text-sm text-slate-400">#{item.id}</p>
						<h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
						<p className="mt-2 text-sm text-slate-400">{item.status}</p>
					</article>
				))}
			</div>
			<button
				type="button"
				onClick={() => setItems((current) => [...current, { id: Date.now(), title: "New complaint", status: "OPEN" }])}
				className="rounded-2xl bg-gradient-to-r from-red-400 to-orange-400 px-5 py-3 font-semibold text-slate-950"
			>
				Raise Complaint
			</button>
		</section>
	);
}

export default Complaints;
