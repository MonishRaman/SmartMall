function NotificationList({ notifications = [], onMarkRead }) {
	return (
		<div className="glass-panel rounded-3xl border border-white/10 p-5">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-slate-400">Notifications</p>
					<h3 className="text-xl font-semibold text-white">Recent activity</h3>
				</div>
			</div>

			<div className="mt-4 space-y-3">
				{notifications.map((notification) => (
					<div
						key={notification.id}
						className={`rounded-2xl border px-4 py-3 ${notification.isRead ? "border-white/10 bg-white/5" : "border-teal-400/30 bg-teal-400/10"}`}
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm text-white">{notification.message}</p>
								<p className="mt-1 text-xs text-slate-400">{notification.createdAt || "Just now"}</p>
							</div>
							{!notification.isRead ? (
								<button
									type="button"
									onClick={() => onMarkRead?.(notification)}
									className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200"
								>
									Mark read
								</button>
							) : null}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default NotificationList;
