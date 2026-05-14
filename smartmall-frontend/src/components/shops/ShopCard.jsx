import { formatCurrency } from "../../utils/formatCurrency";

function ShopCard({ shop }) {
	return (
		<article className="glass-panel rounded-3xl border border-white/10 p-5 transition hover:-translate-y-1 hover:border-teal-400/30">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-teal-300/70">Shop</p>
					<h3 className="mt-2 text-2xl font-semibold text-white">{shop.shopName}</h3>
					<p className="mt-1 text-sm text-slate-400">{shop.category}</p>
				</div>
				<span className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-200">
					{shop.status || "Active"}
				</span>
			</div>

			<dl className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
				<div>
					<dt className="text-slate-500">Floor</dt>
					<dd>{shop.floorNumber ?? "-"}</dd>
				</div>
				<div>
					<dt className="text-slate-500">Monthly Rent</dt>
					<dd>{formatCurrency(shop.monthlyRent || 0)}</dd>
				</div>
			</dl>
		</article>
	);
}

export default ShopCard;
