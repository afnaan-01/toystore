export default async function handleRazorpay({ amount, name, email, contact },placeOrder,addressData,data) {
  if (typeof window === "undefined") return;

  try {
    // Step 1: Create Razorpay order by calling your backend API
    const res = await fetch("/api/razorpay-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }), // amount in INR
    });

    const order = await res.json();

    if (!order.id) {
      throw new Error("Failed to create Razorpay order");
    }

    // Step 2: Launch Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // from .env
      amount: order.amount,
      currency: order.currency,
      name: "Your Company",
      description: "Test Transaction",
      image: "/logo.png", // Optional
      order_id: order.id,
      handler: function (response) {
        // Handle success (e.g., send to backend or show success UI)
        console.log("Payment success:", response);
        alert("Payment successful!");
        placeOrder(
            addressData,
            data,
            {paymentId: response.razorpay_payment_id,paymentStatus: "completed"});
      },
      prefill: {
        name: name || "Test User",
        email: email || "test@example.com",
        contact: contact || "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Payment failed. Please try again.");
  }
}
