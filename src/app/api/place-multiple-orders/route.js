import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import orderModel from "@/models/orderModel";
import { NextResponse } from "next/server";

// Order ID Generator Function
function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomStr = '';
  for (let i = 0; i < 5; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ORD-${randomStr}`;
}

// Generate truly unique order ID
async function generateUniqueOrderId() {
  let unique = false;
  let orderId;

  while (!unique) {
    orderId = generateOrderId();
    const existing = await orderModel.findOne({ orderId });
    if (!existing) {
      unique = true;
    }
  }

  return orderId;
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  await dbConnect();

  try {
    const {
      fullName,
      email,
      paymentMethod,
      products,
      address,
      city,
      state,
      landmark,
      phoneNo,
      pinCode,
      paymentId,
      paymentstatus,
      shippingCharges,
      tax,
    } = await request.json();

    const phoneNoInt = parseInt(phoneNo);
    const pinCodeInt = parseInt(pinCode);

    const createdOrders = [];

    for (const product of products) {
      const orderId = await generateUniqueOrderId();
   console.log(product);
      const newOrder = new orderModel({
        orderId,
        user: {
          id: session?._id || null,
          name: session?.user?.name || null,
          email: session?.user?.email || null,
        },
        shippingAddress: {
          fullName,
          email,
          countryCode: "+91",
          phoneNo: phoneNoInt,
          address,
          city,
          state,
          country: "India",
          pinCode: pinCodeInt,
          landmark,
        },
        product: {
          productId: product._id,
          quantity: product.quantity,  
        },
        paymentMethod,
        paymentInfo: {
          paymentId,
          paymentstatus,
        },
        pricing: {
          productAmount: product.finalPrice,
          shippingCharges,
          tax,
          totalAmount: product.finalPrice * product.quantity,  
        },
        orderAt: Date.now()
      });

      await newOrder.save();
      createdOrders.push(newOrder);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Orders placed successfully.",
        orders: createdOrders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while placing orders:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while placing orders.",
      },
      { status: 500 }
    );
  }
}
