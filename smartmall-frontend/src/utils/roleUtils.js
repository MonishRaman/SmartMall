export function normalizeRole(role) {
  const value = String(role || "").trim().toUpperCase().replace(/\s+/g, "_");

  if (value === "SHOPKEEPER" || value === "SHOP_OWNER" || value === "SHOP-OWNER") {
    return "SHOP_OWNER";
  }

  if (value === "CUSTOMER" || value === "USER") {
    return "CUSTOMER";
  }

  if (value === "ADMIN") {
    return "ADMIN";
  }

  return value;
}

export function getDashboardRoute(role) {
  const normalizedRole = normalizeRole(role);

  switch (normalizedRole) {
    case "ADMIN":
      return "/admin";
    case "CUSTOMER":
      return "/customer";
    case "SHOP_OWNER":
      return "/shopkeeper";
    default:
      return "/";
  }
}