import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

function AdminLayout() {
	return (
		<div className="page-shell flex min-h-screen text-white">
			<Sidebar role="ADMIN" />
			<div className="flex min-h-screen flex-1 flex-col">
				<Navbar title="Admin Dashboard" />
				<main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	);
}

export default AdminLayout;
