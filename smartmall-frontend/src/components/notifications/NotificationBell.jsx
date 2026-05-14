import { FiBell } from "react-icons/fi";

function NotificationBell({ count = 0, onClick }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-teal-400/40 hover:bg-teal-400/10"
			aria-label="Notifications"
		>
			<FiBell />
			{count > 0 ? (
				<span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">
					{count}
				</span>
			) : null}
		</button>
	);
}

export default NotificationBell;
