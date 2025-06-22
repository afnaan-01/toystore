import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";


export async function POST(request) {
    await dbConnect();

    try {
        const { userId } = await request.json();
        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'There are no User present',
            }, { status: 400 });
        }
        return NextResponse.json({
            success: true,
            user: user,
        }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'Unexpected error occurred',
        }, { status: 500 });
    }
}