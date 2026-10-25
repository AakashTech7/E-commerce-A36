import { useEffect, useState } from "react";
import { Link, useAsyncError } from "react-router-dom";
import api from "../../../api";
import { useForm } from "react-hook-form";

function Checkout() {

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data)

    try {

      const response = await api.post("/address", data)
      setSelectedAddress(response.data.id)
      alert("address added successfully")

    } catch (error) {
      alert("something went wrong ")
    }

  }


  const [cartItems, setCartItems] = useState(null);
  const [addresses,setAddresses]=useState(null);
  const [selectedAddress,setSelectedAddress]=useState(null);

  const fetchCart = async () => {

    try {

      const response = await api.get("/cart")
      setCartItems(response.data.cartItems)

    } catch (error) {
      alert("something went wrong")
    }

  }


  const fetchAddresses=async ()=>{
     try {

      const response=await api.get("/address")
      setAddresses(response.data)
      
     } catch (error) {
         alert("Something went wrong")
     }
  }

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, [])


  const subtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  }


  const handlePayment=async ()=>{
    //1
    if(!selectedAddress)
    {
      alert("address not selected")
      return;
    }

    // handle payment

    try {

     const response=await api.post("/payment/create-order")

     // -----------------------------------------------------------


     var options = {
    "key": "rzp_test_S060WMnc2eFoWe", // Enter the Key ID generated from the Dashboard
    "amount":response.data.amount, // Amount is in currency subunits. 
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
       
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)

        //verify payment signature
    },
    "prefill": {
        "name": "<name>",
        "email": "<email>",
        "contact": "<phone>"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new window.Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});

    rzp1.open();
 


     //-------------------------------------------------------------
      
    } catch (error) {
      alert("Something went wrong")
    }
  }  




 return (
  <div className="checkout-page bg-light min-vh-100">

    <div className="container py-5">

      {/* ================= HEADER ================= */}

      <div className="text-center mb-5">
        <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
          CHECKOUT
        </span>

        <h1 className="fw-bold display-6 mb-2">
          Complete Your Order
        </h1>

        <p className="text-secondary mb-0">
          Enter your details and choose your preferred payment method.
        </p>
      </div>


      <div className="row g-4">

        {/* ================= LEFT SECTION ================= */}

        <div className="col-lg-8">

          <form action="" onSubmit={handleSubmit(onSubmit)}>

            {/* CUSTOMER INFORMATION */}

            <div className="card border-0 shadow-sm rounded-4 mb-4">

              <div className="card-body p-4">

                <div className="d-flex align-items-center gap-3 mb-4">

                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: "42px", height: "42px" }}>
                    1
                  </div>

                  <div>
                    <h4 className="fw-bold mb-1">
                      Customer Information
                    </h4>

                    <p className="text-secondary mb-0 small">
                      Enter your contact details
                    </p>
                  </div>

                </div>


                <div className="row g-3">

                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      First Name
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter first name"
                      {...register("firstName")}
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Last Name
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter last name"
                      {...register("lastName")}
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3"
                      placeholder="you@example.com"
                      {...register("email")}
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      className="form-control form-control-lg rounded-3"
                      placeholder="+1 234 567 8900"
                      {...register("phoneNo")}
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* ================= SAVED ADDRESSES ================= */}

            <div className="card border-0 shadow-sm rounded-4 mb-4">

              <div className="card-body p-4">

                <div className="d-flex align-items-center justify-content-between mb-4">

                  <div>
                    <h4 className="fw-bold mb-1">
                      Saved Addresses
                    </h4>

                    <p className="text-secondary mb-0 small">
                      Select an address for delivery
                    </p>
                  </div>

                  <span className="badge bg-primary-subtle text-primary rounded-pill">
                    {addresses?.length || 0} saved
                  </span>

                </div>


                {addresses && addresses.length > 0 ? (

                  <div className="row g-3">

                    {addresses.map(a => (

                      <div className="col-md-6" key={a.id}>

                        <label
                          className={`d-block border rounded-4 p-3 h-100 ${
                            a.id === selectedAddress
                              ? "border-primary bg-primary-subtle"
                              : "border-light-subtle bg-light"
                          }`}
                          style={{ cursor: "pointer" }}
                        >

                          <div className="d-flex gap-3">

                            <input
                              type="radio"
                              className="form-check-input mt-1"
                              onChange={() => setSelectedAddress(a.id)}
                              checked={a.id === selectedAddress}
                            />

                            <div>

                              <h6 className="fw-bold mb-2">
                                {a.firstName} {a.lastName}
                              </h6>

                              <p className="text-secondary small mb-0">
                                {a.address}
                              </p>

                              <p className="text-secondary small mb-0">
                                {a.city}, {a.state}
                              </p>

                              <p className="text-secondary small mb-0">
                                ID: {a.id}
                              </p>

                            </div>

                          </div>

                        </label>

                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="text-center py-4 bg-light rounded-4">
                    <div className="fs-2 mb-2">
                      📍
                    </div>

                    <p className="text-secondary mb-0">
                      No saved addresses yet.
                    </p>
                  </div>

                )}

              </div>

            </div>


            {/* ================= SHIPPING ADDRESS ================= */}

            <div className="card border-0 shadow-sm rounded-4 mb-4">

              <div className="card-body p-4">

                <div className="d-flex align-items-center gap-3 mb-4">

                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: "42px", height: "42px" }}
                  >
                    2
                  </div>

                  <div>
                    <h4 className="fw-bold mb-1">
                      Shipping Address
                    </h4>

                    <p className="text-secondary mb-0 small">
                      Where should we deliver your order?
                    </p>
                  </div>

                </div>


                <div className="row g-3">

                  <div className="col-12">

                    <label className="form-label fw-semibold">
                      Address
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="House number, street name"
                      {...register("address")}
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      City
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter city"
                      {...register("city")}
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      State
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter state"
                      {...register("state")}
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      ZIP Code
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter ZIP code"
                      {...register("pincode")}
                    />

                  </div>


                  <div className="col-md-6">

                    <label className="form-label fw-semibold">
                      Country
                    </label>

                    <select
                      className="form-select form-select-lg rounded-3"
                      {...register("country")}
                    >

                      <option>
                        Select Country
                      </option>

                      <option value={"US"}>
                        United States
                      </option>

                      <option value={"CN"}>
                        Canada
                      </option>

                      <option value={""}>
                        United Kingdom
                      </option>

                      <option value={"IN"}>
                        India
                      </option>

                    </select>

                  </div>

                </div>

              </div>

            </div>


            {/* ADD ADDRESS BUTTON */}

            <button
              className="btn btn-primary btn-lg rounded-3 px-4 shadow-sm"
              type="submit"
            >
              + Add Address
            </button>

          </form>

        </div>


        {/* ================= RIGHT SECTION ================= */}

        <div className="col-lg-4">

          <div
            className="card border-0 shadow-sm rounded-4 sticky-top"
            style={{ top: "20px" }}
          >

            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <h4 className="fw-bold mb-0">
                  Order Summary
                </h4>

                <span className="badge bg-dark rounded-pill">
                  {cartItems?.length || 0} items
                </span>

              </div>


              {/* Products */}

              {cartItems && cartItems.map(c => (

                <div
                  className="d-flex align-items-center gap-3 mb-3"
                  key={c.product.id}
                >

                  <div className="position-relative">

                    <img
                      src={c.product.imageUrl}
                      alt={c.product.name}
                      className="rounded-3 border"
                      style={{
                        width: "65px",
                        height: "65px",
                        objectFit: "cover"
                      }}
                    />

                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                    >
                      {c.quantity}
                    </span>

                  </div>


                  <div className="flex-grow-1">

                    <h6 className="fw-semibold mb-1">
                      {c.product.name}
                    </h6>

                    <small className="text-secondary">
                      ${c.product.price} each
                    </small>

                  </div>


                  <strong>
                    ${(c.product.price * c.quantity).toFixed(2)}
                  </strong>

                </div>

              ))}


              <hr className="my-4" />


              {/* Price Details */}

              <div className="d-flex justify-content-between mb-3">

                <span className="text-secondary">
                  Subtotal
                </span>

                <span className="fw-semibold">
                  {cartItems
                    ? `$${subtotal().toFixed(2)}`
                    : "$0.00"
                  }
                </span>

              </div>


              <div className="d-flex justify-content-between mb-3">

                <span className="text-secondary">
                  Shipping
                </span>

                <span className="text-success fw-semibold">
                  FREE
                </span>

              </div>


              <div className="d-flex justify-content-between mb-3">

                <span className="text-secondary">
                  Tax
                </span>

                <span className="fw-semibold">
                  $0.00
                </span>

              </div>


              <hr />


              <div className="d-flex justify-content-between align-items-center my-4">

                <span className="fs-5 fw-semibold">
                  Total
                </span>

                <strong className="fs-3 text-primary">
                  {cartItems
                    ? `$${subtotal().toFixed(2)}`
                    : "$0.00"
                  }
                </strong>

              </div>


              {/* Payment */}

              <button
                className="btn btn-primary btn-lg w-100 rounded-3 fw-semibold py-3 shadow-sm"
                onClick={handlePayment}
              >
                🔒 Pay with Razorpay
              </button>


              <div className="text-center mt-3">

                <small className="text-secondary">
                  🔐 Your payment information is encrypted
                  and securely processed.
                </small>

              </div>


              <Link
                to="/cart"
                className="btn btn-outline-secondary w-100 rounded-3 mt-4"
              >
                ← Back to Cart
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
);

}

export default Checkout;