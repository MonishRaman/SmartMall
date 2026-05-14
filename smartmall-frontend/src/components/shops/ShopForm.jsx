import { useEffect, useState } from "react";

const initialState = {
	shopName: "",
	category: "",
	floorNumber: "",
	monthlyRent: "",
	status: "ACTIVE",
};

function ShopForm({ initialValue = initialState, onSubmit, submitLabel = "Save Shop" }) {
	const [form, setForm] = useState(initialValue);

	useEffect(() => {
		setForm(initialValue);
	}, [initialValue]);

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit?.({
			...form,
			floorNumber: form.floorNumber === "" ? null : Number(form.floorNumber),
			monthlyRent: form.monthlyRent === "" ? null : Number(form.monthlyRent),
		});
	};

	return (
		<form onSubmit={handleSubmit} className="glass-panel rounded-3xl border border-white/10 p-5">
			<div className="grid gap-4 md:grid-cols-2">
				{[
					["shopName", "Shop Name"],
					["category", "Category"],
					["floorNumber", "Floor Number"],
					["monthlyRent", "Monthly Rent"],
				].map(([key, label]) => (
					<label key={key} className="grid gap-2 text-sm text-slate-300">
						<span>{label}</span>
						<input
							value={form[key]}
							onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
							className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400/50"
							placeholder={label}
						/>
					</label>
				))}

				<label className="grid gap-2 text-sm text-slate-300 md:col-span-2">
					<span>Status</span>
					<select
						value={form.status}
						onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
						className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-teal-400/50"
					>
						<option value="ACTIVE">ACTIVE</option>
						<option value="INACTIVE">INACTIVE</option>
						<option value="RENOVATION">RENOVATION</option>
					</select>
				</label>
			</div>

			<button
				type="submit"
				className="mt-5 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110"
			>
				{submitLabel}
			</button>
		</form>
	);
}

export default ShopForm;
