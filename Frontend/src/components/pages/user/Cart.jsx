import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";

function Cart() {

  const [cartItems,setCartItems]=useState(null);

  const fetchCart=async ()=>{

    try {

      const response=await api.get("/cart")
      setCartItems(response.data.cartItems)
      
    } catch (error) {
      alert("something went wrong")
    }

  }


  useEffect(()=>{
    fetchCart();
  },[])


const subtotal = () =>{
   return cartItems.reduce((total, item)=>{
    return total + item.product.price * item.quantity
   },0)
}


  return (
    <div className="cart-page">

      <div className="container py-5">

        {/* Page Header */}
        <div className="cart-header mb-4">

          <span className="cart-subtitle">
            SHOPPING BAG
          </span>

          <h1>
            Shopping Cart
          </h1>

          <p>
            Review your items before proceeding to checkout.
          </p>

        </div>


        <div className="row g-4">

          {/* ================= CART ITEM ================= */}

          <div className="col-lg-8">

            <div className="cart-card">

              {/* Card Header */}

              <div className="cart-card-header">

                <div>
                  <h5>
                    Your Items
                  </h5>

                  <span>
                    1 Product
                  </span>
                </div>

                <span className="in-stock-badge">
                  ✓ In Stock
                </span>

              </div>


              {/* Product */}


              { cartItems && cartItems.map(c=>      <div className="cart-product">

                {/* Product Image */}

                <div className="cart-image-wrapper">

                  <img
                    src={c.product.imageUrl}
                    alt="Wireless Headphones"
                  />

                </div>


                {/* Product Information */}

                <div className="cart-product-info">

                  <span className="product-category">
                    Electronics
                  </span>

                  <h4>
                   {c.product.name}
                  </h4>

                  <p>
                    {c.product.description}
                  </p>

                  <button className="remove-cart">
                    🗑 Remove
                  </button>

                </div>


                {/* Quantity + Price */}

                <div className="cart-product-actions">

                  <div className="quantity-box">

                    <button>
                      −
                    </button>

                    <span>
                       {c.quantity}
                    </span>

                    <button>
                      +
                    </button>

                  </div>

                  <div className="product-price">
                    {c.product.price}
                  </div>

                </div>

              </div>)}

        

              

            </div>


            {/* Continue Shopping */}

            <Link
              to="/products"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

          </div>

          


          {/* ================= ORDER SUMMARY ================= */}

          <div className="col-lg-4">

            <div className="summary-card">

              <h4>
                Order Summary
              </h4>


              <div className="summary-item">

                <span>
                  Subtotal 
                  
                </span>

                <strong>
              {  cartItems && subtotal().toFixed(2)}
                </strong>

              </div>


              <div className="summary-item">

                <span>
                  Shipping
                </span>

                <span className="free-shipping">
                  FREE
                </span>

              </div>


              <div className="summary-item">

                <span>
                  Tax
                </span>

                <span>
                  $0.00
                </span>

              </div>


              <hr />


              <div className="total-row">

                <span>
                  Total
                </span>

                <strong>
                  $59.99
                </strong>

              </div>


              <Link className="checkout-btn" to={'/checkout'}>
                Proceed to Checkout
                <span> →</span>
              </Link>


              <div className="secure-checkout">
                🔒 Secure & encrypted checkout
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;