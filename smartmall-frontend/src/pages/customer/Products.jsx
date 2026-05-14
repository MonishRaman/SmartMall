import { useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import productService from "../../services/productService";
import { compactNumber, sortByDateDesc } from "../../utils/dashboardData";

function Products() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const loadProducts = async () => {
		setLoading(true);
		setError("");

		try {
			const { data } = await productService.list();
			setProducts(data || []);
		} catch (loadError) {
			setError(loadError?.response?.data?.message || "Unable to load products");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProducts();
		const timer = window.setInterval(loadProducts, 20000);
		return () => window.clearInterval(timer);
	}, []);

	const liveProducts = sortByDateDesc(products, "createdAt");

	return (
		<div className="space-y-6">
			<section className="glass-panel rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-amber-500/10 p-6">
				<p className="text-sm text-slate-400">Customer</p>
				<h1 className="text-3xl font-semibold text-white">Live product catalog</h1>
				<p className="mt-2 max-w-3xl text-sm text-slate-300">
					Products created by shop owners are loaded straight from the backend. This view refreshes automatically so new items show up without a page reload.
				</p>
				<div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
					<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(products.length)} products</span>
					<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Refreshing every 20s</span>
				</div>
			</section>

			{error ? <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
			{loading ? <p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">Loading products...</p> : null}

			<div className="grid gap-4 lg:grid-cols-2">
				{liveProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

export default Products;