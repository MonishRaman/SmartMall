import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";

function ProductDetailModal({ product, onClose, onAddToCart }) {
	if (!product) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-slate-950 p-6 shadow-2xl">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h2 className="text-2xl font-semibold text-white">{product.name}</h2>
						<p className="mt-2 text-sm text-slate-400">{product.description}</p>
						<p className="mt-2 text-xs text-slate-500">Shop: {product.shop?.shopName || `#${product.shopId || "-"}`}</p>
					</div>
					<button onClick={onClose} className="text-slate-300 hover:text-white">
						Close
					</button>
				</div>

				<div className="mt-6 grid gap-6 lg:grid-cols-[250px_minmax(0,_1fr)]">
					<img src={product.imageUrl} alt={product.name} className="h-72 w-full rounded-3xl object-cover" />
					<div className="space-y-4">
						<div className="rounded-3xl bg-slate-900 p-5">
							<p className="text-sm uppercase tracking-[0.3em] text-amber-300/70">Category</p>
							<p className="mt-2 text-lg text-white">{product.category}</p>
						</div>
						<div className="rounded-3xl bg-slate-900 p-5">
							<p className="text-sm uppercase tracking-[0.3em] text-amber-300/70">Price</p>
							<p className="mt-2 text-lg font-semibold text-white">{formatCurrency(product.price || 0)}</p>
						</div>
						<div className="rounded-3xl bg-slate-900 p-5">
							<p className="text-sm uppercase tracking-[0.3em] text-amber-300/70">Stock</p>
							<p className="mt-2 text-lg text-white">{product.stockQuantity ?? 0}</p>
						</div>
					</div>
				</div>

				<div className="mt-6 flex flex-wrap items-center gap-3">
					<button
						onClick={() => onAddToCart(product)}
						className="rounded-3xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-amber-300"
					>
						Add to cart
					</button>
					<button
						onClick={onClose}
						className="rounded-3xl border border-white/10 bg-slate-900 px-5 py-3 text-sm text-white hover:bg-slate-800"
					>
						Dismiss
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductDetailModal;
