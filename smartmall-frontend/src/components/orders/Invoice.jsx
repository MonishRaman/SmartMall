import { formatCurrency } from "../../utils/formatCurrency";

function Invoice({ order }) {
	const items = order?.items || [];

	return (
		<div className="glass-panel rounded-3xl border border-white/10 p-6">
			<div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Invoice</p>
					<h3 className="mt-2 text-2xl font-semibold text-white">Order #{order?.id || "-"}</h3>
				</div>
				<span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">{order?.status || "PENDING"}</span>
			</div>

			<div className="mt-4 space-y-3 text-sm text-slate-300">
				{items.map((item) => (
					<div key={item.id || item.product?.id} className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 px-4 py-3">
						<span>{item.product?.name || item.name || "Item"} x {item.quantity}</span>
						<span>{formatCurrency((item.unitPrice || 0) * (item.quantity || 0))}</span>
					</div>
				))}
				<div className="flex items-center justify-between rounded-2xl bg-teal-400/10 px-4 py-3 font-semibold text-white">
					<span>Total</span>
					<span>{formatCurrency(order?.totalAmount || 0)}</span>
				</div>
			</div>
		</div>
	);
}

export default Invoice;
