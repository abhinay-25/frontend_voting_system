"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Fingerprint, Shield, CheckCircle, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export default function EnrollPage() {
  const [faceEnrollment, setFaceEnrollment] = useState({
    status: "not_started", // not_started, in_progress, completed, failed
    progress: 0,
  })

  const [fingerprintEnrollment, setFingerprintEnrollment] = useState({
    status: "completed",
    progress: 100,
  })

  const handleFaceEnrollment = () => {
    setFaceEnrollment({ status: "in_progress", progress: 0 })

    // Simulate enrollment progress
    const interval = setInterval(() => {
      setFaceEnrollment((prev) => {
        if (prev.progress >= 100) {
          clearInterval(interval)
          return { status: "completed", progress: 100 }
        }
        return { ...prev, progress: prev.progress + 10 }
      })
    }, 500)
  }

  const handleFingerprintEnrollment = () => {
    setFingerprintEnrollment({ status: "in_progress", progress: 0 })

    const interval = setInterval(() => {
      setFingerprintEnrollment((prev) => {
        if (prev.progress >= 100) {
          clearInterval(interval)
          return { status: "completed", progress: 100 }
        }
        return { ...prev, progress: prev.progress + 20 }
      })
    }, 300)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Enrolled</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">In Progress</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Not Started</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Biometric Enrollment
        </h1>
        <p className="text-muted-foreground mt-2">Secure your voting identity with biometric verification</p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Your biometric data is encrypted and stored securely on the blockchain. It cannot be accessed or used for any
          purpose other than voting verification.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Face Recognition */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-indigo-600" />
                  <CardTitle>Face Recognition</CardTitle>
                </div>
                {getStatusBadge(faceEnrollment.status)}
              </div>
              <CardDescription>Enroll your face for secure biometric verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                {faceEnrollment.status === "not_started" && (
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Camera preview will appear here</p>
                  </div>
                )}
                {faceEnrollment.status === "in_progress" && (
                  <div className="text-center">
                    <div className="animate-pulse">
                      <Camera className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
                    </div>
                    <p className="text-sm">Capturing facial features...</p>
                  </div>
                )}
                {faceEnrollment.status === "completed" && (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-600">Face enrollment completed!</p>
                  </div>
                )}
              </div>

              {faceEnrollment.status === "in_progress" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{faceEnrollment.progress}%</span>
                  </div>
                  <Progress value={faceEnrollment.progress} />
                </div>
              )}

              <div className="flex justify-center">
                {faceEnrollment.status === "not_started" && (
                  <Button onClick={handleFaceEnrollment} className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Start Face Enrollment
                  </Button>
                )}
                {faceEnrollment.status === "completed" && (
                  <Button
                    variant="outline"
                    onClick={() => setFaceEnrollment({ status: "not_started", progress: 0 })}
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Re-enroll Face
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fingerprint */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Fingerprint className="h-5 w-5 text-purple-600" />
                  <CardTitle>Fingerprint</CardTitle>
                </div>
                {getStatusBadge(fingerprintEnrollment.status)}
              </div>
              <CardDescription>Enroll your fingerprint for additional security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                {fingerprintEnrollment.status === "not_started" && (
                  <div className="text-center">
                    <Fingerprint className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Place finger on sensor</p>
                  </div>
                )}
                {fingerprintEnrollment.status === "in_progress" && (
                  <div className="text-center">
                    <div className="animate-pulse">
                      <Fingerprint className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                    </div>
                    <p className="text-sm">Scanning fingerprint...</p>
                  </div>
                )}
                {fingerprintEnrollment.status === "completed" && (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-600">Fingerprint enrolled successfully!</p>
                  </div>
                )}
              </div>

              {fingerprintEnrollment.status === "in_progress" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{fingerprintEnrollment.progress}%</span>
                  </div>
                  <Progress value={fingerprintEnrollment.progress} />
                </div>
              )}

              <div className="flex justify-center">
                {fingerprintEnrollment.status === "not_started" && (
                  <Button onClick={handleFingerprintEnrollment} className="w-full">
                    <Fingerprint className="h-4 w-4 mr-2" />
                    Start Fingerprint Enrollment
                  </Button>
                )}
                {fingerprintEnrollment.status === "completed" && (
                  <Button
                    variant="outline"
                    onClick={() => setFingerprintEnrollment({ status: "not_started", progress: 0 })}
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Re-enroll Fingerprint
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Security Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security & Privacy</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">How it works</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Biometric data is encrypted using AES-256</li>
                <li>• Templates are stored on blockchain, not raw data</li>
                <li>• Multi-factor verification for enhanced security</li>
                <li>• Data cannot be reverse-engineered</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Your privacy</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Data is never shared with third parties</li>
                <li>• Used only for voting verification</li>
                <li>• You can delete your data anytime</li>
                <li>• Compliant with privacy regulations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
