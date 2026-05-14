import { useEffect, useState } from "react";
import eventService from "../services/eventService";

function Events() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadEvents = async () => {
			setLoading(true);
			setError("");

			try {
				const { data } = await eventService.list();
				setEvents(data || []);
			} catch (loadError) {
				setError(loadError?.response?.data?.message || "Unable to load events");
			} finally {
				setLoading(false);
			}
		};

		loadEvents();
	}, []);

	const formatInstant = (value) => {
		if (!value) return "TBA";
		return new Date(value).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "numeric" });
	};

	return (
		<div className="page-shell px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl space-y-6">
				<p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Events</p>
				<h1 className="text-4xl font-semibold text-white">Upcoming mall events</h1>
				{error ? <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
				{loading ? (
					<p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">Loading events...</p>
				) : null}
				{!loading && events.length === 0 ? (
					<p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">No upcoming events scheduled.</p>
				) : null}
				<div className="space-y-4">
					{events.map((event) => (
						<article key={event.id} className="glass-panel flex flex-col gap-3 rounded-3xl border border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="text-sm text-slate-400">{formatInstant(event.startsAt)}</p>
								<h2 className="text-xl font-semibold text-white">{event.name}</h2>
								<p className="mt-2 text-sm text-slate-400">{event.description}</p>
							</div>
							<div className="text-right">
								<p className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">{event.location || "Mall venue"}</p>
								<p className="mt-2 text-xs text-slate-500">Ends {formatInstant(event.endsAt)}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}

export default Events;
