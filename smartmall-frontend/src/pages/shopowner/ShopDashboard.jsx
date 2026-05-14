import { useEffect, useState } from "react";
import { FiDollarSign, FiPackage, FiShoppingCart, FiTrendingUp } from "react-icons/fi";
import AnalyticsWidget from "../../components/dashboard/AnalyticsWidget";
import DashboardCard from "../../components/dashboard/DashboardCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import VisitorChart from "../../components/dashboard/VisitorChart";
import ProductCard from "../../components/products/ProductCard";
import { useAuth } from "../../hooks/useAuth";
import orderService from "../../services/orderService";
import productService from "../../services/productService";
import { buildWeeklySeries, compactNumber, percent, sumBy } from "../../utils/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

function ShopDashboard() {
	const { user } = useAuth();
	const [products, setProducts] = useState([]);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		Promise.all([productService.list(user?.shopId), orderService.list()])
			.then(([productsResponse, ordersResponse]) => {
				setProducts(productsResponse.data || []);
				setOrders(ordersResponse.data || []);
			})
			.catch(() => undefined);
	}, [user?.shopId]);

	const shopOrderItems = orders.flatMap((order) =>
		(order.items || []).filter(
			(item) => item.product?.shop?.id === user?.shopId,
		),
	);

	const shopOrders = orders.filter((order) =>
		(order.items || []).some((item) => item.product?.shop?.id === user?.shopId),
	);

	const shopRevenue = sumBy(shopOrderItems, (item) => Number(item.unitPrice || 0) * Number(item.quantity || 0));
	const deliveredOrders = shopOrders.filter((order) => String(order.status || "").toUpperCase() === "DELIVERED").length;
	const lowStockCount = products.filter((product) => Number(product.stockQuantity || 0) <= 10).length;
	const averageTicket = shopOrders.length ? shopRevenue / shopOrders.length : 0;
	const revenueSeries = buildWeeklySeries(shopOrders, "orderedAt", (order) =>
		sumBy((order.items || []).filter((item) => item.product?.shop?.id === user?.shopId), (item) => Number(item.unitPrice || 0) * Number(item.quantity || 0)),
		"revenue",
	);
	const orderSeries = buildWeeklySeries(shopOrders, "orderedAt", () => 1, "visitors");
	const displayProducts = products.slice(0, 6);

	return (
		<div className="space-y-6">
			<section className="glass-panel rounded-[2rem] border border-white/10 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-teal-500/10 p-6">
				<div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
					<div>
						<p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">Shop owner console</p>
						<h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Live store performance</h1>
						<p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
							Inventory, orders, and revenue are now read from the backend so the shop dashboard matches the actual catalog and sales state.
						</p>
					</div>
					<div className="grid gap-3 sm:grid-cols-2">
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Revenue</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{formatCurrency(shopRevenue)}</h3>
							<p className="mt-2 text-sm text-slate-400">Revenue from your shop items</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Inventory</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{compactNumber(products.length)} products</h3>
							<p className="mt-2 text-sm text-slate-400">{lowStockCount} low stock items</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Orders</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{compactNumber(shopOrders.length)}</h3>
							<p className="mt-2 text-sm text-slate-400">Orders containing your products</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Fulfillment</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{percent(deliveredOrders, shopOrders.length)}</h3>
							<p className="mt-2 text-sm text-slate-400">Delivered order share for your shop</p>
						</div>
					</div>
				</div>
			</section>

			<section className="grid gap-4 md:grid-cols-4">
				<DashboardCard title="Sales" value={formatCurrency(shopRevenue)} subtitle="Shop-specific revenue" icon={FiDollarSign} accent="teal" />
				<DashboardCard title="Products" value={compactNumber(products.length)} subtitle="Active catalog" icon={FiPackage} accent="amber" />
				<DashboardCard title="Orders" value={compactNumber(shopOrders.length)} subtitle="Orders containing shop items" icon={FiShoppingCart} accent="cyan" />
				<DashboardCard title="Growth" value={percent(deliveredOrders, shopOrders.length)} subtitle="Delivered share" icon={FiTrendingUp} accent="violet" />
			</section>

			<section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
				<RevenueChart data={revenueSeries} />
				<VisitorChart data={orderSeries} />
			</section>

			<AnalyticsWidget
				items={[
					{ label: "Average ticket", value: formatCurrency(averageTicket), description: "Mean order value for your shop" },
					{ label: "Low stock", value: compactNumber(lowStockCount), description: "Products at or below 10 units" },
					{ label: "Fulfillment", value: percent(deliveredOrders, shopOrders.length), description: "Delivered order percentage" },
					{ label: "Revenue", value: formatCurrency(shopRevenue), description: "Revenue from shop orders" },
				]}
			/>

			<section className="grid gap-4 lg:grid-cols-2">
				{displayProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</section>
		</div>
	);
}

export default ShopDashboard;
