import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const defaultData = [
	{ name: "Mon", visitors: 3200 },
	{ name: "Tue", visitors: 2900 },
	{ name: "Wed", visitors: 4100 },
	{ name: "Thu", visitors: 3800 },
	{ name: "Fri", visitors: 5100 },
	{ name: "Sat", visitors: 6200 },
	{ name: "Sun", visitors: 5400 },
];

function VisitorChart({ data = defaultData }) {
	return (
		<div className="glass-panel rounded-3xl border border-white/10 p-5">
			<p className="text-sm text-slate-400">Visitors</p>
			<h3 className="text-xl font-semibold text-white">Footfall by day</h3>
			<div className="mt-4 h-72">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data}>
						<CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
						<XAxis dataKey="name" stroke="#94a3b8" />
						<YAxis stroke="#94a3b8" />
						<Tooltip contentStyle={{ background: "#08111e", border: "1px solid rgba(255,255,255,0.1)" }} />
						<Bar dataKey="visitors" radius={[12, 12, 0, 0]} fill="#f59e0b" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default VisitorChart;
