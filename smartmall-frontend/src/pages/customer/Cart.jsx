import { useEffect, useState } from "react";
import Invoice from "../../components/orders/Invoice";
import { formatCurrency } from "../../utils/formatCurrency";
import { useAuth } from "../../hooks/useAuth";
import cartService from "../../services/cartService";
import orderService from "../../services/orderService";

function Cart() {
	const { user } = useAuth();
	const [cart, setCart] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

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

	const refreshCart = async () => {
		if (!user?.id) return;
		try {
			const { data } = await cartService.list(user.id);
			setCart(Array.isArray(data) ? data[0] : null);
		} catch {
			// ignore refresh errors
		}
	};

	const handleQuantityUpdate = async (itemId, quantity) => {
		setError("");
		setSuccess("");
		try {
			await cartService.updateItem(itemId, quantity);
			setSuccess("Cart updated successfully.");
			await refreshCart();
		} catch (updateError) {
			setError(updateError?.response?.data?.message || "Unable to update cart item.");
		}
	};

	const handleRemoveItem = async (itemId) => {
		setError("");
		setSuccess("");
		try {
			await cartService.removeItem(itemId);
			setSuccess("Item removed from cart.");
			await refreshCart();
		} catch (removeError) {
			setError(removeError?.response?.data?.message || "Unable to remove cart item.");
		}
	};

	const handleCheckout = async () => {
		if (!cart?.items?.length) {
			setError("Add items to cart before checkout.");
			return;
		}
		setError("");
		setSuccess("");
		try {
			const payload = {
				userId: user.id,
				productQuantities: cart.items.reduce((map, item) => {
					map[item.product.id] = item.quantity;
					return map;
				}, {}),
			};
			const { data } = await orderService.create(payload);
			setSuccess(`Order #${data.id} created.`);
			await cartService.clearCart(user.id);
			await refreshCart();
		} catch (checkoutError) {
			setError(checkoutError?.response?.data?.message || "Unable to place order.");
		}
	};

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
			{success ? <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</p> : null}
			{loading ? <p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">Loading cart...</p> : null}

			{cart && cart.items?.length ? (
				<div className="space-y-4">
					<div className="grid gap-4">
						{cart.items.map((item) => (
							<div key={item.id} className="glass-panel rounded-3xl border border-white/10 p-4">
								<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
									<div>
										<p className="text-sm text-slate-400">{item.product?.name}</p>
										<p className="text-base font-semibold text-white">{item.product?.description}</p>
										<p className="text-sm text-slate-500">Unit: {item.product?.price}</p>
									</div>
									<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
										<label className="flex items-center gap-2 text-sm text-slate-300">
											<span>Qty</span>
											<input
												type="number"
												min="1"
												value={item.quantity}
												onChange={(e) => handleQuantityUpdate(item.id, Number(e.target.value))}
												className="w-20 rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
											/>
										</label>
										<button
											onClick={() => handleRemoveItem(item.id)}
											className="rounded-2xl bg-rose-500/10 px-4 py-2 text-sm text-rose-200 hover:bg-rose-500/20"
										>
											Remove
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-300 lg:flex-row lg:items-center lg:justify-between">
						<div>
							<p className="font-semibold text-white">Cart total</p>
							<p>{formatCurrency(invoice.totalAmount)}</p>
					</div>
						<button
							onClick={handleCheckout}
							className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
						>
							Checkout now
						</button>
					</div>
					{invoice ? <Invoice order={invoice} /> : null}
				</div>
			) : !loading ? (
				<div className="glass-panel rounded-3xl border border-white/10 p-6 text-sm text-slate-300">
					No items are currently in your cart.
				</div>
			) : null}
		</section>
	);
}

export default Cart;
