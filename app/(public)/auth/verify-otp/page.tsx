"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Vote, Loader2, AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { useUiStore } from "@/store/ui"

export default function VerifyOTPPage() {
  const router = useRouter()
  const { addToast } = useUiStore()

  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [resendCooldown, setResendCooldown] = useState(0)

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock verification logic
      if (otp === "123456") {
        addToast({
          title: "Verification successful!",
          description: "Your account has been verified.",
          type: "success",
        })
        router.push("/app/overview")
      } else {
        setError("Invalid verification code. Please try again.")
      }
    } catch (error) {
      setError("Verification failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setResendCooldown(60) // 60 second cooldown

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addToast({
        title: "Code sent!",
        description: "A new verification code has been sent to your email.",
        type: "success",
      })
    } catch (error) {
      addToast({
        title: "Failed to send code",
        description: "Please try again later.",
        type: "error",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <Vote className="h-6 w-6 text-white" />
            </div>
            <span className="font-serif text-2xl font-bold text-foreground">AVAx Vote</span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground">Verify your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">Enter the 6-digit code sent to your email</p>
        </div>

        {/* Verification Form */}
        <Card className="glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Enter verification code</CardTitle>
            <CardDescription className="text-center">We've sent a 6-digit code to your email address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} disabled={isLoading}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerify}
                className="w-full gradient-primary"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify Account
                  </>
                )}
              </Button>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">Didn't receive the code?</p>

              <Button variant="outline" onClick={handleResend} disabled={resendCooldown > 0} className="w-full">
                {resendCooldown > 0 ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend in {resendCooldown}s
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend Code
                  </>
                )}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                For demo purposes, use code: <strong>123456</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to login */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Need to use a different email?{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
