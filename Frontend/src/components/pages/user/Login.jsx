import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import api from "../../../api";
import { AuthContext } from "../../../context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

 const {login}= useContext(AuthContext)// line 1

 const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log("Login Data:", data);

    try {

      const response=await api.post("/auth/login",data);
      console.log(response.data)
    //   call login function from context and pass token to it
      login(response.data.token)//line 2

      const role=response.data.userDto.role;
      if(role=="ROLE_ADMIN")
        navigate("/admin")
      else if(role=="ROLE_USER")
        navigate("/products")
      
    } catch (error) {
      alert("Something went wrong")
      console.log(error)
    }
  };

  return (
    <div className="login-page">

      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100 py-5">

          <div className="col-xl-10">

            <div className="login-card">

              <div className="row g-0">

                {/* LEFT SECTION */}
                <div className="col-lg-5 login-left">

                  <div className="login-left-content">

                    <Link to="/" className="login-brand">
                      ShopEase
                    </Link>

                    <h1>
                      Welcome
                      <span> Back!</span>
                    </h1>

                    <p>
                      Sign in to your account and continue
                      exploring amazing products and exclusive
                      offers.
                    </p>

                    <div className="login-features">

                      <div className="login-feature">
                        <span>🛍️</span>
                        <div>
                          <h6>Discover Amazing Products</h6>
                          <small>
                            Find everything you need in one place.
                          </small>
                        </div>
                      </div>

                      <div className="login-feature">
                        <span>🎁</span>
                        <div>
                          <h6>Exclusive Deals</h6>
                          <small>
                            Enjoy special offers and discounts.
                          </small>
                        </div>
                      </div>

                      <div className="login-feature">
                        <span>🔒</span>
                        <div>
                          <h6>Safe & Secure</h6>
                          <small>
                            Your account is always protected.
                          </small>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>


                {/* RIGHT SECTION */}
                <div className="col-lg-7 login-right">

                  <div className="login-form-container">

                    <div className="mb-4">

                      <h2>
                        Welcome Back
                      </h2>

                      <p>
                        Don't have an account?{" "}
                        <Link to="/register">
                          Create an account
                        </Link>
                      </p>

                    </div>


                    <form onSubmit={handleSubmit(onSubmit)}>

                      {/* EMAIL */}

                      <div className="mb-4">

                        <label>
                          Email Address
                        </label>

                        <input
                          type="email"
                          className={`form-control ${
                            errors.email ? "input-error" : ""
                          }`}
                          placeholder="you@example.com"
                          {...register("email", {
                            required: "Email is required",
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


                      {/* PASSWORD */}

                      <div className="mb-3">

                        <div className="d-flex justify-content-between">

                          <label>
                            Password
                          </label>

                          <Link
                            to="/forgot-password"
                            className="forgot-password"
                          >
                            Forgot Password?
                          </Link>

                        </div>


                        {/* Password Input Wrapper */}
                        <div className="password-wrapper">

                          <input
                            type={
                              showPassword
                                ? "text"
                                : "password"
                            }
                            className={`form-control ${
                              errors.password
                                ? "input-error"
                                : ""
                            }`}
                            placeholder="Enter your password"
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


                          {/* Show / Hide Button */}
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                              setShowPassword(!showPassword)
                            }
                          >
                            {showPassword ? "🙈" : "👁️"}
                          </button>

                        </div>


                        {errors.password && (
                          <small className="error-message">
                            {errors.password.message}
                          </small>
                        )}

                      </div>


                      {/* REMEMBER ME */}

                      <div className="form-check mb-4">

                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />

                        <label
                          className="form-check-label remember-label"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>

                      </div>


                      {/* LOGIN BUTTON */}

                      <button
                        type="submit"
                        className="login-btn"
                      >
                        Sign In
                        <span> →</span>
                      </button>

                    </form>


                    <div className="secure-note">
                      🔒 Your login information is securely protected
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

export default Login;