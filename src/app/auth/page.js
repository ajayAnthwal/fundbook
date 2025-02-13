"use client";
import { useForm } from "react-hook-form";
import { authAPI } from "@/api/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLogin, setIsLogin] = useState(true);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      if (isLogin) {
        const loginData = {
          email: data.email,
          password: data.password,
        };

        const response = await toast.promise(authAPI.login(loginData), {
          loading: "Signing in...",
          success: "Successfully signed in!",
          error: (err) => err.message || "Failed to sign in",
        });
        router.push("/dashboard");
      } else {
        const registerData = {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        };

        const response = await toast.promise(authAPI.register(registerData), {
          loading: "Creating account...",
          success: "Account created successfully!",
          error: (err) => err.message || "Failed to create account",
        });
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <main id="content" role="main" className="min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center mb-4">
                  {isLogin ? "Sign In" : "Sign Up"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {!isLogin && (
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.firstName ? "is-invalid" : ""
                          }`}
                          {...register("firstName", {
                            required: "First name is required",
                            minLength: {
                              value: 2,
                              message: "First name must be at least 2 characters",
                            },
                          })}
                        />
                        {errors.firstName && (
                          <div className="invalid-feedback">
                            {errors.firstName.message}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.lastName ? "is-invalid" : ""
                          }`}
                          {...register("lastName", {
                            required: "Last name is required",
                            minLength: {
                              value: 2,
                              message: "Last name must be at least 2 characters",
                            },
                          })}
                        />
                        {errors.lastName && (
                          <div className="invalid-feedback">
                            {errors.lastName.message}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {isLogin ? "Signing in..." : "Signing up..."}
                      </>
                    ) : isLogin ? (
                      "Sign In"
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>

                <div className="text-center mt-3">
                  <button
                    className="btn btn-link"
                    onClick={toggleForm}
                    disabled={isLoading}
                  >
                    {isLogin
                      ? "Need an account? Sign up"
                      : "Already have an account? Sign in"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
