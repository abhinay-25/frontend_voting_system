"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Vote, Users, UserCheck, TrendingUp, AlertTriangle, Activity, Calendar, Shield, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useAdminStore } from "@/store/admin"
import { useElectionsStore } from "@/store/elections"

export default function AdminDashboard() {
  const { kpiData, systemHealth, fetchKpiData, fetchSystemHealth, isLoading } = useAdminStore()
  const { elections, fetchElections } = useElectionsStore()

  useEffect(() => {
    fetchKpiData()
    fetchSystemHealth()
    fetchElections()
  }, [fetchKpiData, fetchSystemHealth, fetchElections])

  const stats = [
    {
      title: "Active Elections",
      value: kpiData?.activeElections?.toString() || "0",
      change: "+1 from last month",
      icon: Vote,
      color: "text-blue-600",
    },
    {
      title: "Total Voters",
      value: kpiData?.totalVoters?.toLocaleString() || "0",
      change: "+2,341 this month",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Votes Cast",
      value: kpiData?.votesCast?.toLocaleString() || "0",
      change: "71% turnout rate",
      icon: UserCheck,
      color: "text-purple-600",
    },
    {
      title: "System Health",
      value: systemHealth?.blockchain?.status === "healthy" ? "99.9%" : "N/A",
      change: "Last 30 days",
      icon: Activity,
      color: "text-orange-600",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "New election created",
      details: "2024 City Council Election",
      time: "2 hours ago",
      type: "election",
    },
    {
      id: 2,
      action: "Voter registration approved",
      details: "Sarah Johnson (ID: VID-2024-789)",
      time: "4 hours ago",
      type: "voter",
    },
    {
      id: 3,
      action: "Security alert resolved",
      details: "Failed login attempts from IP 192.168.1.100",
      time: "6 hours ago",
      type: "security",
    },
    {
      id: 4,
      action: "Candidate profile updated",
      details: "John Smith - Presidential Election",
      time: "8 hours ago",
      type: "candidate",
    },
  ]

  const votingTrends = [
    { month: "Jan", votes: 12000 },
    { month: "Feb", votes: 15000 },
    { month: "Mar", votes: 18000 },
    { month: "Apr", votes: 22000 },
    { month: "May", votes: 25000 },
    { month: "Jun", votes: 28000 },
  ]

  const electionStatus = [
    { name: "Active", value: elections.filter((e) => e.status === "active").length, color: "#22c55e" },
    { name: "Upcoming", value: elections.filter((e) => e.status === "upcoming").length, color: "#3b82f6" },
    { name: "Completed", value: elections.filter((e) => e.status === "closed").length, color: "#6b7280" },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Overview of election system performance and activity</p>
        </div>
        <Card className="glass-card">
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading dashboard data...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">Overview of election system performance and activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Voting Trends</CardTitle>
            <CardDescription>Monthly voting activity over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={votingTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="votes" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Election Status</CardTitle>
            <CardDescription>Current distribution of elections by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={electionStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {electionStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {activity.type === "election" && <Vote className="h-4 w-4 text-blue-600 mt-0.5" />}
                    {activity.type === "voter" && <Users className="h-4 w-4 text-green-600 mt-0.5" />}
                    {activity.type === "security" && <Shield className="h-4 w-4 text-red-600 mt-0.5" />}
                    {activity.type === "candidate" && <UserCheck className="h-4 w-4 text-purple-600 mt-0.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Election Deadline Approaching
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    2024 Presidential Election ends in 3 days
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <Calendar className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Scheduled Maintenance</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    System maintenance scheduled for Sunday 2:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">High Voter Turnout</p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Current turnout rate is 15% above average
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Vote className="h-6 w-6" />
              <span>Create Election</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span>Manage Voters</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Shield className="h-6 w-6" />
              <span>Security Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
