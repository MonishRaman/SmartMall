import { formatCurrency } from "../../utils/formatCurrency";

function ProductCard({ product }) {
	return (
		<article className="glass-panel rounded-3xl border border-white/10 p-5">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Product</p>
					<h3 className="mt-2 text-xl font-semibold text-white">{product.name}</h3>
					<p className="mt-2 text-sm text-slate-400">{product.description}</p>
					<p className="mt-2 text-xs text-slate-500">{product.shop?.shopName || `Shop #${product.shopId || "-"}`}</p>
				</div>
				<span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
					{product.category}
				</span>
			</div>

			<div className="mt-5 flex items-center justify-between text-sm text-slate-300">
				<span>{product.stockQuantity} in stock</span>
				<span className="font-semibold text-white">{formatCurrency(product.price || 0)}</span>
			</div>
		</article>
	);
}

export default ProductCard;
