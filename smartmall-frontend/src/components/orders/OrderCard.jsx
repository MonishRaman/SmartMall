import { formatCurrency } from "../../utils/formatCurrency";

function OrderCard({ order }) {
	return (
		<article className="glass-panel rounded-3xl border border-white/10 p-5">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Order</p>
					<h3 className="mt-2 text-xl font-semibold text-white">#{order.id}</h3>
					<p className="mt-1 text-sm text-slate-400">{order.status}</p>
				</div>
				<span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
					{formatCurrency(order.totalAmount || 0)}
				</span>
			</div>
			<p className="mt-4 text-sm text-slate-300">Placed for {order.user?.name || order.userName || "Customer"}</p>
		</article>
	);
}

export default OrderCard;
