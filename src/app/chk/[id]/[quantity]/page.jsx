"use client";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Loader2, Minus, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import AddressForm from "./AddressForm";
import useCart from "@/allContext/cart";
import handleRazorpay from "./handleRazorpay";
import { useRouter } from "next/navigation";


export default function CheckoutPage({ params }) {
  const { id, quantity } = React.use(params);
  const { cartItems } = useCart();
  const [checkoutCollection, setCheckoutCollection] = useState([]);
  const [productItems, setProductItems] = useState([{}]);
  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState({})
  const [updatedQuantity, setUpdatedQuantity] = useState(Number(quantity) || 1);
  const [placingOrder, setPlacingOrder] = useState(false);
  const { data: session } = useSession()
  const [user, setUser] = useState({})
  const [isAddressDialoagOpen, setIsAddressDialoagOpen] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [isUserfetched, setIsUserFetched] = useState(false);

  const router = useRouter();

  //Form Management
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
      email: "",
      address: "",
      city: "",
      pinCode: "",
      payment: "cod",
    },
  });

  useEffect(() => {
    if (id == 'cart') {
      console.log('cart:')
      console.log(cartItems);
      setCheckoutCollection(cartItems);
    }
    else {
      console.log("id", id);
      console.log("quantiy", quantity);
      setCheckoutCollection([{ id: id, quantity: quantity }])
    }
  }, [cartItems])


  //get current user
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const response = await axios.post("/api/fatch-user", { userId: session._id });
          console.log(response)
          if (response.status === 200) {
            setUser(response.data.user);
            setIsUserFetched(true);
          }
        } catch (error) {
          console.log(error)
        }
      }
    };

    fetchData(); // Call the inner async function
  }, [session]);

  //dialog box setter if user || session || address updated
  useEffect(() => {
    if (!isUserfetched) return;

    if ((!session || !user || user?.addresses?.length === 0)) {
      setIsAddressDialoagOpen(true);
      console.log(isAddressDialoagOpen)
    }
  }, [user, session])

  //quantity of product increment and decrement
  const handleIncrement = () => {
    setUpdatedQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setUpdatedQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // prevent going below 1
  };

  //fatching product details
  useEffect(() => {
    setLoader(true);
    async function fetchProduct(id, quantity, index) {
      console.log(index);
      try {
        const response = await axios.get(`/api/fatch-single-product/${id}`);
        setProduct(response.data.product);
        setProductItems([...productItems, { product: response.data.product, quantity: quantity }])
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        if (index == checkoutCollection.length - 1) {
          setLoader(false);
        }
      }
    }

    checkoutCollection.forEach((elm, index) => {
      fetchProduct(elm.id, elm.quantity, index);
    });

  }, [checkoutCollection]);

  useEffect(() => {
    console.log("chechoutCollection", checkoutCollection);
    console.log("productItems", productItems);

  }, [productItems]);

  //add address functionality
  const addAddress = async (data) => {

    try {
      const response = await axios.post("/api/add-address", data);
      if (response.status === 200) {
        toast.success(response?.data?.message || "address added for user");
      } else {
        toast.success(response?.data?.message || "Error while Adding Address");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    finally {
      reset();
    }
  };

  const placeOrder = async (addressData, data, paymentInfo) => {
    setPlacingOrder(true);

    try {
      const response = await axios.post("/api/place-order", {
        ...addressData,
        paymentMethod: data.paymentMethod,
        productId: id,
        quantity: quantity,
        totalAmount: (product.finalPrice * quantity),
        paymentId: paymentInfo?.paymentId || "rzp123",
        paymentstatus: paymentInfo?.paymentStatus || "pending",
        productAmount: product.finalPrice,
        shippingCharges: 0,
        tax: 0,
      });
      if (response.status === 200) {
        toast.success(response?.data?.message || "Order Placed successfuly");
        if (user && user?.addresses?.length < 3 && isAddressDialoagOpen) {
          await addAddress(data);
        }
        router.push("/order-done");
      } else {
        toast.success(response?.data?.message || "Error while Adding Address");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Unexpected Error");
    }
    finally {
      setPlacingOrder(false);
      reset();
    }
  }

  console.log(user)
  //on submit if user not avalible 
  const onSubmit = async (data) => {

    console.log("🛒 Order Data:", data);
    const addressData = isAddressDialoagOpen ? data : user.addresses[selectedAddressIndex];
    console.log("🛒 Address Data:", addressData);

    if (watch("paymentMethod") == "razorpay") {
      await handleRazorpay({
        amount: 2000,
        name: "Abdul Aaquib",
        email: "aquib123@gmail.com",
        contact: "9049929292"
      }, placeOrder, addressData, data);

    }
    else {
      placeOrder(addressData, data);
    }
  };

  //on submit if user avalible 


  //on submit if user avalible
  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-15 h-15 animate-spin " />
      </div>
    );
  }

  else if (session || !session) {
    return (
      <>
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {(user && user?.addresses?.length > 0) && (
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
                      <p><strong>Full Name:</strong> {address?.fullName || "No Name"}</p>
                      <p><strong>Email:</strong> {address?.email || "NO Email"}</p>
                      <p><strong>Address:</strong> {address.address}</p>
                      <p><strong>City:</strong> {address.city}</p>
                      <p><strong>State:</strong> {address.state}</p>
                      <p><strong>Pin Code:</strong> {address.pinCode}</p>
                      <p><strong>Phone No:</strong> {address.phoneNo}</p>
                      <p><strong>Landmark:</strong> {address.landmark}</p>
                    </div>
                  </label>
                ))}

                {(user.addresses.length < 3) && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddressDialoagOpen(true);
                      console.log(isAddressDialoagOpen);
                    }}
                    className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded"
                  >
                    Add Address
                  </button>
                )}
              </div>
            )}




            {/* Shipping Details */}

            {(isAddressDialoagOpen) && (<AddressForm register={register} errors={errors} />)}



            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {
                productItems?.map((product) => {
                  return (<>
                    <div><span>Name: </span> <span>{product.productName}</span></div>
                    <div><span>price: </span> <span>{product.finalPrice}</span></div>
                  </>)
                })
              }

              <div>
                <div>Qty: </div>
                <div className="flex items-center gap-2">
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
                  {/* {placingOrder ? "Placing Order..." : "Place Order"} */}
                  {watch("paymentMethod") == "cod" ? "Place Order" : "Pay Now"}
                </button>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" value="cod" {...register("paymentMethod", { required: "Select payment Method" })} defaultChecked />
                    Cash on Delivery (COD)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" value="razorpay"
                      {...register("paymentMethod", { required: "Select payment Method" })}
                    />
                    Razorpay (Online)
                  </label>
                  {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
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
