import dbConnect from "@/lib/dbConnect";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return NextResponse.json({
        success: false,
        message: "Product not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      product,
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({
      success: false,
      message: "Server error",
    }, { status: 500 });
  }
}
