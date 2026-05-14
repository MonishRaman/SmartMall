function AnalyticsWidget({ items = [] }) {
	return (
		<div className="glass-panel rounded-3xl border border-white/10 p-5">
			<p className="text-sm text-slate-400">Analytics snapshot</p>
			<h3 className="text-xl font-semibold text-white">Operational highlights</h3>
			<div className="mt-5 grid gap-3">
				{items.map((item) => (
					<div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
						<div className="flex items-center justify-between gap-3">
							<span className="text-sm text-slate-300">{item.label}</span>
							<span className="text-lg font-semibold text-white">{item.value}</span>
						</div>
						{item.description ? <p className="mt-2 text-sm text-slate-400">{item.description}</p> : null}
					</div>
				))}
			</div>
		</div>
	);
}

export default AnalyticsWidget;
