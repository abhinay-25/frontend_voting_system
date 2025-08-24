"use client"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  CheckCircle,
  Clock,
  Vote,
  Shield,
  Fingerprint,
  AlertCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/store/auth"

export default function OverviewPage() {
  const { user } = useAuthStore()

  const upcomingElection = {
    id: "1",
    title: "Presidential Election 2024",
    date: "November 1, 2024",
    timeRemaining: "2 days",
    status: "active",
  }

  const recentActivity = [
    {
      id: "1",
      type: "vote_cast",
      title: "Vote cast in School Board Election",
      timestamp: "2 hours ago",
      icon: Vote,
      status: "confirmed",
    },
    {
      id: "2",
      type: "biometric_enrolled",
      title: "Biometric enrollment completed",
      timestamp: "1 day ago",
      icon: Fingerprint,
      status: "success",
    },
    {
      id: "3",
      type: "kyc_approved",
      title: "KYC verification approved",
      timestamp: "3 days ago",
      icon: Shield,
      status: "success",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name?.split(" ")[0]}!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your voting account and upcoming elections.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">KYC Verification</span>
                <Badge variant={user?.kycVerified ? "default" : "secondary"}>
                  {user?.kycVerified ? "Verified" : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Biometrics</span>
                <Badge variant={user?.biometricsEnrolled ? "default" : "outline"}>
                  {user?.biometricsEnrolled ? "Enrolled" : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Voting Status</span>
                <Badge variant={user?.status === "approved" ? "default" : "secondary"}>
                  {user?.status === "approved" ? "Eligible" : "Pending"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Election</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">{upcomingElection.timeRemaining}</div>
              <p className="text-sm text-muted-foreground">{upcomingElection.title}</p>
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{upcomingElection.date}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">85%</div>
              <p className="text-sm text-muted-foreground">Voting participation rate</p>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Election Card */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Next Eligible Election</CardTitle>
                <CardDescription>Don't miss your chance to vote</CardDescription>
              </div>
              <Badge variant="default" className="gradient-primary text-white">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground">{upcomingElection.title}</h3>
              <p className="text-sm text-muted-foreground">
                National presidential election to elect the next president of the country.
              </p>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{upcomingElection.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Ends in {upcomingElection.timeRemaining}</span>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Ready to vote? Your account is verified and eligible.</div>
              <Button asChild className="gradient-primary">
                <Link href="/app/elections/1">
                  Vote Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>Your latest voting and account activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      activity.status === "confirmed" || activity.status === "success"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-yellow-500/10 text-yellow-600",
                    )}
                  >
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                  <div className="flex items-center">
                    {activity.status === "confirmed" || activity.status === "success" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/app/history">
                View All Activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      {(!user?.biometricsEnrolled || !user?.kycVerified) && (
        <Card className="glass-card border-yellow-200 dark:border-yellow-800">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-xl">Complete Your Setup</CardTitle>
            </div>
            <CardDescription>Complete these steps to ensure you can participate in all elections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {!user?.kycVerified && (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Complete KYC Verification</p>
                      <p className="text-sm text-muted-foreground">Verify your identity to vote</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Verify Now
                  </Button>
                </div>
              )}

              {!user?.biometricsEnrolled && (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Fingerprint className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Enroll Biometrics</p>
                      <p className="text-sm text-muted-foreground">Add face and fingerprint verification</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/app/enroll">Enroll Now</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
