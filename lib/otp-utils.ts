import nodemailer from "nodemailer"

// Generate a random 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Send OTP via email
export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    // In a real application, you would use environment variables for these credentials
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password",
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: email,
      subject: "Your LegalSathi Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #1a365d; text-align: center;">LegalSathi</h2>
          <h3 style="text-align: center;">Your Verification Code</h3>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h1 style="font-size: 32px; letter-spacing: 5px; color: #1a365d;">${otp}</h1>
          </div>
          <p style="text-align: center; color: #64748b;">This code will expire in 10 minutes.</p>
          <p style="text-align: center; color: #64748b;">If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    }

    // For development, log the OTP instead of sending an email
    console.log(`OTP for ${email}: ${otp}`)

    // Uncomment this in production
    // await transporter.sendMail(mailOptions)

    return true
  } catch (error) {
    console.error("Error sending OTP email:", error)
    return false
  }
}

// For demo purposes, we'll simulate OTP verification
export function verifyOTP(userOTP: string, storedOTP: string): boolean {
  // In a real application, you would also check if the OTP has expired
  return userOTP === storedOTP
}
