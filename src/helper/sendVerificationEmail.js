import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { toast } from "sonner";


export async function  sendVerificationEmail(email, name, verificationCode ) {
    try {
        await resend.emails.send({
            from: 'kiddotoy.shop',
            to: email,
            subject: 'toyweb | Verification code',
            react: VerificationEmail({name, otp:verificationCode })
        })
        return {success: true, message: "Verification Email Send Successfully"}
    } catch (error) {
        toast.error("Error sending verfication email", error)
        return {success: false, message: "failed to send Verfication Email ! Please try again leater."}
    }
}