"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Edit, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge"

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { data: session, status } = useSession();
  const [isAddressDialoagOpen, setIsAddressDialoagOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [editAddress, setEditAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit, reset, formState: { errors }, } = useForm();

// fatch current user
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {

          const response = await axios.post("/api/fatch-user", { userId: session._id });
          if (response.status === 200) {
            setUser(response.data.user);
          }
        } catch (error) {
          toast.error("Error fetching user data");
        }
      }
    };

    fetchData();  
  }, [session]);


 


const onSubmit = async (data) => {
  try {
    setLoading(true);
    let response;

    if (editAddress) {
      response = await axios.post("/api/update-address", {
        ...data,
        addressId: editAddress._id,
      });
    } else {
      response = await axios.post("/api/add-address", data);
    }

    if (response.status === 200) {
      toast.success(response?.data?.message || "Success");
    } else {
      toast.error(response?.data?.message || "Something went wrong");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Error occurred");
  } finally {
    setLoading(false);
    reset();
    setIsAddressDialoagOpen(false);
    setEditAddress(null); // Clear edit mode
  }
};

//conditions check before page display

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-15 h-15 text-gray-600" />
      </div>
    );
  }
  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>
          You can't access the profile page first you need to
          <a
            href="/auth"
            className="ml-2 text-blue-600 underline"
          >
            Sign In
          </a>
        </p>
      </div>
    );
  }
  return (
    <section className="min-h-screen px-4 py-10 max-w-5xl mx-auto">
      {/* User Info */}

      <div className="flex flex-row   items-center justify-between mb-8 gap-4">
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
        <button onClick={() => { signOut({ callbackUrl: "/" }); }} className="text-sm bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200">
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
              user?.addresses?.map((address, index) => {
                return (
                  <div key={index} className="flex items-center gap-1">

                    <div key={index} className="flex justify-between border p-4 rounded mb-2 w-full">
                      <div>
                        <p><strong>  {address.fullName}</strong></p>
                        <p>{address.address} , {address.city}, {address.state}, {address.pinCode}, india</p>
                        <p><strong>Phone No:</strong> {address.phoneNo}</p>
                      </div>
                      <div>
                        <Edit
                          className="cursor-pointer"
                          onClick={() => {
                            setEditAddress(address);      // Set address to be edited
                            reset(address);               // Populate form with address data
                            setIsAddressDialoagOpen(true); // Open dialog
                          }}
                        />

                      </div>
                    </div>
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

      {activeTab === "favourites" && (
        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Favourites</h3>
          <p className="text-sm text-gray-500">No favourite products yet.</p>
        </div>
      )}
      {/* Modal */}
      {isAddressDialoagOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md relative">
            <h2 className="text-xl font-semibold mb-4">Add New Address</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("fullName",
                    {
                      required: "Full Name is required",
                      validate: (value) => value.trim() !== "" || "Full Name is required",
                    })}
                  className="border w-full px-3 py-2 rounded"
                  placeholder="Full Name"

                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                      validate: (value) => value.trim() !== "" || "Email is required",
                    },
                  })}
                  className="border w-full px-3 py-2 rounded"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register("address", {
                    required: "Address is required",
                    validate: (value) => value.trim() !== "" || "Address is required",
                  })}
                  className="border w-full px-3 py-2 rounded"
                  placeholder="Locality, Address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address.message}</p>
                )}
              </div>

              <div className="flex gap-2">
                <div className="w-full">
                  <input
                    {...register("city", {
                      required: "City is required",
                      validate: (value) => value.trim() !== "" || "City is required",
                    })}
                    className="border w-full px-3 py-2 rounded"
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <input
                    {...register("state", {
                      required: "State is required",
                      validate: (value) => value.trim() !== "" || "State is required",
                    })}
                    className="border w-full px-3 py-2 rounded"
                    placeholder="State"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state.message}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="number"
                  {...register("pinCode", {
                    required: "Pin Code is required",
                   
                    minLength: {
                      value: 6,
                      message: "Pin Code must be 6 digits",
                    },
                    maxLength: {
                      value: 6,
                      message: "Pin Code must be 6 digits",
                    },
                  })}
                  className="border w-full px-3 py-2 rounded"
                  placeholder="Pin Code"
                />
                {errors.pinCode && (
                  <p className="text-red-500 text-sm">{errors.pinCode.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register("phoneNo", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Invalid phone number",
                      validate: (value) => value.trim() !== "" || "Phone Number is required",
                    },
                  })}
                  className="border w-full px-3 py-2 rounded"
                  placeholder="Phone Number"
                />
                {errors.phoneNo && (
                  <p className="text-red-500 text-sm">{errors.phoneNo.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register("landmark")}
                  className="border w-full px-3 py-2 rounded"
                  placeholder="Landmark (Optional)"
                />
              </div>

              <div className="flex justify-between pt-4">
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
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}




    </section>
  );
}
