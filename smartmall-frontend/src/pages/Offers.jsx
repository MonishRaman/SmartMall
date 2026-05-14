function Offers() {
	const offers = [
		{ title: "Weekend fashion sale", discount: "Up to 40% off" },
		{ title: "Food court combos", discount: "Buy 2 get 1" },
		{ title: "Parking voucher", discount: "Free 2 hours" },
	];

	return (
		<div className="page-shell px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl space-y-6">
				<p className="text-xs uppercase tracking-[0.4em] text-teal-300/80">Offers</p>
				<h1 className="text-4xl font-semibold text-white">Current promotions</h1>
				<div className="grid gap-4 md:grid-cols-3">
					{offers.map((offer) => (
						<article key={offer.title} className="glass-panel rounded-3xl border border-white/10 p-5">
							<h2 className="text-xl font-semibold text-white">{offer.title}</h2>
							<p className="mt-2 text-sm text-slate-400">{offer.discount}</p>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}

export default Offers;
