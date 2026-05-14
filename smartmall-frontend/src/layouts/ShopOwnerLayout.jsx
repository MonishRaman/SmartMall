import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

function ShopOwnerLayout() {
	return (
		<div className="page-shell flex min-h-screen text-white">
			<Sidebar role="SHOP_OWNER" />
			<div className="flex min-h-screen flex-1 flex-col">
				<Navbar title="Shop Owner Console" />
				<main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	);
}

export default ShopOwnerLayout;
