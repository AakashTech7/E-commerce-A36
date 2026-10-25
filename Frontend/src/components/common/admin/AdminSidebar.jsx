import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">

      {/* Logo */}
      <div className="admin-logo">
        <h3>ShopEase</h3>
        <span>Admin Panel</span>
      </div>


      {/* Navigation */}
      <div className="sidebar-menu">

        <p className="menu-title">
          MAIN MENU
        </p>

        <NavLink
          to="/admin"
          end
          className="sidebar-link"
        >
          <span>📊</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className="sidebar-link"
        >
          <span>📦</span>
          Products
        </NavLink>

        <NavLink
          to="/admin/categories"
          className="sidebar-link"
        >
          <span>🗂️</span>
          Categories
        </NavLink>

        <NavLink
          to="/admin/orders"
          className="sidebar-link"
        >
          <span>🛒</span>
          Orders
        </NavLink>


        <p className="menu-title mt-4">
          MANAGEMENT
        </p>

        <NavLink
          to="/admin/users"
          className="sidebar-link"
        >
          <span>👥</span>
          Users
        </NavLink>

        <NavLink
          to="/admin/reports"
          className="sidebar-link"
        >
          <span>📈</span>
          Reports
        </NavLink>


        <p className="menu-title mt-4">
          ACCOUNT
        </p>

        <NavLink
          to="/admin/profile"
          className="sidebar-link"
        >
          <span>👤</span>
          Profile
        </NavLink>

        <NavLink
          to="/"
          className="sidebar-link"
        >
          <span>🏠</span>
          View Store
        </NavLink>

        <button className="sidebar-link logout-link">
          <span>🚪</span>
          Logout
        </button>

      </div>

    </div>
  );
}

export default AdminSidebar;