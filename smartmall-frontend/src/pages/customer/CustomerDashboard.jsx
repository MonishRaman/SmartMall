import { useEffect, useState } from "react";
import { FiBell, FiShoppingBag, FiStar, FiTruck } from "react-icons/fi";
import DashboardCard from "../../components/dashboard/DashboardCard";
import NotificationList from "../../components/notifications/NotificationList";
import OrderCard from "../../components/orders/OrderCard";
import ProductCard from "../../components/products/ProductCard";
import { useAuth } from "../../hooks/useAuth";
import notificationService from "../../services/notificationService";
import orderService from "../../services/orderService";
import parkingService from "../../services/parkingService";
import productService from "../../services/productService";
import { compactNumber, formatRelativeTime, sortByDateDesc, sumBy } from "../../utils/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

function CustomerDashboard() {
	const { user } = useAuth();
	const [orders, setOrders] = useState([]);
	const [notifications, setNotifications] = useState([]);
	const [parkingSlots, setParkingSlots] = useState([]);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const userId = user?.id;
		if (!userId) {
			return undefined;
		}

		Promise.all([orderService.list(userId), notificationService.list(userId), parkingService.listSlots(), productService.list()])
			.then(([ordersResponse, notificationsResponse, parkingResponse, productsResponse]) => {
				setOrders(ordersResponse.data || []);
				setNotifications(notificationsResponse.data || []);
				setParkingSlots(parkingResponse.data || []);
				setProducts(productsResponse.data || []);
			})
			.catch(() => undefined);
		const timer = window.setInterval(() => {
			Promise.all([orderService.list(userId), notificationService.list(userId), parkingService.listSlots(), productService.list()])
				.then(([ordersResponse, notificationsResponse, parkingResponse, productsResponse]) => {
					setOrders(ordersResponse.data || []);
					setNotifications(notificationsResponse.data || []);
					setParkingSlots(parkingResponse.data || []);
					setProducts(productsResponse.data || []);
				})
				.catch(() => undefined);
		}, 20000);

		return () => window.clearInterval(timer);
	}, [user?.id]);

	const totalSpent = sumBy(orders, (order) => order.totalAmount);
	const rewardPoints = Math.round(totalSpent / 20);
	const availableSlots = parkingSlots.filter((slot) => !slot.occupied).length;
	const unreadNotifications = notifications.filter((notification) => !notification.isRead).length;
	const recentOrder = sortByDateDesc(orders, "orderedAt")[0];
	const featuredProducts = sortByDateDesc(products, "createdAt").slice(0, 4);

	return (
		<div className="space-y-6">
			<section className="glass-panel rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-violet-500/10 p-6">
				<div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
					<div>
						<p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Customer view</p>
						<h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Welcome back{user?.name ? `, ${user.name}` : ""}</h1>
						<p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
							Your orders, parking availability, and notifications are now loaded from the live database, so the dashboard reflects what is actually happening right now.
						</p>
						{recentOrder ? (
							<p className="mt-4 text-sm text-slate-300">
								Latest order #{recentOrder.id} for {formatCurrency(recentOrder.totalAmount || 0)} was placed {formatRelativeTime(recentOrder.orderedAt)}.
							</p>
						) : null}
					</div>
					<div className="grid gap-3 sm:grid-cols-2">
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Orders</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{compactNumber(orders.length)}</h3>
							<p className="mt-2 text-sm text-slate-400">This account's live order history</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Rewards</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{compactNumber(rewardPoints)}</h3>
							<p className="mt-2 text-sm text-slate-400">Estimated from order spend</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Parking</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{availableSlots} open</h3>
							<p className="mt-2 text-sm text-slate-400">Current slots available in the mall</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4">
							<p className="text-sm text-slate-400">Alerts</p>
							<h3 className="mt-2 text-2xl font-semibold text-white">{compactNumber(unreadNotifications)}</h3>
							<p className="mt-2 text-sm text-slate-400">Unread notifications in your inbox</p>
						</div>
					</div>
				</div>
			</section>

			<section className="grid gap-4 md:grid-cols-4">
				<DashboardCard title="Orders" value={compactNumber(orders.length)} subtitle="Live from the database" icon={FiShoppingBag} accent="teal" />
				<DashboardCard title="Rewards" value={compactNumber(rewardPoints)} subtitle="Estimated loyalty points" icon={FiStar} accent="amber" />
				<DashboardCard title="Parking" value={availableSlots > 0 ? `${availableSlots} open` : "Full"} subtitle="Available slots now" icon={FiTruck} accent="cyan" />
				<DashboardCard title="Alerts" value={compactNumber(unreadNotifications)} subtitle="Unread notifications" icon={FiBell} accent="violet" />
			</section>

			<section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
				<div className="space-y-4">
					{sortByDateDesc(orders, "orderedAt").map((order) => (
						<OrderCard key={order.id} order={order} />
					))}
				</div>
				<NotificationList
					notifications={notifications}
					onMarkRead={async (notification) => {
						await notificationService.markRead(notification.id);
						setNotifications((current) => current.map((item) => (item.id === notification.id ? { ...item, isRead: true } : item)));
					}}
				/>
			</section>

			<section className="space-y-4">
				<div>
					<p className="text-sm text-slate-400">Live products</p>
					<h3 className="text-2xl font-semibold text-white">What is currently available in the mall</h3>
				</div>
				<div className="grid gap-4 lg:grid-cols-2">
					{featuredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</section>
		</div>
	);
}

export default CustomerDashboard;
