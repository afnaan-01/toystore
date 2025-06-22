"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
   const [session, setSession] = useState(false);

  const user = {
    name: "Amaan Toywala",
    email: "amaan@toys.com",
    avatar: "/avatar.jpg", // make sure this exists in /public
    phone: "9876543210",
    address: "12 Toy Lane, Mumbai",
  };

  return (
    <section className="min-h-screen px-4 py-10 max-w-5xl mx-auto">
      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full border object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>
        <button className="text-sm bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200">
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6 overflow-x-auto text-sm">
        {["profile", "orders", "address", "favourites"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="space-y-4">
          <div className="bg-white rounded p-4 shadow">
            <h3 className="font-semibold text-gray-700 mb-2">Basic Info</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Your Orders</h3>
          <p className="text-sm text-gray-500">You have no orders yet.</p>
        </div>
      )}

      {activeTab === "address" && (
        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Saved Address</h3>
          <p>{user.address}</p>
        </div>
      )}

      {activeTab === "favourites" && (
        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Favourites</h3>
          <p className="text-sm text-gray-500">No favourite products yet.</p>
        </div>
      )}
    </section>
  );
}
