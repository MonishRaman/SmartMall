import { useEffect, useState } from "react";
import offerService from "../services/offerService";

function Offers() {
	const [offers, setOffers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadOffers = async () => {
			setLoading(true);
			setError("");

			try {
				const { data } = await offerService.list();
				setOffers(data || []);
			} catch (loadError) {
				setError(loadError?.response?.data?.message || "Unable to load offers");
			} finally {
				setLoading(false);
			}
		};

		loadOffers();
	}, []);

	return (
		<div className="page-shell px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl space-y-6">
				<p className="text-xs uppercase tracking-[0.4em] text-teal-300/80">Offers</p>
				<h1 className="text-4xl font-semibold text-white">Current promotions</h1>
				{error ? <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
				{loading ? (
					<p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">Loading offers...</p>
				) : null}
				{!loading && offers.length === 0 ? (
					<p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">No current offers available.</p>
				) : null}
				<div className="grid gap-4 md:grid-cols-3">
					{offers.map((offer) => (
						<article key={offer.id} className="glass-panel rounded-3xl border border-white/10 p-5">
							<h2 className="text-xl font-semibold text-white">{offer.title}</h2>
							<p className="mt-2 text-sm text-slate-400">{offer.description || `${offer.discountPercent ?? 0}% off`}</p>
							<p className="mt-3 text-xs uppercase tracking-[0.25em] text-slate-500">
								{offer.shop?.shopName || "Mall-wide"}
							</p>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}

export default Offers;
