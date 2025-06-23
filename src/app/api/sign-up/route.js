import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 3, // max 3 attempts
  duration: 1600, // per 15 minutes
});


export async function POST(request){
 await dbConnect();
 
 try{
    const {name, email, password} = await request.json();
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const key = `${email}_${ip}`;
    
     
    try {
      await rateLimiter.consume(key);
    } catch (rateLimit) {
      const retryMin = Math.round(rateLimit.msBeforeNext / (1000 * 60));
      return Response.json(
        {
          success: false,
          message: `Too many attempts. Try again in ${retryMin} Minutes.`,
        },
        { status: 429 }
      );
    }


    const existingByEmail= await UserModel.findOne({
        email,
    })
     const verificationCode = Math.floor(100000+ Math.random()* 900000).toString();
    if(existingByEmail){
       if(existingByEmail.isVerified){
        return Response.json(
            {
                success: false,
                message: "Email is already taken"
            },{status: 400}
        );
   b  }
     else{
        const hashedPassword = await bcrypt.hash(password, 10);
        existingByEmail.password = hashedPassword;
        existingByEmail.verificationCode = verificationCode;
         existingByEmail.name = name;
        existingByEmail.verificationCodeExpiry = new Date(Date.now() + 300000)
        await existingByEmail.save();
     }
    }
    
   else {
     
     const verificationCodeExpiry = new Date();
     verificationCodeExpiry.setMinutes(verificationCodeExpiry.getMinutes() + 5);


      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        verificationCode,
        isVerified: false,
        credential: "emailPassword",
        verificationCodeExpiry
      });

      await newUser.save();
    }

//sending verification code to user

 const emailResponse = await sendVerificationEmail(
  email,
  name,
  verificationCode
 )
 console.log(emailResponse)
if(!emailResponse.success){
    return Response.json(
      {
        success: false,
        message: emailResponse.message,
      },
      { status: 500 }
    );
}
    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please verify your account.',
      },
      { status: 201 }
    );
 }catch (error){
  console.log('Error while registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error while registering user',
      },
      { status: 500 }
    );
 }

}