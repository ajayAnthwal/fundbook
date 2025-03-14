"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { isAdmin, isLoggedin, login } from "@/api/client";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isLoggedin()) {
      if (isAdmin()) {
        router.push('/dashboard/admin/home');
      } else {
        router.push('/dashboard/user/home');
      }
    }
  }, [router]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await toast.promise(login(data), {
        loading: "Signing in...",
        success: "Successfully signed in!",
        error: (err) => err.message || "Failed to sign in",
      });
      
      console.log('success');
      if (isAdmin()) {
        console.log('user admin');
        router.push('/dashboard/admin/home');
      } else {
        console.log('user non-admin');
        router.push('/dashboard/user/home');
      }
    } catch (err) {
      console.error("Auth Error", err);
      setError(err.response?.data ? err.response.data : 'Error while login');
    } finally {
      setIsLoading(false);
    }
  };

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

                  <form onSubmit={handleSubmit(onSubmit)}>
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
                      {isLoading ? 
                        "Signing in..." : "Sign In"
                      }
                    </button>
                  </form>

                <div className="text-center mt-3">
                    <Link
                        href="/auth/register"
                        className="btn btn-link"
                        disabled={isLoading}
                      >
                      Sign up
                    </Link>
                    <Link
                      href="/auth/forgot"
                      className="btn btn-link"
                      disabled={isLoading}
                    >
                      Forgot Password?
                    </Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
