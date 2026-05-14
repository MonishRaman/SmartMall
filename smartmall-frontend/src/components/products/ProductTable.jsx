import { formatCurrency } from "../../utils/formatCurrency";

function ProductTable({ products = [], onEdit, onDelete }) {
	return (
		<div className="glass-panel overflow-hidden rounded-3xl border border-white/10">
			<table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
				<thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400">
					<tr>
						<th className="px-4 py-3">Name</th>
						<th className="px-4 py-3">Shop</th>
						<th className="px-4 py-3">Category</th>
						<th className="px-4 py-3">Price</th>
						<th className="px-4 py-3">Stock</th>
						<th className="px-4 py-3">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-white/10">
					{products.map((product) => (
						<tr key={product.id} className="hover:bg-white/5">
							<td className="px-4 py-4 font-medium text-white">{product.name}</td>
							<td className="px-4 py-4">{product.shop?.shopName || `#${product.shopId || "-"}`}</td>
							<td className="px-4 py-4">{product.category}</td>
							<td className="px-4 py-4">{formatCurrency(product.price || 0)}</td>
							<td className="px-4 py-4">{product.stockQuantity}</td>
							<td className="px-4 py-4">
								<div className="flex gap-2">
									<button type="button" onClick={() => onEdit?.(product)} className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs font-medium text-amber-200">Edit</button>
									<button type="button" onClick={() => onDelete?.(product)} className="rounded-xl border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs font-medium text-red-200">Delete</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ProductTable;
