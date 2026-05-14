import { useEffect, useState } from "react";
import AnalyticsWidget from "../../components/dashboard/AnalyticsWidget";
import DashboardCard from "../../components/dashboard/DashboardCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import VisitorChart from "../../components/dashboard/VisitorChart";
import analyticsService from "../../services/analyticsService";
import notificationService from "../../services/notificationService";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";
import parkingService from "../../services/parkingService";
import { buildWeeklySeries, compactNumber, percent, sumBy } from "../../utils/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

function Analytics() {
	const [overview, setOverview] = useState({ users: 0, shops: 0, products: 0, orders: 0 });
	const [orders, setOrders] = useState([]);
	const [payments, setPayments] = useState([]);
	const [parkingSlots, setParkingSlots] = useState([]);
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		Promise.all([
			analyticsService.overview(),
			orderService.list(),
			paymentService.list(),
			parkingService.listSlots(),
			notificationService.list(),
		])
			.then(([overviewResponse, ordersResponse, paymentsResponse, parkingResponse, notificationResponse]) => {
				setOverview(overviewResponse.data || {});
				setOrders(ordersResponse.data || []);
				setPayments(paymentsResponse.data || []);
				setParkingSlots(parkingResponse.data || []);
				setNotifications(notificationResponse.data || []);
			})
			.catch(() => undefined);
	}, []);

	const revenue = sumBy(payments, (payment) => payment.amount);
	const occupiedSlots = parkingSlots.filter((slot) => slot.occupied).length;
	const overviewCards = [
		{ title: "Users", value: compactNumber(overview.users), subtitle: "People in the system" },
		{ title: "Shops", value: compactNumber(overview.shops), subtitle: "Active shop listings" },
		{ title: "Products", value: compactNumber(overview.products), subtitle: "Catalog items available" },
		{ title: "Orders", value: compactNumber(overview.orders), subtitle: "Recorded transactions" },
	];

	const revenueSeries = buildWeeklySeries(payments, "paidAt", (payment) => payment.amount, "revenue");
	const visitorSeries = buildWeeklySeries(orders, "orderedAt", () => 1, "visitors");

	return (
		<section className="space-y-6">
			<div>
				<p className="text-sm text-slate-400">Administration</p>
				<h1 className="text-3xl font-semibold text-white">Analytics</h1>
				<p className="mt-2 max-w-3xl text-sm text-slate-400">These charts are driven by the live database, so the admin view matches the current operational state of the mall.</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				{overviewCards.map((card) => (
					<DashboardCard key={card.title} title={card.title} value={card.value} subtitle={card.subtitle} />
				))}
			</div>

			<div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
				<RevenueChart data={revenueSeries} />
				<AnalyticsWidget
					items={[
						{ label: "Revenue", value: formatCurrency(revenue), description: "Payments collected from orders" },
						{ label: "Unread alerts", value: compactNumber(notifications.filter((notification) => !notification.isRead).length), description: "Live notifications from the database" },
						{ label: "Occupancy", value: percent(occupiedSlots, parkingSlots.length), description: "Current parking utilization" },
						{ label: "Traffic", value: compactNumber(orders.length), description: "Order activity across the week" },
					]}
				/>
			</div>

			<VisitorChart data={visitorSeries} />
		</section>
	);
}

export default Analytics;
