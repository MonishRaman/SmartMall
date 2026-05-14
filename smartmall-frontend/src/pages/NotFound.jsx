import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className="page-shell flex min-h-screen items-center justify-center px-4 py-10 text-center">
			<div className="glass-panel max-w-xl rounded-[2rem] border border-white/10 p-10">
				<p className="text-xs uppercase tracking-[0.4em] text-red-300/80">404</p>
				<h1 className="mt-3 text-4xl font-semibold text-white">Page not found</h1>
				<p className="mt-4 text-slate-400">The page you are looking for does not exist or has moved.</p>
				<Link to="/" className="mt-6 inline-flex rounded-2xl bg-teal-400 px-5 py-3 font-semibold text-slate-950">
					Go home
				</Link>
			</div>
		</div>
	);
}

export default NotFound;
