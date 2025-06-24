"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { data: session, status } = useSession();
  const [isAddressDialoagOpen, setIsAddressDialoagOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [user, setUser] = useState([])

  useEffect(() => {
  const fetchData = async () => {
    if (session) {
      try {
        
        const response = await axios.post("/api/fatch-user", { userId: session._id });
        if (response.status === 200) {
          setUser(response.data.user)
        }  
      } catch (error) {
         console.log(error)
      }
    }
  };

  fetchData(); // Call the inner async function
}, [session]);

 

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-15 h-15 text-gray-600" />
      </div>
    );
  }
  if (!session) {
    return (
      <a
        href="/api/auth/signin"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign In
      </a>
    );
  }


  const onSubmit = async (data) => {
   
    try {
      const response = await axios.post("/api/add-address", data);
      if (response.status === 200) {
        toast.success(response?.data?.message || "address added successfuly");
      } else {
        toast.success(response?.data?.message || "Error while Adding Address");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    finally {
      reset();
      setIsAddressDialoagOpen(false);
    }
  };

  return (
    <section className="min-h-screen px-4 py-10 max-w-5xl mx-auto">
      {/* User Info */}

      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <img
          src="/images/avatar.png"
            alt="avatar"
            className="w-16 h-16 rounded-full border object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{session?.user?.name}</h2>
            <p className="text-gray-500 text-sm">{session?.user?.email}</p>
          </div>
        </div>
        <button onClick={signOut} className="text-sm bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200">
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6 overflow-x-auto text-sm">
        {["profile", "orders", "address", "favourites"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${activeTab === tab
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
            <p><strong>Name:</strong> {session?.user?.name}</p>
            <p><strong>Email:</strong> {session?.user?.email}</p>
            {/* <p><strong>Phone:</strong> {user.phone}</p> */}
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
        <div className="flex flex-col gap-3 items-center">
          <div className="bg-white rounded p-4 shadow w-full">
            <h3 className="font-semibold text-gray-700 mb-2">Saved Address</h3>
            {
              user.addresses.map((address, index)=>{
                return (
                  <div key={index} className="border p-4 rounded mb-2">
                    <p><strong>Address:</strong> {address.address}</p>
                    <p><strong>City:</strong> {address.city}</p>
                    <p><strong>State:</strong> {address.state}</p>
                    <p><strong>Pin Code:</strong> {address.pinCode}</p>
                    <p><strong>Phone No:</strong> {address.phoneNo}</p>
                    <p><strong>Landmark:</strong> {address.landmark}</p>
                  </div>
                )
              })
            }

          </div>
          <button
            onClick={() => setIsAddressDialoagOpen(true)}
            className="bg-blue-400 text-white px-4 py-2 rounded"
          >
            Add Address
          </button>
        </div>
      )}
      {/* Modal */}
      {isAddressDialoagOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md relative">
            <h2 className="text-xl font-semibold mb-4">Add New Address</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  {...register("address", { required: true })}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  {...register("city", { required: true })}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">State</label>
                <input
                  {...register("state", { required: true })}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Pin Code</label>
                <input
                  type="number"
                  {...register("pinCode", { required: true })}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  {...register("phoneNo", { required: true })}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Landmark</label>
                <input
                  {...register("landmark")}
                  className="border w-full px-3 py-2 rounded"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setIsAddressDialoagOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
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
