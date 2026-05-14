import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiBarChart2, FiLock, FiTruck } from "react-icons/fi";

function Home() {
	const features = [
		{ icon: FiLock, title: "Secure auth", text: "JWT-protected operations for every role." },
		{ icon: FiBarChart2, title: "Live analytics", text: "Revenue, occupancy, and footfall in one view." },
		{ icon: FiTruck, title: "Operational control", text: "Parking, orders, notifications, and QR flows." },
	];

	return (
		<div className="page-shell px-4 py-10 sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
				<motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
					<p className="text-xs uppercase tracking-[0.4em] text-teal-300/80">SmartMallX</p>
					<h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
						The mall operating system for retail, parking, payments, and customer engagement.
					</h1>
					<p className="max-w-2xl text-lg leading-8 text-slate-300">
						Run the mall like a modern platform: role-based dashboards, live metrics, smart notifications, and streamlined commerce flows.
					</p>

					<div className="flex flex-wrap gap-3">
						<Link to="/" className="inline-flex items-center gap-2 rounded-2xl bg-teal-400 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110">
							Login <FiArrowRight />
						</Link>
						<Link to="/register" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-teal-400/30 hover:bg-teal-400/10">
							Register
						</Link>
					</div>
				</motion.section>

				<motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel rounded-[2rem] border border-white/10 p-6">
					<div className="grid gap-4">
						{features.map((feature) => (
							<article key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
								<div className="flex items-center gap-3">
									<span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-200">
										<feature.icon />
									</span>
									<h2 className="text-xl font-semibold text-white">{feature.title}</h2>
								</div>
								<p className="mt-3 text-sm leading-6 text-slate-400">{feature.text}</p>
							</article>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
}

export default Home;
