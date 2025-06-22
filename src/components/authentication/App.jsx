"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const App = () => {
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const { register, handleSubmit, reset } = useForm();
  const [otpSend, setOtpSend] = useState(false);
  const [formAction, setFormAction] = useState("login"); // Tracks which button is clicked

  console.log("ok");

  const handleLogin = async (data) => {

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log(result);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Login successful");
    }
  };

  const handleSignup = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Confirm Password is not same, please try again");
    } else {
      try {
        const response = await axios.post("/api/sign-up", data);
        if (response.status === 201) {
          toast.success(response.data.message);
          setOtpSend(true); // Show OTP input
        } else {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
      //finally {
      //   reset();
      // }
    }
  };

  const handleVerifyOtp = async (data) => {
    try {
      console.log(data)
      const response = await axios.post("/api/otp-verification", data);
      if (response.status === 200) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message || "Error verifying OTP");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    // finally {
    //   reset();
    // }
  };

  const handleGoogleLogin = async () => {
    const result = await signIn("google", { redirect: false });
    if (result?.error) {
      toast.error(result.error);
    }
  };

  const onSubmit = (data) => {
    if (formAction === "login") {
      handleLogin(data);
    } else if (formAction === "signup") {
      handleSignup(data);
    } else if (formAction === "verifyOtp") {
      handleVerifyOtp(data);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Toggle Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`text-sm font-semibold cursor-pointer ${authMode === "login"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
              }`}
            onClick={() => {
              setAuthMode("login");
              setOtpSend(false);
            }}
          >
            Login
          </button>
          <button
            className={`text-sm font-semibold cursor-pointer ${authMode === "signup"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
              }`}
            onClick={() =>{
               setAuthMode("signup");
               setOtpSend(false);
            }}
          >
            Sign Up
          </button>
        </div>

        {!otpSend && (<>
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {authMode === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: authMode === "signup" })}
                className="w-full border rounded px-4 py-2 text-sm"
                required
              />
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full border rounded px-4 py-2 text-sm"
              required
            />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full border rounded px-4 py-2 text-sm"
              required
            />

            {authMode === "signup" && (
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: authMode === "signup",
                })}
                className="w-full border rounded px-4 py-2 text-sm"
                required
              />
            )}


            {authMode === "login" && (
              <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit button for Login or Signup */}
            <button
              type="submit"
              onClick={() => setFormAction(authMode)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all text-sm cursor-pointer"
            >
              {authMode === "login" ? "Login" : "Create Account"}
            </button>

          </form>

          {/* OR divider */}
          <div className="my-4 flex items-center justify-between text-sm text-gray-400">
            <hr className="flex-grow border-t" />
            <span className="px-2">OR</span>
            <hr className="flex-grow border-t" />
          </div>

          {/* Social login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border text-sm text-gray-700 py-2 rounded hover:bg-gray-100 transition-all"
          >
            Continue with Google
          </button>
        </>)}

        {authMode === "signup" && otpSend && (
          <div className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Enter OTP"
            {...register("verificationCode", { required: otpSend })}
            className="w-full border rounded px-4 py-2 text-sm"
            required
          />

          {/* OTP verification button */}
          <button
            type="submit"
            onClick={() => setFormAction("verifyOtp")}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-all text-sm cursor-pointer"
          >
            Verify OTP
          </button>
        </div>
      )}

        {/* <button onClick={()=> setOtpSend(prev => !prev)}>Change</button> */}
      </div>
    </section>
  );
};

export default App;
