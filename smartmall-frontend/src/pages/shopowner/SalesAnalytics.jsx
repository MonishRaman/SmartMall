import { useEffect, useState } from "react";
import AnalyticsWidget from "../../components/dashboard/AnalyticsWidget";
import RevenueChart from "../../components/dashboard/RevenueChart";
import VisitorChart from "../../components/dashboard/VisitorChart";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";
import parkingService from "../../services/parkingService";
import { buildWeeklySeries, compactNumber, percent, sumBy } from "../../utils/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

function SalesAnalytics() {
	const [orders, setOrders] = useState([]);
	const [payments, setPayments] = useState([]);
	const [parkingSlots, setParkingSlots] = useState([]);

	useEffect(() => {
		Promise.all([orderService.list(), paymentService.list(), parkingService.listSlots()])
			.then(([ordersResponse, paymentsResponse, parkingResponse]) => {
				setOrders(ordersResponse.data || []);
				setPayments(paymentsResponse.data || []);
				setParkingSlots(parkingResponse.data || []);
			})
			.catch(() => undefined);
	}, []);

	const revenue = sumBy(payments, (payment) => payment.amount);
	const deliveredOrders = orders.filter((order) => String(order.status || "").toUpperCase() === "DELIVERED").length;
	const revenueSeries = buildWeeklySeries(payments, "paidAt", (payment) => payment.amount, "revenue");
	const orderSeries = buildWeeklySeries(orders, "orderedAt", () => 1, "visitors");
	const occupancy = percent(parkingSlots.filter((slot) => slot.occupied).length, parkingSlots.length);

	return (
		<section className="space-y-6">
			<div>
				<p className="text-sm text-slate-400">Shop Owner</p>
				<h1 className="text-3xl font-semibold text-white">Sales Analytics</h1>
				<p className="mt-2 max-w-3xl text-sm text-slate-400">This panel now reads the same order, payment, and parking records used by the rest of the app.</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				{[
					{ label: "Revenue", value: formatCurrency(revenue), description: "Live payment total" },
					{ label: "Orders", value: compactNumber(orders.length), description: "Database-backed order count" },
					{ label: "Delivered", value: percent(deliveredOrders, orders.length), description: "Fulfilled order share" },
					{ label: "Parking", value: occupancy, description: "Current utilization" },
				].map((item) => (
					<div key={item.label} className="glass-panel rounded-3xl border border-white/10 p-5">
						<p className="text-sm text-slate-400">{item.label}</p>
						<h3 className="mt-3 text-2xl font-semibold text-white">{item.value}</h3>
						<p className="mt-2 text-sm text-slate-400">{item.description}</p>
					</div>
				))}
			</div>

			<div className="grid gap-6 xl:grid-cols-2">
				<RevenueChart data={revenueSeries} />
				<VisitorChart data={orderSeries} />
			</div>

			<AnalyticsWidget
				items={[
					{ label: "Average order value", value: formatCurrency(orders.length ? revenue / orders.length : 0), description: "Based on live orders and payments" },
					{ label: "Completed orders", value: compactNumber(deliveredOrders), description: "Orders marked as delivered" },
					{ label: "Captured revenue", value: formatCurrency(revenue), description: "All payment records in the database" },
					{ label: "Parking load", value: occupancy, description: "Operational pressure around the mall" },
				]}
			/>
		</section>
	);
}

export default SalesAnalytics;
