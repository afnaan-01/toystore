import dbConnect from "@/lib/dbConnect";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();

    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid or empty data array" },
        { status: 400 }
      );
    }

    const ids = body.map((item) => item.id);
    console.log(ids)
    const products = await productModel.find({ _id: { $in: ids } });

    return NextResponse.json(
      {
        success: true,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
