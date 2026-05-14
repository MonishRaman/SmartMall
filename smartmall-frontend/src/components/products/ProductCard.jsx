import { formatCurrency } from "../../utils/formatCurrency";

function ProductCard({ product, onAddToCart, onViewDetails }) {
	return (
		<article className="glass-panel rounded-3xl border border-white/10 p-5 flex flex-col justify-between">
			<div>
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Product</p>
						<h3 className="mt-2 text-xl font-semibold text-white">{product.name}</h3>
						<p className="mt-2 text-sm text-slate-400 line-clamp-3">{product.description}</p>
						<p className="mt-2 text-xs text-slate-500">{product.shop?.shopName || `Shop #${product.shopId || "-"}`}</p>
					</div>
					<span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
						{product.category}
					</span>
				</div>

				<div className="mt-5 flex items-center justify-between text-sm text-slate-300">
					<span>{product.stockQuantity ?? 0} in stock</span>
					<span className="font-semibold text-white">{formatCurrency(product.price || 0)}</span>
				</div>
			</div>

			{(onViewDetails || onAddToCart) ? (
				<div className="mt-5 flex flex-col gap-3">
					{onViewDetails ? (
						<button
							onClick={() => onViewDetails(product)}
							className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
						>
							View details
						</button>
					) : null}
					{onAddToCart ? (
						<button
							onClick={() => onAddToCart(product)}
							className="rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300"
						>
							Add to cart
						</button>
					) : null}
				</div>
			) : null}
		</article>
	);
}

export default ProductCard;
