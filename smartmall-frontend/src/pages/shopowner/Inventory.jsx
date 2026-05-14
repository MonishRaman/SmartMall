import { useEffect, useState } from "react";
import ProductForm from "../../components/products/ProductForm";
import ProductTable from "../../components/products/ProductTable";
import { useAuth } from "../../hooks/useAuth";
import productService from "../../services/productService";
import { compactNumber, sumBy } from "../../utils/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

function Inventory() {
	const { user } = useAuth();
	const [products, setProducts] = useState([]);
	const [editing, setEditing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	const loadProducts = async () => {
		setLoading(true);
		setError("");

		try {
			const { data } = await productService.list(user?.shopId);
			setProducts(data || []);
		} catch (loadError) {
			setError(loadError?.response?.data?.message || "Unable to load products");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProducts();
	}, [user?.shopId]);

	const totalValue = sumBy(products, (product) => Number(product.price || 0) * Number(product.stockQuantity || 0));
	const lowStockCount = products.filter((product) => Number(product.stockQuantity || 0) <= 10).length;

	const editingValue = editing
		? {
			name: editing.name || "",
			description: editing.description || "",
			category: editing.category || "FOOD",
			price: editing.price ?? "",
			stockQuantity: editing.stockQuantity ?? "",
			shopId: editing.shopId ?? editing.shop?.id ?? user?.shopId ?? "",
		}
		: undefined;

	const handleSubmit = async (product) => {
		setSaving(true);
		setError("");

		try {
			const { shopId, ...payload } = product;
			const resolvedShopId = Number(shopId || user?.shopId);

			if (!resolvedShopId) {
				throw new Error("Shop id is required to save a product");
			}

			const body = {
				...payload,
				shop: { id: resolvedShopId },
			};

			if (editing) {
				await productService.update(editing.id, body);
			} else {
				await productService.create(body);
			}

			setEditing(null);
			await loadProducts();
		} catch (submitError) {
			setError(submitError?.response?.data?.message || "Unable to save product");
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async (product) => {
		setError("");
		try {
			await productService.remove(product.id);
			await loadProducts();
		} catch (deleteError) {
			setError(deleteError?.response?.data?.message || "Unable to delete product");
		}
	};

	return (
		<div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
			<div className="space-y-4">
				<div className="glass-panel rounded-[2rem] border border-white/10 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6">
					<p className="text-sm text-slate-400">Shop Owner</p>
					<h1 className="text-3xl font-semibold text-white">Inventory</h1>
					<p className="mt-2 text-sm text-slate-300">Create, update, and remove products directly against the backend.</p>
					<div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
						<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(products.length)} products</span>
						<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(lowStockCount)} low stock</span>
						<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{formatCurrency(totalValue)} inventory value</span>
					</div>
				</div>
				{error ? <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
				<ProductForm initialValue={editingValue} submitLabel={saving ? "Saving..." : editing ? "Update Product" : "Save Product"} onSubmit={handleSubmit} />
			</div>
			<div>
				{loading ? <p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">Loading products...</p> : null}
				<ProductTable
					products={products}
					onEdit={setEditing}
					onDelete={handleDelete}
				/>
			</div>
		</div>
	);
}

export default Inventory;
