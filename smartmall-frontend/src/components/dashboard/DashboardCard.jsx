function DashboardCard({ title, value, subtitle, icon: Icon, accent = "teal" }) {
	const accentClasses = {
		teal: "from-teal-400/20 to-cyan-400/5 text-teal-200",
		amber: "from-amber-400/20 to-orange-400/5 text-amber-200",
		cyan: "from-cyan-400/20 to-blue-400/5 text-cyan-200",
		violet: "from-violet-400/20 to-fuchsia-400/5 text-violet-200",
	};

	return (
		<div className={`glass-panel rounded-3xl border border-white/10 bg-gradient-to-br p-5 ${accentClasses[accent] || accentClasses.teal}`}>
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm text-slate-300">{title}</p>
					<h3 className="mt-2 text-3xl font-semibold text-white">{value}</h3>
					{subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
				</div>
				{Icon ? (
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl text-white">
						<Icon />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default DashboardCard;
