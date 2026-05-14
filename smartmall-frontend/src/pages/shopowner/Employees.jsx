function Employees() {
	const employees = [
		{ id: 1, name: "Riya Singh", role: "Store Manager" },
		{ id: 2, name: "Vikram Patel", role: "Sales Associate" },
	];

	return (
		<section className="space-y-6">
			<div>
				<p className="text-sm text-slate-400">Shop Owner</p>
				<h1 className="text-3xl font-semibold text-white">Employees</h1>
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				{employees.map((employee) => (
					<article key={employee.id} className="glass-panel rounded-3xl border border-white/10 p-5">
						<h3 className="text-xl font-semibold text-white">{employee.name}</h3>
						<p className="mt-2 text-sm text-slate-400">{employee.role}</p>
					</article>
				))}
			</div>
		</section>
	);
}

export default Employees;
