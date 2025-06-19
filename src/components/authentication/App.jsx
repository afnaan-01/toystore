"use client";
import { useState } from "react";
import Navbar from "../navbar/App";
import 'remixicon/fonts/remixicon.css';

const App = () => {
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Toggle Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`text-sm font-semibold cursor-pointer ${authMode === "login" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
            onClick={() => setAuthMode("login")}
          >
            Login
          </button>
          <button
            className={`text-sm font-semibold cursor-pointer ${authMode === "signup" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
            onClick={() => setAuthMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {authMode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded px-4 py-2 text-sm"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-4 py-2 text-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-4 py-2 text-sm"
            required
          />

          {authMode === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
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

          <button
            type="submit"
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

        {/* Social login (optional) */}
        <button className="w-full border flex justify-center items-center gap-2 text-sm py-2 rounded hover:bg-gray-100 md:cursor-pointer">
          {/* <img src="/icons/google.svg" alt="Google" className="h-4 w-4" /> */}
          <i className="ri-google-fill"></i>
          Continue with Google
        </button>
      </div>
    </section>
  );
}


export default App;