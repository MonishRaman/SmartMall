function Events() {
	const events = [
		{ date: "14 Jun", title: "Summer fashion launch", location: "Atrium" },
		{ date: "20 Jun", title: "Food festival", location: "Level 2" },
		{ date: "01 Jul", title: "Mall anniversary sale", location: "All zones" },
	];

	return (
		<div className="page-shell px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl space-y-6">
				<p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Events</p>
				<h1 className="text-4xl font-semibold text-white">Upcoming mall events</h1>
				<div className="space-y-4">
					{events.map((event) => (
						<article key={event.title} className="glass-panel flex flex-col gap-3 rounded-3xl border border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="text-sm text-slate-400">{event.date}</p>
								<h2 className="text-xl font-semibold text-white">{event.title}</h2>
							</div>
							<span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">{event.location}</span>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}

export default Events;
