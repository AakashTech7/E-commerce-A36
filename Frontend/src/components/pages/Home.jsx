import { Link } from "react-router-dom";

function Home() {
  const categories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    },
    {
      name: "Home & Living",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    },
    {
      name: "Sports",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 74.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      id: 4,
      name: "Backpack",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    },
  ];

  return (
    <div>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-primary text-white rounded-4 p-5 mb-5">
        <div className="row align-items-center">

          <div className="col-lg-7">
            <h1 className="display-4 fw-bold">
              Shop Everything You Love
            </h1>

            <p className="lead mt-3">
              Discover amazing products at great prices.
              Shop from electronics, fashion, sports and more.
            </p>

            <Link
              to="/products"
              className="btn btn-light btn-lg mt-3 px-4"
            >
              Shop Now
            </Link>
          </div>

          <div className="col-lg-5 text-center mt-4 mt-lg-0">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
              alt="Shopping"
              className="img-fluid rounded-4"
            />
          </div>

        </div>
      </section>


      {/* ================= CATEGORIES ================= */}
      <section className="mb-5">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">
            Shop by Category
          </h2>

          <Link to="/products" className="text-decoration-none">
            View All
          </Link>
        </div>

        <div className="row g-4">

          {categories.map((category) => (
            <div className="col-6 col-md-3" key={category.name}>

              <Link
                to="/products"
                className="text-decoration-none text-dark"
              >
                <div className="card border-0 shadow-sm h-100">

                  <img
                    src={category.image}
                    className="card-img-top"
                    alt={category.name}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body text-center">
                    <h5 className="fw-semibold mb-0">
                      {category.name}
                    </h5>
                  </div>

                </div>
              </Link>

            </div>
          ))}

        </div>
      </section>


      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="mb-5">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">
            Featured Products
          </h2>

          <Link to="/products" className="text-decoration-none">
            View All Products
          </Link>
        </div>

        <div className="row g-4">

          {products.map((product) => (
            <div
              className="col-12 col-sm-6 col-lg-3"
              key={product.id}
            >

              <div className="card border-0 shadow-sm h-100">

                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column">

                  <h5 className="card-title">
                    {product.name}
                  </h5>

                  <h5 className="text-primary fw-bold">
                    ${product.price}
                  </h5>

                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    View Product
                  </Link>

                </div>

              </div>

            </div>
          ))}

        </div>
      </section>


      {/* ================= PROMOTION ================= */}
      <section className="bg-light rounded-4 p-5 text-center mb-5">

        <h2 className="fw-bold">
          Get the Best Deals Today
        </h2>

        <p className="text-muted mt-3">
          Explore our latest collection and enjoy amazing
          products at affordable prices.
        </p>

        <Link
          to="/products"
          className="btn btn-primary px-4 mt-2"
        >
          Explore Products
        </Link>

      </section>

    </div>
  );
}

export default Home;