import { useEffect, useState } from "react";
import OrderTable from "../../components/orders/OrderTable";
import { useAuth } from "../../hooks/useAuth";
import orderService from "../../services/orderService";
import { compactNumber, sumBy } from "../../utils/dashboardData";
import { formatCurrency } from "../../utils/formatCurrency";

function Orders() {
	const { user } = useAuth();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (!user?.id) {
			return undefined;
		}

		orderService.list(user.id)
			.then(({ data }) => setOrders(data || []))
			.catch(() => undefined);
	}, [user?.id]);

	const totalSpent = sumBy(orders, (order) => order.totalAmount);

	return (
		<section className="space-y-6">
			<div className="glass-panel rounded-[2rem] border border-white/10 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 p-6">
				<p className="text-sm text-slate-400">Customer</p>
				<h1 className="text-3xl font-semibold text-white">Orders</h1>
				<p className="mt-2 text-sm text-slate-300">This table is backed by the live order history for the signed-in account.</p>
				<div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
					<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{compactNumber(orders.length)} orders</span>
					<span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{formatCurrency(totalSpent)} spent</span>
				</div>
			</div>
			<OrderTable orders={orders} />
		</section>
	);
}

export default Orders;
