import { formatCurrency } from "../../utils/formatCurrency";

function ShopTable({ shops = [], onEdit, onDelete }) {
	return (
		<div className="glass-panel overflow-hidden rounded-3xl border border-white/10">
			<table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
				<thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400">
					<tr>
						<th className="px-4 py-3">Name</th>
						<th className="px-4 py-3">Owner</th>
						<th className="px-4 py-3">Category</th>
						<th className="px-4 py-3">Floor</th>
						<th className="px-4 py-3">Rent</th>
						<th className="px-4 py-3">Status</th>
						<th className="px-4 py-3">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-white/10">
					{shops.map((shop) => (
						<tr key={shop.id} className="hover:bg-white/5">
							<td className="px-4 py-4 font-medium text-white">{shop.shopName}</td>
							<td className="px-4 py-4">
								<p className="text-white">{shop.ownerName || "-"}</p>
								<p className="text-xs text-slate-500">{shop.ownerEmail || shop.ownerUserId || ""}</p>
							</td>
							<td className="px-4 py-4">{shop.category}</td>
							<td className="px-4 py-4">{shop.floorNumber}</td>
							<td className="px-4 py-4">{formatCurrency(shop.monthlyRent || 0)}</td>
							<td className="px-4 py-4">{shop.status}</td>
							<td className="px-4 py-4">
								<div className="flex gap-2">
									<button
										type="button"
										onClick={() => onEdit?.(shop)}
										className="rounded-xl border border-teal-400/30 bg-teal-400/10 px-3 py-2 text-xs font-medium text-teal-200"
									>
										Edit
									</button>
									<button
										type="button"
										onClick={() => onDelete?.(shop)}
										className="rounded-xl border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs font-medium text-red-200"
									>
										Delete
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ShopTable;
