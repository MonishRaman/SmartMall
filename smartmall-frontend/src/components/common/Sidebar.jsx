import { NavLink } from "react-router-dom";
import { roleNavLinks } from "../../utils/constants";
import { useAuth } from "../../hooks/useAuth";
import { normalizeRole } from "../../utils/roleUtils";

function Sidebar({ role }) {
	const { user } = useAuth();
	const resolvedRole = normalizeRole(role || user?.role || "ADMIN");
	const navLinks = roleNavLinks[resolvedRole] || roleNavLinks.ADMIN;
	const panelLabel = resolvedRole === "SHOP_OWNER" ? "Shop Keeper / Owner" : resolvedRole;

	return (
		<aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl lg:block">
			<div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20">
				<div className="mb-6">
					<p className="text-xs uppercase tracking-[0.35em] text-teal-300/80">SmartMallX</p>
					<h2 className="mt-2 text-2xl font-semibold text-white">{panelLabel} panel</h2>
				</div>

				<nav className="space-y-2">
					{navLinks.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) =>
								[
									"flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
									isActive
										? "bg-teal-400/15 text-teal-200 ring-1 ring-teal-400/20"
										: "text-slate-300 hover:bg-white/5 hover:text-white",
								].join(" ")
							}
						>
							<span className="text-lg"><item.icon /></span>
							{item.label}
						</NavLink>
					))}
				</nav>
			</div>
		</aside>
	);
}

export default Sidebar;
