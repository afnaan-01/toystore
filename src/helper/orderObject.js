

sampleOrderObject = {
  _id: "ts_1001", // unique order ID (MongoDB ObjectId or custom)

  user: {
    id: "user_123",
    name: "Shaikh Sahil",
    email: "sahil@example.com"
  },

    product:{
      productId: "pro17537e3rduw763",
      name: "Remote Control Car",
      quantity: 3,
    },

  shippingAddress: {
    fullName: "Shaikh Sahil",
    phone: "9876543210",
    email: "sahil@example.com",
    address: "123 Degloor Naka",
    city: "Nanded",
    state: "Maharashtra",
    picCode: "431605",
    country: "India"
  },

  paymentMethod: "Razorpay", // or "COD", "Stripe"

  paymentInfo: {
    id: "pay_123abc", // Razorpay or Stripe transaction ID
    status: "Completed"
  },

  pricing: {
    productAmount: 200,
    shippingCharges: 0,
    tax: 0,
    totalAmount: 600
  },

  orderStatus: "Processing", // or: "Shipped", "Delivered", "Cancelled"
  isPaid: true,
  isDelivered: false,

  orderedAt: "2025-06-15T15:35:00Z", //full DateTime
  deliveredAt: null
}
