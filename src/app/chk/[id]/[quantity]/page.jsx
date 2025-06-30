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
  const [checkoutAmount, setCheckoutAmount] = useState();
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
    // if (!isUserfetched) return;

    if ((!session || !user || user?.addresses?.length === 0)) {
      setIsAddressDialoagOpen(true);
      console.log("Dialog:", isAddressDialoagOpen);
    }
  }, [user, session, isUserfetched, setIsUserFetched]);

  //quantity of product increment and decrement
  const handleIncrement = (id) => {
    setProductItems((prev) => prev.map((produt) => produt._id == id ? { ...produt, quantity: Number(produt.quantity) + 1 } : produt));
  };

  const handleDecrement = (id) => {
    setProductItems((prev) => prev.map((produt) => produt.quantity > 1 && produt._id == id ? { ...produt, quantity: produt.quantity - 1 } : produt));
  };

  //fatching product details
  useEffect(() => {
    setLoader(true);
    async function fetchProduct() {
      try {
        const response = await axios.post(`/api/fatch-multiple-product`, checkoutCollection);
        console.log("Response", response.data);
        const mergedArray = response.data.products.map((product) => {
          const pr = checkoutCollection.find(p => p.id == product._id);

          return product ? { ...product, quantity: pr.quantity } : null;
        })
        setProductItems(mergedArray);
      } catch (error) {
        toast.error("Failed to load product");
        console.log("Error", error.response);
      } finally {
        setLoader(false);
      }
    }

    if (checkoutCollection.length > 0) {
      fetchProduct();
    }

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

    // console.log("allProducts:",allProdcuts);

    try {
      const response = await axios.post("/api/place-multiple-orders", {
        ...addressData,
        paymentMethod: data.paymentMethod,
        paymentId: paymentInfo?.paymentId || "rzp123",
        paymentstatus: paymentInfo?.paymentStatus || "pending",
        shippingCharges: 0,
        tax: 0,
        isPaid: paymentInfo?.paymentStatus == "completed" ? true : false,
        products: productItems
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
        amount: checkoutAmount,
        name: addressData.fullName,
        email: addressData.email,
        contact: addressData.contact
      }, placeOrder, addressData, data);

    }
    else {
      placeOrder(addressData, data);
    }
  };

  useEffect(() => {
    const amount = productItems.reduce((sum, product) => {
      return sum + product.finalPrice * product.quantity;
    }, 0)
    setCheckoutAmount(amount);
  }, [productItems])

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
              <div>
                {
                  productItems?.map((item, index) => {
                    return (<div key={index} className="mt-2">
                      <div><span>Name: </span> <span>{item?.productName}</span></div>
                      <div className="flex justify-between">

                        <div><span>Price: </span> <span>{item?.finalPrice}</span></div>
                        <div><span>quantity: </span> <span>{item?.quantity}</span></div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement(item._id)}
                            className="p-1 border rounded"
                          >
                            <Minus size={16} />
                          </button>

                          <input
                            type="number"
                            value={item?.quantity}
                            onChange={(e) => setProductItems(prev => prev.map(product =>
                              product._id == item._id ? { ...product, quantity: e.target.value } : product))}
                            className="w-14 text-center border rounded"
                            min={1}
                          />

                          <button
                            type="button"
                            onClick={() => handleIncrement(item._id)}
                            className="p-1 border rounded"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>)
                  })
                }
              </div>
              <div>
                <div>Total Amount : <span>{`${checkoutAmount}`}</span></div>



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
