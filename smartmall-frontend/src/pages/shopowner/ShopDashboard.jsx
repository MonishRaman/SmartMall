import { useEffect, useState } from "react";
import { FiDollarSign, FiPackage, FiShoppingCart, FiTrendingUp } from "react-icons/fi";
import AnalyticsWidget from "../../components/dashboard/AnalyticsWidget";
import DashboardCard from "../../components/dashboard/DashboardCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import VisitorChart from "../../components/dashboard/VisitorChart";
import ProductCard from "../../components/products/ProductCard";
import { useAuth } from "../../hooks/useAuth";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";
import productService from "../../services/productService";
import { buildWeeklySeries, compactNumber, percent, sumBy } from "../../utils/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

function ShopDashboard() {
	const { user } = useAuth();
	const [products, setProducts] = useState([]);
	const [orders, setOrders] = useState([]);
	const [payments, setPayments] = useState([]);

	useEffect(() => {
		Promise.all([productService.list(user?.shopId), orderService.list(), paymentService.list()])
			.then(([productsResponse, ordersResponse, paymentsResponse]) => {
				setProducts(productsResponse.data || []);
				setOrders(ordersResponse.data || []);
				setPayments(paymentsResponse.data || []);
			})
			.catch(() => undefined);
	}, [user?.shopId]);

	const revenue = sumBy(payments, (payment) => payment.amount);
	const deliveredOrders = orders.filter((order) => String(order.status || "").toUpperCase() === "DELIVERED").length;
	const lowStockCount = products.filter((product) => Number(product.stockQuantity || 0) <= 10).length;
	const averageTicket = orders.length ? revenue / orders.length : 0;
	const revenueSeries = buildWeeklySeries(payments, "paidAt", (payment) => payment.amount, "revenue");
	const orderSeries = buildWeeklySeries(orders, "orderedAt", () => 1, "visitors");
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
							<h3 className="mt-2 text-2xl font-semibold text-white">{formatCurrency(revenue)}</h3>
							<p className="mt-2 text-sm text-slate-400">{compactNumber(payments.length)} payments captured</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Inventory</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{compactNumber(products.length)} products</h3>
							<p className="mt-2 text-sm text-slate-400">{lowStockCount} low stock items</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Orders</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{compactNumber(orders.length)}</h3>
							<p className="mt-2 text-sm text-slate-400">Live order history from the database</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Fulfillment</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{percent(deliveredOrders, orders.length)}</h3>
							<p className="mt-2 text-sm text-slate-400">Delivered order share</p>
						</div>
					</div>
				</div>
			</section>

			<section className="grid gap-4 md:grid-cols-4">
				<DashboardCard title="Sales" value={formatCurrency(revenue)} subtitle="Live from payment records" icon={FiDollarSign} accent="teal" />
				<DashboardCard title="Products" value={compactNumber(products.length)} subtitle="Active catalog" icon={FiPackage} accent="amber" />
				<DashboardCard title="Orders" value={compactNumber(orders.length)} subtitle="Pending and fulfilled" icon={FiShoppingCart} accent="cyan" />
				<DashboardCard title="Growth" value={percent(deliveredOrders, orders.length)} subtitle="Fulfilled order rate" icon={FiTrendingUp} accent="violet" />
			</section>

			<section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
				<RevenueChart data={revenueSeries} />
				<VisitorChart data={orderSeries} />
			</section>

			<AnalyticsWidget
				items={[
					{ label: "Average ticket", value: formatCurrency(averageTicket), description: "Mean order value from live orders" },
					{ label: "Low stock", value: compactNumber(lowStockCount), description: "Products at or below 10 units" },
					{ label: "Fulfillment", value: percent(deliveredOrders, orders.length), description: "Delivered order share" },
					{ label: "Revenue", value: formatCurrency(revenue), description: "Captured payment amount" },
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
