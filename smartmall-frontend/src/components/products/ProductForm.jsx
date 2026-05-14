import { useEffect, useState } from "react";

const initialState = {
	name: "",
	description: "",
	category: "FOOD",
	price: "",
	stockQuantity: "",
	shopId: "",
};

function ProductForm({ initialValue = initialState, onSubmit, submitLabel = "Save Product" }) {
	const [form, setForm] = useState(initialValue);

	useEffect(() => {
		setForm(initialValue);
	}, [initialValue]);

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit?.({
			...form,
			price: form.price === "" ? null : Number(form.price),
			stockQuantity: form.stockQuantity === "" ? null : Number(form.stockQuantity),
			shopId: form.shopId === "" ? null : Number(form.shopId),
		});
	};

	return (
		<form onSubmit={handleSubmit} className="glass-panel rounded-3xl border border-white/10 p-5">
			<div className="grid gap-4 md:grid-cols-2">
				{[
					["name", "Name"],
					["description", "Description"],
					["price", "Price"],
					["stockQuantity", "Stock Quantity"],
					["shopId", "Shop ID"],
				].map(([key, label]) => (
					<label key={key} className={`grid gap-2 text-sm text-slate-300 ${key === "description" ? "md:col-span-2" : ""}`}>
						<span>{label}</span>
						<input
							value={form[key]}
							onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
							className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/50"
							placeholder={label}
						/>
					</label>
				))}

				<label className="grid gap-2 text-sm text-slate-300 md:col-span-2">
					<span>Category</span>
					<select
						value={form.category}
						onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
						className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-400/50"
					>
						<option value="FOOD">FOOD</option>
						<option value="FASHION">FASHION</option>
						<option value="ELECTRONICS">ELECTRONICS</option>
						<option value="GROCERY">GROCERY</option>
						<option value="SERVICES">SERVICES</option>
						<option value="OTHER">OTHER</option>
					</select>
				</label>
			</div>

			<button
				type="submit"
				className="mt-5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110"
			>
				{submitLabel}
			</button>
		</form>
	);
}

export default ProductForm;
