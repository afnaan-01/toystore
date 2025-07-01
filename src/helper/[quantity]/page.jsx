"use client";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Loader2, Minus, Plus } from "lucide-react";
import { useSession } from "next-auth/react";


export default function CheckoutPage({ params }) {
  const { id, quantity } = React.use(params);
  const [loader, setLoader] = useState(false)
  const [product, setProduct] = useState({})
  const [updatedQuantity, setUpdatedQuantity] = useState(Number(quantity) || 1);
  const [placingOrder, setPlacingOrder] = useState(false);
  const { data: session } = useSession()
  const [user, setUser] = useState({})
  const [isAddressDialoagOpen, setIsAddressDialoagOpen] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  //Form Management
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      pinCode: "",
      phone: "",
      payment: "cod",
      coupon: "",
    },
  });



  //get current user
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {

          const response = await axios.post("/api/fatch-user", { userId: session._id });
          console.log(response)
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

  //quantity of product increment and decrement
  const handleIncrement = () => {
    setUpdatedQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setUpdatedQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // prevent going below 1
  };


  //fatching product details
  useEffect(() => {
    setLoader(true)
    async function fetchProduct() {
      try {
        const response = await axios.get(`/api/fatch-single-product/${id}`);
        setProduct(response.data.product);

      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoader(false);
      }
    }

    fetchProduct();

  }, [id]);

  console.log(user)
  //on submit if user not avalible 
  const onSubmit = async (data) => {
    console.log("🛒 Order Data:", data);
    try {
      const response = await axios.post("/api/place-order", {
        productId: id,
        quantity: updatedQuantity,
        totalAmount: product.finalPrice,

        ...data
      });
      if (response.status === 200) {
        toast.success(response?.data?.message || "address added successfuly");
      } else {
        toast.success(response?.data?.message || "Error while Adding Address");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Unexpected Error");
    }
    finally {
      reset();
    }
  };


  //on submit if user avalible 
  const onSubmitIfUserAvailable = async (data) => {

    const selectedAddress = user.addresses[selectedAddressIndex];

    try {
      const response = await axios.post("/api/place-order", {
        productId: id,
        quantity: updatedQuantity,
        totalAmount: product.finalPrice,
        fullName: user.name,
        email: user.email,
        address: selectedAddress.address,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pinCode: selectedAddress.pinCode,
        phoneNo: selectedAddress.phoneNo,
        landmark: selectedAddress.landmark,
        paymentMethod: data.paymentMethod,
        promoCode: data.promoCode,
      });

      if (response.status === 200) {
        toast.success(response?.data?.message || "Order placed successfully");
      } else {
        toast.error(response?.data?.message || "Error placing order");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Unexpected Error");
    } finally {
      reset();
    }
  };


  //add address functionality
  const onSubmitAddAddress = async (data) => {

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
  
  //on submit if user avalible
  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-15 h-15 animate-spin " />
      </div>
    );
  }

  else if (session) {
    return (
      <>
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
          <form onSubmit={handleSubmit(onSubmitIfUserAvailable)} className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <h3 className="font-semibold text-gray-700 mb-2">Your Addresses</h3>
              {user?.addresses?.map((address, index) => (
                <label key={index} className="border p-4 rounded mb-2 block cursor-pointer">
                  <input
                    type="radio"
                    name="selectedAddress"
                    value={index}
                    checked={selectedAddressIndex === index}
                    onChange={() => setSelectedAddressIndex(index)}
                    className="mr-2"
                  />
                  <div>
                    <p><strong>Address:</strong> {address.address}</p>
                    <p><strong>City:</strong> {address.city}</p>
                    <p><strong>State:</strong> {address.state}</p>
                    <p><strong>Pin Code:</strong> {address.pinCode}</p>
                    <p><strong>Phone No:</strong> {address.phoneNo}</p>
                    <p><strong>Landmark:</strong> {address.landmark}</p>
                  </div>
                </label>
              ))}

              <button
                onClick={() => setIsAddressDialoagOpen(true)}
                className="bg-blue-400 text-white px-4 py-2 rounded"
              >
                Add Address
              </button>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" value="cash on delivery" {...register("paymentMethod")} />
                    Cash on Delivery (COD)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" value="razorpay" {...register("paymentMethod")} />
                    Razorpay (Online)
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Payment Method</h3>
                <input
                  {...register("landmark")}
                  placeholder="Landmark (Optional)"
                  className="w-full border rounded p-2"
                />
                {/* Promo Code */}
                <input
                  {...register("promoCode")}
                  placeholder="Enter Promo Code  (Optional)"
                  className="w-full border rounded p-2"
                />

              </div>
            </div>
            {/* oreder summary  */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div><span>Name: </span> <span>{product.productName}</span></div>
              <div><span>price: </span> <span>{product.price}</span></div>
              <div> <div>Qty: </div><div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="p-1 border rounded"
                >
                  <Minus size={16} />
                </button>

                <input
                  type="number"
                  value={updatedQuantity}
                  onChange={(e) => setUpdatedQuantity(Number(e.target.value))}
                  className="w-14 text-center border rounded"
                  min={1}
                />

                <button
                  type="button"
                  onClick={handleIncrement}
                  className="p-1 border rounded"
                >
                  <Plus size={16} />
                </button>
              </div>


                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 mt-6 rounded hover:bg-blue-700 transition-all text-sm disabled:opacity-50"
                  disabled={placingOrder}
                >
                  {placingOrder ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>

          </form>

          {isAddressDialoagOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md relative">
                <h2 className="text-xl font-semibold mb-4">Add New Address</h2>

                <form onSubmit={handleSubmit(onSubmitAddAddress)} className="space-y-4">
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
        </section>
      </>
    )
  }
  else if (!session) {
    return (
      <>
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipping Details */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

              <div className="space-y-4">
                <input
                  {...register("fullName", { required: "Name is required" })}
                  placeholder="Full Name"
                  className="w-full border rounded p-2"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <input
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email"
                  className="w-full border rounded p-2"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <input
                  {...register("address", { required: "Address is required" })}
                  placeholder="Address"
                  className="w-full border rounded p-2"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

                <div className="flex gap-4 w-full">
                  <div className="flex flex-col w-1/2">
                    <input
                      {...register("city", { required: "City is required" })}
                      placeholder="City"
                      className="w-full border rounded p-2"
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                  </div>

                  <div className="flex flex-col w-1/2">
                    <input
                      {...register("state", { required: "State is required" })}
                      placeholder="State"
                      className="w-full border rounded p-2"
                    />
                    {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                  </div>

                </div>
                <input
                  {...register("pinCode", { required: "PIN code is required" })}
                  placeholder="PIN Code"
                  className="w-full border rounded p-2"
                />
                {errors.pinCode && <p className="text-red-500 text-sm">{errors.pinCode.message}</p>}
                <input
                  {...register("phoneNo", { required: "Phone Number is required" })}
                  placeholder="Phone "
                  className="w-full border rounded p-2"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

                <input
                  {...register("landmark")}
                  placeholder="Landmark (Optional)"
                  className="w-full border rounded p-2"
                />
                {/* Promo Code */}
                <input
                  {...register("promoCode")}
                  placeholder="Enter Promo Code  (Optional)"
                  className="w-full border rounded p-2"
                />

              </div>


            </div>


            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>


              <div><span>Name: </span> <span>{product.productName}</span></div>
              <div><span>price: </span> <span>{product.price}</span></div>
              <div> <div>Qty: </div><div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="p-1 border rounded"
                >
                  <Minus size={16} />
                </button>

                <input
                  type="number"
                  value={updatedQuantity}
                  onChange={(e) => setUpdatedQuantity(Number(e.target.value))}
                  className="w-14 text-center border rounded"
                  min={1}
                />

                <button
                  type="button"
                  onClick={handleIncrement}
                  className="p-1 border rounded"
                >
                  <Plus size={16} />
                </button>
              </div>


                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 mt-6 rounded hover:bg-blue-700 transition-all text-sm disabled:opacity-50"
                  disabled={placingOrder}
                >
                  {placingOrder ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" value="cash on delivery" {...register("paymentMethod")} />
                    Cash on Delivery (COD)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" value="razorpay" {...register("paymentMethod")} />
                    Razorpay (Online)
                  </label>
                </div>
              </div>
            </div>
          </form>
        </section>
      </>
    )
  }
  else {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="w-15 h-15 animate-spin " />
        </div>
      </>
    )
  }
}
