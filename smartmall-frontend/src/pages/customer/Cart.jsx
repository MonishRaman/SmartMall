import { useEffect, useState } from "react";
import Invoice from "../../components/orders/Invoice";
import { useAuth } from "../../hooks/useAuth";
import cartService from "../../services/cartService";

function Cart() {
	const { user } = useAuth();
	const [cart, setCart] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const userId = user?.id;
		if (!userId) {
			setLoading(false);
			return undefined;
		}

		let isMounted = true;

		const loadCart = async () => {
			setLoading(true);
			setError("");

			try {
				const { data } = await cartService.list(userId);
				const activeCart = Array.isArray(data) ? data[0] : null;
				if (!isMounted) {
					return;
				}

				setCart(activeCart || null);
			} catch (loadError) {
				if (isMounted) {
					setError(loadError?.response?.data?.message || "Unable to load cart");
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		loadCart();
		const timer = window.setInterval(loadCart, 20000);

		return () => {
			isMounted = false;
			window.clearInterval(timer);
		};
	}, [user?.id]);

	const invoice = cart
		? {
			id: cart.id,
			status: cart.items?.length ? "Active" : "Empty",
			totalAmount: (cart.items || []).reduce((total, item) => total + Number(item.product?.price || 0) * Number(item.quantity || 0), 0),
			items: (cart.items || []).map((item) => ({
				id: item.id,
				product: item.product,
				quantity: item.quantity,
				unitPrice: item.product?.price || 0,
			})),
		}
		: null;

	return (
		<section className="space-y-6">
			<div>
				<p className="text-sm text-slate-400">Customer</p>
				<h1 className="text-3xl font-semibold text-white">Cart</h1>
				<p className="mt-2 text-sm text-slate-400">Your live cart is refreshed from the backend every 20 seconds.</p>
			</div>

			{error ? <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p> : null}
			{loading ? <p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">Loading cart...</p> : null}
			{invoice ? <Invoice order={invoice} /> : null}
			{!loading && !invoice ? (
				<div className="glass-panel rounded-3xl border border-white/10 p-6 text-sm text-slate-300">
					No items are currently in your cart.
				</div>
			) : null}
		</section>
	);
}

export default Cart;
