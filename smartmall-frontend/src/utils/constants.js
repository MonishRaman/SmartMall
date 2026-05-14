import {
	FiBarChart2,
	FiBell,
	FiHome,
	FiInbox,
	FiPackage,
	FiShoppingBag,
	FiUsers,
} from "react-icons/fi";

export const roleNavLinks = {
	ADMIN: [
		{ to: "/admin", label: "Dashboard", icon: FiHome },
		{ to: "/admin/users", label: "Users", icon: FiUsers },
		{ to: "/admin/shops", label: "Shops", icon: FiShoppingBag },
		{ to: "/admin/analytics", label: "Analytics", icon: FiBarChart2 },
		{ to: "/admin/reports", label: "Reports", icon: FiInbox },
	],
	CUSTOMER: [
		{ to: "/customer", label: "Dashboard", icon: FiHome },
		{ to: "/customer/products", label: "Products", icon: FiShoppingBag },
		{ to: "/customer/cart", label: "Cart", icon: FiShoppingBag },
		{ to: "/customer/orders", label: "Orders", icon: FiPackage },
		{ to: "/customer/parking", label: "Parking", icon: FiBarChart2 },
		{ to: "/customer/complaints", label: "Complaints", icon: FiBell },
	],
	SHOP_OWNER: [
		{ to: "/shopowner", label: "Dashboard", icon: FiHome },
		{ to: "/shopowner/inventory", label: "Inventory", icon: FiPackage },
		{ to: "/shopowner/employees", label: "Employees", icon: FiUsers },
		{ to: "/shopowner/sales", label: "Sales", icon: FiBarChart2 },
	],
};

export const quickStats = [
	{ label: "Revenue", value: "₹12.8L", tone: "teal" },
	{ label: "Orders", value: "1,248", tone: "amber" },
	{ label: "Footfall", value: "38.4K", tone: "cyan" },
	{ label: "Notifications", value: "124", tone: "violet" },
];
