import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const defaultData = [
	{ name: "Mon", revenue: 12000 },
	{ name: "Tue", revenue: 15000 },
	{ name: "Wed", revenue: 10000 },
	{ name: "Thu", revenue: 22000 },
	{ name: "Fri", revenue: 28000 },
	{ name: "Sat", revenue: 34000 },
	{ name: "Sun", revenue: 30000 },
];

function RevenueChart({ data = defaultData }) {
	return (
		<div className="glass-panel rounded-3xl border border-white/10 p-5">
			<div className="mb-4 flex items-center justify-between">
				<div>
					<p className="text-sm text-slate-400">Revenue</p>
					<h3 className="text-xl font-semibold text-white">Weekly trend</h3>
				</div>
			</div>
			<div className="h-72">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={data}>
						<defs>
							<linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.05} />
							</linearGradient>
						</defs>
						<CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
						<XAxis dataKey="name" stroke="#94a3b8" />
						<YAxis stroke="#94a3b8" />
						<Tooltip contentStyle={{ background: "#08111e", border: "1px solid rgba(255,255,255,0.1)" }} />
						<Area type="monotone" dataKey="revenue" stroke="#2dd4bf" fill="url(#revenueGradient)" strokeWidth={3} />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default RevenueChart;
