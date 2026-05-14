# SmartMall Platform

A full-stack e-commerce and parking management system built with **Spring Boot** (backend) and **React** (frontend).

## 📋 Project Overview

SmartMall is a comprehensive platform that enables:
- **Admin Dashboard**: System overview, analytics, reports, and user/shop management
- **Customer Portal**: Browse products, manage orders, track parking slots, receive notifications
- **Shop Owner Dashboard**: Manage inventory, view sales analytics, track orders and payments
- **Parking Management**: Real-time slot occupancy tracking and management

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.5.14
- **Language**: Java 21
- **ORM**: JPA (Hibernate)
- **Security**: Spring Security with JWT authentication
- **Build Tool**: Maven

### Frontend
- **Framework**: React 19.2.6
- **Build Tool**: Vite 8.0.12
- **Styling**: TailwindCSS 3.4.19
- **State Management**: Context API (React Router 7.15.0)
- **Data Visualization**: Recharts 3.8.1
- **HTTP Client**: Axios 1.16.0
- **UI Components**: React Icons 5.6.0, Framer Motion 12.38.0

## 📁 Project Structure

```
smartmall-backend/
├── smartmall-frontend/          # React application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components (admin, customer, shop-owner)
│   │   ├── services/            # API service modules
│   │   ├── context/             # React context (Auth, Theme)
│   │   ├── hooks/               # Custom hooks (useAuth, useFetch)
│   │   ├── layouts/             # Page layouts
│   │   ├── utils/               # Utility functions and helpers
│   │   └── App.jsx
│   └── package.json
│
└── smartmall-backend/           # Spring Boot application
    ├── src/
    │   ├── main/java/com/smartmall/
    │   │   ├── controller/      # REST endpoints
    │   │   ├── service/         # Business logic
    │   │   ├── entity/          # JPA entities
    │   │   ├── repository/      # Data access
    │   │   └── config/          # Configuration classes
    │   └── resources/
    │       └── application.properties
    └── pom.xml
```

## 🚀 Getting Started

### Prerequisites
- Java 21 or higher
- Node.js 16+ (with npm)
- Maven (or use Maven wrapper: `./mvnw`)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd smartmall-backend/smartmall-backend
   ```

2. Compile and build:
   ```bash
   ./mvnw clean compile
   ```

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will start on `http://localhost:8080` (or your configured port).

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd smartmall-backend/smartmall-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Development server:
   ```bash
   npm run dev
   ```

4. Production build:
   ```bash
   npm run build
   ```

The frontend will start on `http://localhost:5173` (or configured Vite port).

## 📊 Key Features

### Dashboard Pages

#### Admin Dashboard
- System overview with live metrics (users, shops, products, orders)
- Revenue analytics and charts
- Recent orders and alerts
- Real-time data from `/api/dashboard`, `/api/orders`, `/api/payments`, `/api/notifications`

#### Customer Dashboard
- Personalized greeting and order summary
- Recent orders (user-scoped)
- Reward points calculation
- Parking slot availability
- Notification management

#### Shop Owner Dashboard
- Product and sales overview
- Revenue trends and charts
- Visitor analytics
- Inventory management with full CRUD operations
- Sales analytics with weekly breakdowns

### Management Pages

#### Manage Users
- View all system users with role breakdown
- Display user counts by role (Admin, Customer, Shop Owner)

#### Manage Shops
- Create, read, update, delete shops
- Shop summary statistics
- Monthly rent calculations

#### Inventory Management
- Full CRUD operations on products
- Low stock indicators
- Inventory value calculations
- Real-time backend persistence

## 🔄 Recent Updates

### Live Backend Data Integration (May 2026)

All dashboard and management pages have been updated to pull live data from the backend instead of using hardcoded demo data:

#### Modified Pages (14 pages)
- **Admin**: AdminDashboard, Analytics, Reports, ManageUsers, ManageShops
- **Customer**: CustomerDashboard, Orders, Parking, Notifications
- **Shop Owner**: ShopDashboard, Inventory, SalesAnalytics

#### New Services & Utilities
- **userService.js**: User CRUD operations
- **dashboardData.js**: Reusable utility functions:
  - `compactNumber()`: Format numbers (K, M notation)
  - `sumBy()`, `averageBy()`: Array aggregation
  - `percent()`: Percentage calculations
  - `buildWeeklySeries()`: Weekly aggregation for charts
  - `sortByDateDesc()`: Date-based sorting
  - `formatRelativeTime()`: Human-readable timestamps

#### Backend Changes
- User entity: Password field now excluded from API responses (`@JsonProperty(access = WRITE_ONLY)`)
- All existing endpoints leverage live database records

### Data Flow Pattern

```javascript
useEffect(() => {
  Promise.all([
    orderService.list(userId),
    notificationService.list(userId),
    parkingService.listSlots()
  ])
  .then(([orders, notifications, slots]) => {
    setOrders(orders.data || []);
    setNotifications(notifications.data || []);
    setSlots(slots.data || []);
  })
  .catch(() => undefined);
}, [userId]);

// Derive computed metrics from live data
const totalSpent = sumBy(orders, o => o.amount);
const unreadCount = notifications.filter(n => !n.read).length;
```

## 🔐 Authentication

- **Method**: JWT tokens stored in localStorage
- **Format**: `{ id, name, email, role, token }`
- **Roles**: ADMIN, CUSTOMER, SHOP_OWNER
- **Protection**: ProtectedRoute component restricts access by role
- **Interceptor**: Axios automatically attaches Authorization header

## 📡 API Endpoints

### Orders
- `GET /api/orders` - List all orders (or user-scoped with `?userId`)
- `GET /api/orders/{id}` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}` - Update order

### Products
- `GET /api/products` - List products (or shop-scoped with `?shopId`)
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Payments
- `GET /api/payments` - List payments
- `GET /api/payments/order/{orderId}` - Get payment for order

### Notifications
- `GET /api/notifications` - List user notifications (with `?userId`)
- `PATCH /api/notifications/{id}/read` - Mark as read

### Parking
- `GET /api/parking/slots` - List slots (with `?occupied` filter)
- `PATCH /api/parking/slots/{id}` - Toggle slot occupancy

### Dashboard
- `GET /api/dashboard` - System overview (user, shop, product, order counts)

### Users
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Shops
- `GET /api/shops` - List shops
- `POST /api/shops` - Create shop
- `PUT /api/shops/{id}` - Update shop
- `DELETE /api/shops/{id}` - Delete shop

## 🧪 Build & Compilation Status

✅ **Frontend**: `npm run build` — Compiled successfully  
✅ **Backend**: `./mvnw clean compile` — Compiled successfully

## 📝 Development Notes

### Known Limitations
- Shop dashboards currently display all products/orders (not scoped to shop owner's shop)
  - Future enhancement: Add shop_id field to User entity for automatic filtering
- Inventory operations are global (not shop-scoped)
  - Same root cause as above

### Next Steps
1. Start the backend: `./mvnw spring-boot:run`
2. Start the frontend: `npm run dev`
3. Navigate to `http://localhost:5173` and test dashboards
4. Verify API responses match expected data structure

## 👥 Contributing

When adding new features:
1. Follow the existing service pattern (e.g., `userService.js`)
2. Use Axios for API calls with the shared instance
3. Handle loading/error states with useState
4. Use utility functions from `dashboardData.js` for computed metrics
5. Ensure all pages fetch live data and avoid hardcoded demo arrays

## 📄 License

[Add appropriate license information here]
