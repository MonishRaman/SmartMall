import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import ShopOwnerLayout from "../layouts/ShopOwnerLayout";
import About from "../pages/About";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Analytics from "../pages/admin/Analytics";
import Reports from "../pages/admin/Reports";
import ManageShops from "../pages/admin/ManageShops";
import ManageUsers from "../pages/admin/ManageUsers";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Events from "../pages/Events";
import Offers from "../pages/Offers";
import NotFound from "../pages/NotFound";
import Cart from "../pages/customer/Cart";
import Complaints from "../pages/customer/Complaints";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import Orders from "../pages/customer/Orders";
import Parking from "../pages/customer/Parking";
import Products from "../pages/customer/Products";
import Inventory from "../pages/shopowner/Inventory";
import SalesAnalytics from "../pages/shopowner/SalesAnalytics";
import ShopDashboard from "../pages/shopowner/ShopDashboard";
import Employees from "../pages/shopowner/Employees";

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/offers" element={<Offers />} />
				<Route path="/events" element={<Events />} />

				<Route
					path="/admin"
					element={
						<ProtectedRoute roles={["ADMIN"]}>
							<AdminLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<AdminDashboard />} />
					<Route path="users" element={<ManageUsers />} />
					<Route path="shops" element={<ManageShops />} />
					<Route path="analytics" element={<Analytics />} />
					<Route path="reports" element={<Reports />} />
				</Route>

				<Route
					path="/customer"
					element={
						<ProtectedRoute roles={["CUSTOMER", "ADMIN"]}>
							<CustomerLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<CustomerDashboard />} />
					<Route path="products" element={<Products />} />
					<Route path="cart" element={<Cart />} />
					<Route path="orders" element={<Orders />} />
					<Route path="parking" element={<Parking />} />
					<Route path="complaints" element={<Complaints />} />
				</Route>

				<Route
					path="/shopowner"
					element={
						<ProtectedRoute roles={["SHOP_OWNER", "ADMIN"]}>
							<ShopOwnerLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<ShopDashboard />} />
					<Route path="inventory" element={<Inventory />} />
					<Route path="employees" element={<Employees />} />
					<Route path="sales" element={<SalesAnalytics />} />
				</Route>

				<Route
					path="/shopkeeper"
					element={
						<ProtectedRoute roles={["SHOP_OWNER", "ADMIN"]}>
							<ShopOwnerLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<ShopDashboard />} />
					<Route path="inventory" element={<Inventory />} />
					<Route path="employees" element={<Employees />} />
					<Route path="sales" element={<SalesAnalytics />} />
				</Route>

				<Route path="/dashboard" element={<Navigate to="/admin" replace />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
