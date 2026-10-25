import { Link } from "react-router-dom";

function UserNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
      <div className="container-fluid px-5">

        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand fw-bold text-primary fs-3 me-4"
        >
          ShopEase
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">

          {/* Navigation */}
          <ul className="navbar-nav me-4">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/orders">
                My Orders
              </Link>
            </li>
          </ul>

          {/* Search */}
          <form className="d-flex flex-grow-1 mx-lg-4 my-3 my-lg-0">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search for products..."
              />

              <button className="btn btn-primary px-4" type="submit">
                Search
              </button>
            </div>
          </form>

          {/* Right Section */}
          <div className="d-flex align-items-center ms-lg-4">

            {/* Cart */}
            <Link
              to="/cart"
              className="text-dark text-decoration-none position-relative me-4"
            >
              <span className="fs-5">🛒</span>
              <span className="ms-2">Cart</span>

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </Link>

            {/* Account */}
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                👤 Account
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                <li>
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/register">
                    Register
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item" to="/orders">
                    My Orders
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;