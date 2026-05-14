import { useEffect, useState } from "react";
import { FiBarChart2, FiPackage, FiShoppingBag, FiUsers } from "react-icons/fi";
import AnalyticsWidget from "../../components/dashboard/AnalyticsWidget";
import DashboardCard from "../../components/dashboard/DashboardCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import VisitorChart from "../../components/dashboard/VisitorChart";
import ProductCard from "../../components/products/ProductCard";
import analyticsService from "../../services/analyticsService";
import notificationService from "../../services/notificationService";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";
import parkingService from "../../services/parkingService";
import productService from "../../services/productService";
import shopService from "../../services/shopService";
import { buildWeeklySeries, compactNumber, formatRelativeTime, percent, sortByDateDesc, sumBy } from "../../utils/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

function AdminDashboard() {
	const [overview, setOverview] = useState({ users: 0, shops: 0, products: 0, orders: 0, payments: 0 });
	const [orders, setOrders] = useState([]);
	const [payments, setPayments] = useState([]);
	const [parkingSlots, setParkingSlots] = useState([]);
	const [notifications, setNotifications] = useState([]);
	const [products, setProducts] = useState([]);
	const [shops, setShops] = useState([]);

	useEffect(() => {
		let isMounted = true;

		Promise.all([
			analyticsService.dashboard(),
			orderService.list(),
			paymentService.list(),
			parkingService.listSlots(),
			notificationService.list(),
			productService.list(),
			shopService.list(),
		])
			.then(([overviewResponse, ordersResponse, paymentsResponse, parkingResponse, notificationResponse, productsResponse, shopsResponse]) => {
				if (!isMounted) {
					return;
				}

				setOverview(overviewResponse.data || {});
				setOrders(ordersResponse.data || []);
				setPayments(paymentsResponse.data || []);
				setParkingSlots(parkingResponse.data || []);
				setNotifications(notificationResponse.data || []);
				setProducts(productsResponse.data || []);
				setShops(shopsResponse.data || []);
			})
			.catch(() => undefined);

		const timer = window.setInterval(() => {
			Promise.all([
				analyticsService.dashboard(),
				orderService.list(),
				paymentService.list(),
				parkingService.listSlots(),
				notificationService.list(),
				productService.list(),
				shopService.list(),
			])
				.then(([overviewResponse, ordersResponse, paymentsResponse, parkingResponse, notificationResponse, productsResponse, shopsResponse]) => {
					if (!isMounted) {
						return;
					}

					setOverview(overviewResponse.data || {});
					setOrders(ordersResponse.data || []);
					setPayments(paymentsResponse.data || []);
					setParkingSlots(parkingResponse.data || []);
					setNotifications(notificationResponse.data || []);
					setProducts(productsResponse.data || []);
					setShops(shopsResponse.data || []);
				})
				.catch(() => undefined);
		}, 30000);

		return () => {
			isMounted = false;
			window.clearInterval(timer);
		};
	}, []);

	const revenue = sumBy(payments, (payment) => payment.amount);
	const occupiedSlots = parkingSlots.filter((slot) => slot.occupied).length;
	const availableSlots = Math.max(0, parkingSlots.length - occupiedSlots);
	const unreadNotifications = notifications.filter((notification) => !notification.isRead).length;
	const fulfilledOrders = orders.filter((order) => String(order.status || "").toUpperCase() === "DELIVERED").length;
	const weeklyRevenue = buildWeeklySeries(payments, "paidAt", (payment) => payment.amount, "revenue");
	const weeklyVisitors = buildWeeklySeries(orders, "orderedAt", () => 1, "visitors");
	const recentOrders = sortByDateDesc(orders, "orderedAt").slice(0, 4);
	const recentAlerts = sortByDateDesc(notifications, "createdAt").slice(0, 4);
	const recentProducts = sortByDateDesc(products, "createdAt").slice(0, 4);
	const recentShops = shops.slice(0, 4);

	const metrics = [
		{ title: "Total Users", value: compactNumber(overview.users), subtitle: "Registered accounts", icon: FiUsers, accent: "teal" },
		{ title: "Total Shops", value: compactNumber(overview.shops), subtitle: "Active commercial units", icon: FiShoppingBag, accent: "amber" },
		{ title: "Total Products", value: compactNumber(overview.products), subtitle: "Catalog items", icon: FiPackage, accent: "cyan" },
		{ title: "Total Orders", value: compactNumber(overview.orders), subtitle: "Order pipeline", icon: FiBarChart2, accent: "violet" },
	];

	return (
		<div className="space-y-6">
			<section className="glass-panel rounded-[2rem] border border-white/10 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-violet-500/10 p-6">
				<div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
					<div>
						<p className="text-xs uppercase tracking-[0.35em] text-teal-300/80">Live control room</p>
						<h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Real-time mall operations</h1>
						<p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
							The dashboard now reads directly from the database, so totals, traffic, revenue, and alerts reflect the current system state.
						</p>
					</div>
					<div className="grid gap-3 sm:grid-cols-2">
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Revenue</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{formatCurrency(revenue)}</h3>
							<p className="mt-2 text-sm text-slate-400">{compactNumber(payments.length)} payments recorded</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Parking</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{availableSlots} open</h3>
							<p className="mt-2 text-sm text-slate-400">{occupiedSlots} occupied across {compactNumber(parkingSlots.length)} slots</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Fulfillment</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{percent(fulfilledOrders, orders.length)}</h3>
							<p className="mt-2 text-sm text-slate-400">Delivered orders vs total orders</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Unread alerts</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{compactNumber(unreadNotifications)}</h3>
							<p className="mt-2 text-sm text-slate-400">Latest update {recentAlerts[0] ? formatRelativeTime(recentAlerts[0].createdAt) : "just now"}</p>
						</div>
					</div>
				</div>
			</section>

			<section className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
				{metrics.map((metric) => (
					<DashboardCard key={metric.title} {...metric} />
				))}
			</section>

			<section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
				<RevenueChart data={weeklyRevenue} />
				<AnalyticsWidget
					items={[
						{ label: "Revenue", value: formatCurrency(revenue), description: "Payments captured from the database" },
						{ label: "Orders", value: compactNumber(orders.length), description: "Completed and in-flight orders" },
						{ label: "Footfall", value: compactNumber(orders.length), description: "Live order activity across the mall" },
						{ label: "Alerts", value: compactNumber(unreadNotifications), description: "Unread notifications and escalations" },
					]}
				/>
			</section>

			<VisitorChart data={weeklyVisitors} />

			<div className="grid gap-6 xl:grid-cols-2">
				<div className="glass-panel rounded-3xl border border-white/10 p-5">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="text-sm text-slate-400">Recent orders</p>
							<h3 className="text-xl font-semibold text-white">Latest activity from the database</h3>
						</div>
						<span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{compactNumber(recentOrders.length)} shown</span>
					</div>
					<div className="mt-4 grid gap-3">
						{recentOrders.map((order) => (
							<div key={order.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
								<div className="flex items-center justify-between gap-4">
									<div>
										<p className="text-sm text-white">Order #{order.id}</p>
										<p className="mt-1 text-xs text-slate-400">{order.user?.name || "Customer"}</p>
									</div>
									<div className="text-right">
										<p className="text-sm font-medium text-white">{formatCurrency(order.totalAmount || 0)}</p>
										<p className="mt-1 text-xs text-slate-400">{formatRelativeTime(order.orderedAt)}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="glass-panel rounded-3xl border border-white/10 p-5">
					<div>
						<p className="text-sm text-slate-400">Alerts</p>
						<h3 className="text-xl font-semibold text-white">Unread notifications</h3>
					</div>
					<div className="mt-4 grid gap-3">
						{recentAlerts.map((notification) => (
							<div key={notification.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
								<p className="text-sm text-white">{notification.message}</p>
								<p className="mt-2 text-xs text-slate-400">{formatRelativeTime(notification.createdAt)}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid gap-6 xl:grid-cols-2">
				<div className="glass-panel rounded-3xl border border-white/10 p-5">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="text-sm text-slate-400">Products</p>
							<h3 className="text-xl font-semibold text-white">Latest added products</h3>
						</div>
						<span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{compactNumber(recentProducts.length)} shown</span>
					</div>
					<div className="mt-4 grid gap-3">
						{recentProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>

				<div className="glass-panel rounded-3xl border border-white/10 p-5">
					<div>
						<p className="text-sm text-slate-400">Shops</p>
						<h3 className="text-xl font-semibold text-white">Registered shop records</h3>
					</div>
					<div className="mt-4 grid gap-3">
						{recentShops.map((shop) => (
							<div key={shop.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
								<p className="text-sm text-white">{shop.shopName}</p>
								<p className="mt-1 text-xs text-slate-400">{shop.category} • {shop.status}</p>
								<p className="mt-2 text-xs text-slate-400">Owner: {shop.ownerName || "-"} {shop.ownerEmail ? `(${shop.ownerEmail})` : ""}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminDashboard;
