"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";


const App = () => {
  const [authMode, setAuthMode] = useState("login");
  const [otpSend, setOtpSend] = useState(false);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [emailForOtp, setEmailForOtp] = useState("");
  const [loader, setLoader] = useState(false)
  const [googleLoginLoader, setGoogleLoginLoader] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    reset: resetOtp
  } = useForm();

  if (session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>
          You are already logged in go to
          <a href="/profile" className="ml-2 text-blue-600 underline">
            Profile
          </a>
        </p>
      </div>
    );
  }

  const handleLogin = async (data) => {
    setLoader(true)
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (result?.error) {
      toast.error(result?.error);

    } else {
      toast.success("Login successful");
      router.push('/profile');
    }
    setLoader(false)
  };

  const handleSignup = async (data) => {
    setLoader(true)
    if (data.password !== data.confirmPassword) {
      toast.error("Confirm Password is not same, please try again");
      setLoader(false)
    } else {
      try {
        const response = await axios.post("/api/sign-up", data);
        if (response.status === 201) {
          toast.warning(response.data.message);
          setEmailForOtp(data.email);
          setOtpSend(true);
        } else {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
      finally {
        setLoader(false)
      }
    }
  };

  const handleVerifyOtp = async (data) => {
    setLoader(true)
    try {

      const response = await axios.post("/api/otp-verification", {
        email: emailForOtp,
        verificationCode: data.verificationCode,
      });
      if (response.status === 200) {
        toast.success(response?.data?.message);
        resetOtp();
        setAuthMode("login");
        setOtpSend(false);
      } else {
        toast.error(response?.data?.message || "Error verifying OTP");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    finally {
      setLoader(false)
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoginLoader(true)
    const result = await signIn("google", { redirect: false });
    if (result?.error) {
      toast.error(result.error);
      setGoogleLoginLoader(false)
    }

  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`text-sm font-semibold ${authMode === "login" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            onClick={() => {
              setAuthMode("login");
              setOtpSend(false);
            }}
          >
            Login
          </button>
          <button
            className={`text-sm font-semibold ${authMode === "signup" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            onClick={() => {
              setAuthMode("signup");
              setOtpSend(false);
            }}
          >
            Sign Up
          </button>
        </div>

        {/* MAIN FORM: Signup/Login */}
        {!otpSend && (
          <>
            <form onSubmit={handleSubmit(authMode === "login" ? handleLogin : handleSignup)} className="space-y-4">
              {authMode === "signup" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", { required: true })}
                  className="w-full border rounded px-4 py-2 text-sm"
                />
              )}

              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="w-full border rounded px-4 py-2 text-sm"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="w-full border rounded px-4 py-2 text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {authMode === "signup" && (
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register("confirmPassword", { required: true })}
                    className="w-full border rounded px-4 py-2 text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

              )}

              {authMode === "login" && (
                <div className="flex justify-between text-sm text-gray-600">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <a href="#" className="text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all text-sm ${loader ? `cursor-not-allowed` : `cursor-pointer`}`}
              >
                {loader ? <Loader2 className="cursor-not-allowed animate-spin mx-auto text-gray-300" /> : authMode === "login" ? "Login" : "Create Account"}
              </button>

            </form>

            <div className="my-4 flex items-center justify-between text-sm text-gray-400">
              <hr className="flex-grow border-t" />
              <span className="px-2">OR</span>
              <hr className="flex-grow border-t" />
            </div>

            <button
              onClick={handleGoogleLogin}
              className={`w-full border text-sm text-gray-700 py-2 rounded hover:bg-gray-100 transition-all ${googleLoginLoader ? `cursor-not-allowed` : `cursor-pointer`}`}
            >
              {googleLoginLoader ? <Loader2 className="cursor-not-allowed animate-spin mx-auto text-gray-300" /> : <div className="flex gap-1 items-center justify-center"><img src="/images/google-logo.png" className="h-5 w-5" /> <p>Continue with Google</p></div>}
            </button>
          </>
        )}

        {/* OTP FORM */}
        {otpSend && (
          <form onSubmit={handleOtpSubmit(handleVerifyOtp)} className="space-y-4 mt-6">
            <input
              type="text"
              placeholder="Enter OTP"
              {...registerOtp("verificationCode", { required: true })}
              className="w-full border rounded px-4 py-2 text-sm"
            />
            <button
              type="submit"
              className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-all text-sm ${loader ? `cursor-not-allowed` : `cursor-pointer`}`}
            >
              {loader ? <Loader2 className=" animate-spin mx-auto text-gray-300" /> : 'Verify OTP'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default App;
