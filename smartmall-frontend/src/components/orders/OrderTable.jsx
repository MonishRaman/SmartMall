import { formatCurrency } from "../../utils/formatCurrency";

function OrderTable({ orders = [], onUpdateStatus }) {
	return (
		<div className="glass-panel overflow-hidden rounded-3xl border border-white/10">
			<table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
				<thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400">
					<tr>
						<th className="px-4 py-3">Order</th>
						<th className="px-4 py-3">Customer</th>
						<th className="px-4 py-3">Status</th>
						<th className="px-4 py-3">Amount</th>
						<th className="px-4 py-3">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-white/10">
					{orders.map((order) => (
						<tr key={order.id} className="hover:bg-white/5">
							<td className="px-4 py-4 font-medium text-white">#{order.id}</td>
							<td className="px-4 py-4">{order.user?.name || order.customer || "-"}</td>
							<td className="px-4 py-4">{order.status}</td>
							<td className="px-4 py-4">{formatCurrency(order.totalAmount || 0)}</td>
							<td className="px-4 py-4">
								<button
									type="button"
									onClick={() => onUpdateStatus?.(order)}
									className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-200"
								>
									Update Status
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default OrderTable;
