"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Users, Vote, Clock, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export default function ResultsPage() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const presidentialResults = [
    { name: "John Smith", votes: 45230, percentage: 52.3, color: "#6366f1" },
    { name: "Sarah Johnson", votes: 38450, percentage: 44.5, color: "#8b5cf6" },
    { name: "Mike Davis", votes: 2780, percentage: 3.2, color: "#06b6d4" },
  ]

  const cityCouncilResults = [
    { name: "Lisa Chen", votes: 12450, percentage: 38.2 },
    { name: "Robert Wilson", votes: 10230, percentage: 31.4 },
    { name: "Maria Garcia", votes: 9890, percentage: 30.4 },
  ]

  const liveStats = {
    totalVotes: 86460,
    eligibleVoters: 125000,
    turnoutRate: 69.2,
    lastUpdated: "2 minutes ago",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Live Results
          </h1>
          <p className="text-muted-foreground mt-2">Real-time election results updated every minute</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Vote className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-2xl font-bold">{liveStats.totalVotes.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Votes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{liveStats.eligibleVoters.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Eligible Voters</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{liveStats.turnoutRate}%</p>
                  <p className="text-sm text-muted-foreground">Turnout Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">{liveStats.lastUpdated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="presidential" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="presidential">Presidential Election</TabsTrigger>
          <TabsTrigger value="local">Local Elections</TabsTrigger>
        </TabsList>

        <TabsContent value="presidential" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Vote Distribution</CardTitle>
                <CardDescription>Real-time vote counts and percentages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {presidentialResults.map((candidate, index) => (
                    <motion.div
                      key={candidate.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{candidate.name}</span>
                        <div className="text-right">
                          <div className="font-bold">{candidate.votes.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{candidate.percentage}%</div>
                        </div>
                      </div>
                      <Progress value={candidate.percentage} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Visual Breakdown</CardTitle>
                <CardDescription>Pie chart representation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={presidentialResults}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="votes"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {presidentialResults.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="local" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>City Council Results</CardTitle>
              <CardDescription>Local election results</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cityCouncilResults}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
