"use client";
import { useForm } from "react-hook-form";
import { authAPI } from "@/api/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { isAdmin, login, registerUser } from "@/api/client";

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      let response;

      if (isLogin) {
        response = await toast.promise(login(data), {
          loading: "Signing in...",
          success: "Successfully signed in!",
          error: (err) => err.message || "Failed to sign in",
        });
      } else {
        response = await registerUser(data);
      }
      if (isAdmin()) {
        router.push("/dashboard/admin/home");
      } else {
        router.push("/dashboard/user/home");
      }
      
    } catch (err) {
      console.error("Auth Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPasswordHandler = async (data) => {
    try {
      setIsLoading(true);
      await toast.promise(authAPI.forgotPassword(data.email), {
        loading: "Sending reset link...",
        success: "Password reset link sent!",
        error: (err) => err.message || "Failed to send reset link",
      });
      setForgotPassword(false);
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    localStorage.clear();
  },[])

  return (
    <main className="min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center mb-4">
                  {forgotPassword
                    ? "Forgot Password"
                    : isLogin
                    ? "Sign In"
                    : "Sign Up"}
                </h2>

                {forgotPassword ? (
                  <form onSubmit={handleSubmit(forgotPasswordHandler)}>
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
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                    <button
                      className="btn btn-link w-100 mt-2"
                      onClick={() => setForgotPassword(false)}
                    >
                      Back to Sign In
                    </button>
                  </form>
                ) : (
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
                                message: "At least 2 characters",
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
                                message: "At least 2 characters",
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
                            message: "At least 6 characters",
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
                      {isLoading
                        ? isLogin
                          ? "Signing in..."
                          : "Signing up..."
                        : isLogin
                        ? "Sign In"
                        : "Sign Up"}
                    </button>
                  </form>
                )}

                {!forgotPassword && (
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-link"
                      onClick={() => setIsLogin(!isLogin)}
                      disabled={isLoading}
                      z
                    >
                      {isLogin
                        ? "Need an account? Sign up"
                        : "Already have an account? Sign in"}
                    </button>
                    <button
                      className="btn btn-link"
                      onClick={() => setForgotPassword(true)}
                      disabled={isLoading}
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
