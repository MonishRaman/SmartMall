import { useEffect, useState } from "react";
import notificationService from "../../services/notificationService";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";
import parkingService from "../../services/parkingService";
import { compactNumber, percent, sumBy } from "../../utils/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

function Reports() {
	const [orders, setOrders] = useState([]);
	const [payments, setPayments] = useState([]);
	const [parkingSlots, setParkingSlots] = useState([]);
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		Promise.all([orderService.list(), paymentService.list(), parkingService.listSlots(), notificationService.list()])
			.then(([ordersResponse, paymentsResponse, parkingResponse, notificationResponse]) => {
				setOrders(ordersResponse.data || []);
				setPayments(paymentsResponse.data || []);
				setParkingSlots(parkingResponse.data || []);
				setNotifications(notificationResponse.data || []);
			})
			.catch(() => undefined);
	}, []);

	const revenue = sumBy(payments, (payment) => payment.amount);
	const occupiedSlots = parkingSlots.filter((slot) => slot.occupied).length;
	const deliveredOrders = orders.filter((order) => String(order.status || "").toUpperCase() === "DELIVERED").length;
	const reports = [
		{ title: "Gross sales", value: formatCurrency(revenue), note: `${compactNumber(payments.length)} payments recorded` },
		{ title: "Parking utilization", value: percent(occupiedSlots, parkingSlots.length), note: `${occupiedSlots} slots occupied right now` },
		{ title: "Fulfillment", value: percent(deliveredOrders, orders.length), note: "Delivered orders compared with total orders" },
		{ title: "Open alerts", value: compactNumber(notifications.filter((notification) => !notification.isRead).length), note: "Unread notifications requiring attention" },
		{ title: "Average order value", value: formatCurrency(orders.length ? revenue / orders.length : 0), note: "Real value derived from stored orders" },
		{ title: "Database rows", value: compactNumber(orders.length + payments.length + parkingSlots.length + notifications.length), note: "Live operational records shown across the app" },
	];

	return (
		<section className="space-y-6">
			<div>
				<p className="text-sm text-slate-400">Administration</p>
				<h1 className="text-3xl font-semibold text-white">Reports</h1>
				<p className="mt-2 max-w-3xl text-sm text-slate-400">These report cards are computed from the current database contents rather than hardcoded demo numbers.</p>
			</div>
			<div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
				{reports.map((report) => (
					<article key={report.title} className="glass-panel rounded-3xl border border-white/10 p-5">
						<p className="text-sm text-slate-400">{report.title}</p>
						<h3 className="mt-2 text-2xl font-semibold text-white">{report.value}</h3>
						<p className="mt-2 text-sm text-slate-400">{report.note}</p>
					</article>
				))}
			</div>
		</section>
	);
}

export default Reports;
