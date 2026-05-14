import { useEffect, useState } from "react";
import ShopForm from "../../components/shops/ShopForm";
import ShopTable from "../../components/shops/ShopTable";
import shopService from "../../services/shopService";
import { compactNumber, sumBy } from "../../utils/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

function ManageShops() {
	const [shops, setShops] = useState([]);
	const [editing, setEditing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	const loadShops = async () => {
		setLoading(true);
		setError("");

		try {
			const { data } = await shopService.list();
			setShops(data || []);
		} catch (loadError) {
			setError(loadError?.response?.data?.message || "Unable to load shops");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadShops();
	}, []);

	const handleSubmit = async (shop) => {
		setSaving(true);
		setError("");

		try {
			if (editing) {
				await shopService.update(editing.id, shop);
			} else {
				await shopService.create(shop);
			}

			setEditing(null);
			await loadShops();
		} catch (submitError) {
			setError(submitError?.response?.data?.message || "Unable to save shop");
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async (shop) => {
		setError("");

		try {
			await shopService.remove(shop.id);
			await loadShops();
		} catch (deleteError) {
			setError(deleteError?.response?.data?.message || "Unable to delete shop");
		}
	};

	const totalRent = sumBy(shops, (shop) => shop.monthlyRent);

	return (
		<div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
			<div className="space-y-4">
				<div className="glass-panel rounded-[2rem] border border-white/10 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-amber-500/10 p-6">
					<p className="text-sm text-slate-400">Administration</p>
					<h1 className="text-3xl font-semibold text-white">Manage Shops</h1>
					<p className="mt-2 text-sm text-slate-300">Shop records are saved directly to the backend and immediately reflected in the table.</p>
					<div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
						<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(shops.length)} shops</span>
						<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{formatCurrency(totalRent)} monthly rent</span>
					</div>
				</div>
				{error ? <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
				<ShopForm
					initialValue={editing || undefined}
					submitLabel={saving ? "Saving..." : editing ? "Update Shop" : "Add Shop"}
					onSubmit={handleSubmit}
				/>
			</div>
			<div>
				{loading ? <p className="mb-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">Loading shops...</p> : null}
				<ShopTable
					shops={shops}
					onEdit={setEditing}
					onDelete={handleDelete}
				/>
			</div>
		</div>
	);
}

export default ManageShops;
