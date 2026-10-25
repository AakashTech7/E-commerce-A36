import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../../api";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log(data)

    try {

      const response = await api.post("/users", data);
      console.log(response);
      alert("User Registered successfully")

    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    }

  };

  return (
    <div className="register-page">

      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100 py-5">

          <div className="col-xl-10">

            <div className="register-card">

              <div className="row g-0">

                {/* ================= LEFT SECTION ================= */}

                <div className="col-lg-5 register-left">

                  <div className="register-left-content">

                    <Link
                      to="/"
                      className="brand-logo"
                    >
                      ShopEase
                    </Link>

                    <h1>
                      Start Your
                      <span> Shopping Journey.</span>
                    </h1>

                    <p>
                      Create your account and discover amazing
                      products, exclusive deals, and a seamless
                      shopping experience.
                    </p>

                    <div className="register-benefits">

                      <div className="benefit-item">
                        <div className="benefit-icon">
                          🛍️
                        </div>

                        <div>
                          <h6>Thousands of Products</h6>
                          <small>
                            Find everything you need in one place.
                          </small>
                        </div>
                      </div>


                      <div className="benefit-item">
                        <div className="benefit-icon">
                          🎁
                        </div>

                        <div>
                          <h6>Exclusive Offers</h6>
                          <small>
                            Get access to special deals and discounts.
                          </small>
                        </div>
                      </div>


                      <div className="benefit-item">
                        <div className="benefit-icon">
                          🔒
                        </div>

                        <div>
                          <h6>Secure Shopping</h6>
                          <small>
                            Your data and payments are always protected.
                          </small>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>


                {/* ================= RIGHT SECTION ================= */}

                <div className="col-lg-7 register-right">

                  <div className="register-form-container">

                    <div className="mb-4">

                      <h2>
                        Create an Account
                      </h2>

                      <p>
                        Already have an account?{" "}
                        <Link to="/login">
                          Sign in
                        </Link>
                      </p>

                    </div>


                    <form onSubmit={handleSubmit(onSubmit)}>

                      {/* First Name + Last Name */}

                      <div className="row">

                        <div className="col-md-6 mb-3">

                          <label>
                            First Name
                          </label>

                          <input
                            type="text"
                            className={`form-control ${errors.firstName
                                ? "input-error"
                                : ""
                              }`}
                            placeholder="Enter first name"
                            {...register("firstName", {
                              required:
                                "First name is required",
                              minLength: {
                                value: 2,
                                message:
                                  "Minimum 2 characters required",
                              },
                            })}
                          />

                          {errors.firstName && (
                            <small className="error-message">
                              {errors.firstName.message}
                            </small>
                          )}

                        </div>


                        <div className="col-md-6 mb-3">

                          <label>
                            Last Name
                          </label>

                          <input
                            type="text"
                            className={`form-control ${errors.lastName
                                ? "input-error"
                                : ""
                              }`}
                            placeholder="Enter last name"
                            {...register("lastName", {
                              required:
                                "Last name is required",
                              minLength: {
                                value: 2,
                                message:
                                  "Minimum 2 characters required",
                              },
                            })}
                          />

                          {errors.lastName && (
                            <small className="error-message">
                              {errors.lastName.message}
                            </small>
                          )}

                        </div>

                      </div>


                      {/* Email */}

                      <div className="mb-3">

                        <label>
                          Email Address
                        </label>

                        <input
                          type="email"
                          className={`form-control ${errors.email
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="you@example.com"
                          {...register("email", {
                            required:
                              "Email is required",
                            pattern: {
                              value:
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message:
                                "Enter a valid email address",
                            },
                          })}
                        />

                        {errors.email && (
                          <small className="error-message">
                            {errors.email.message}
                          </small>
                        )}

                      </div>


                      {/* Password */}

                      <div className="mb-3">

                        <label>
                          Password
                        </label>

                        <input
                          type="password"
                          className={`form-control ${errors.password
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Create a password"
                          {...register("password", {
                            required:
                              "Password is required",
                            minLength: {
                              value: 6,
                              message:
                                "Password must be at least 6 characters",
                            },
                          })}
                        />

                        {errors.password && (
                          <small className="error-message">
                            {errors.password.message}
                          </small>
                        )}

                      </div>


                      {/* Confirm Password */}

                      <div className="mb-4">

                        <label>
                          Confirm Password
                        </label>

                        <input
                          type="password"
                          className={`form-control ${errors.confirmPassword
                              ? "input-error"
                              : ""
                            }`}
                          placeholder="Confirm your password"
                          {...register("confirmPassword", {
                            required:
                              "Please confirm your password",
                            validate: (value) =>
                              value === password ||
                              "Passwords do not match",
                          })}
                        />

                        {errors.confirmPassword && (
                          <small className="error-message">
                            {errors.confirmPassword.message}
                          </small>
                        )}

                      </div>


                      {/* Terms */}

                      <div className="form-check mb-4">

                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="terms"
                          required
                        />

                        <label
                          className="form-check-label terms-label"
                          htmlFor="terms"
                        >
                          I agree to the Terms & Conditions and
                          Privacy Policy
                        </label>

                      </div>


                      {/* Submit */}

                      <button
                        type="submit"
                        className="register-btn"
                      >
                        Create Account
                        <span> →</span>
                      </button>

                    </form>


                    <div className="secure-note">
                      🔒 Your information is securely protected
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;