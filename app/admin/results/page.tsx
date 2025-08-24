"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Trophy, Users, TrendingUp, Download, Eye, Calendar } from "lucide-react"

export default function ResultsPage() {
  const [selectedElection, setSelectedElection] = useState("city-council-2024")

  // Mock data
  const elections = [
    { id: "city-council-2024", name: "City Council Election 2024", status: "completed" },
    { id: "school-board-2024", name: "School Board Election 2024", status: "active" },
    { id: "state-rep-2024", name: "State Representative Election 2024", status: "upcoming" },
  ]

  const electionResults = {
    "city-council-2024": {
      totalVotes: 15847,
      turnout: 68.2,
      candidates: [
        { name: "Sarah Johnson", party: "Democratic", votes: 6234, percentage: 39.3, color: "#3b82f6" },
        { name: "Michael Chen", party: "Republican", votes: 5891, percentage: 37.2, color: "#ef4444" },
        { name: "Emily Rodriguez", party: "Independent", votes: 2456, percentage: 15.5, color: "#10b981" },
        { name: "David Kim", party: "Green", votes: 1266, percentage: 8.0, color: "#f59e0b" },
      ],
      demographics: [
        { age: "18-29", votes: 2847, percentage: 18.0 },
        { age: "30-44", votes: 4756, percentage: 30.0 },
        { age: "45-59", votes: 5234, percentage: 33.0 },
        { age: "60+", votes: 3010, percentage: 19.0 },
      ],
      timeline: [
        { time: "09:00", votes: 1234 },
        { time: "12:00", votes: 4567 },
        { time: "15:00", votes: 8901 },
        { time: "18:00", votes: 12456 },
        { time: "20:00", votes: 15847 },
      ],
    },
  }

  const currentElection = elections.find((e) => e.id === selectedElection)
  const results = electionResults[selectedElection as keyof typeof electionResults]

  const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Election Results</h1>
          <p className="text-muted-foreground">View detailed results and analytics for all elections</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Live View
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Election Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Election</CardTitle>
          <CardDescription>Choose an election to view detailed results</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedElection} onValueChange={setSelectedElection}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select an election" />
            </SelectTrigger>
            <SelectContent>
              {elections.map((election) => (
                <SelectItem key={election.id} value={election.id}>
                  <div className="flex items-center gap-2">
                    {election.name}
                    <Badge
                      variant={
                        election.status === "completed"
                          ? "default"
                          : election.status === "active"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {election.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {results && (
        <>
          {/* Overview Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results.totalVotes.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Votes cast</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Turnout Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results.turnout}%</div>
                <p className="text-xs text-muted-foreground">Of registered voters</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leading Candidate</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results.candidates[0].name}</div>
                <p className="text-xs text-muted-foreground">{results.candidates[0].percentage}% of votes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Badge variant={currentElection?.status === "completed" ? "default" : "secondary"}>
                    {currentElection?.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Election status</p>
              </CardContent>
            </Card>
          </div>

          {/* Candidate Results */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Results</CardTitle>
                <CardDescription>Vote distribution by candidate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.candidates.map((candidate, index) => (
                    <div key={candidate.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: candidate.color }} />
                          <span className="font-medium">{candidate.name}</span>
                          <Badge variant="outline">{candidate.party}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{candidate.votes.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{candidate.percentage}%</div>
                        </div>
                      </div>
                      <Progress value={candidate.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vote Distribution</CardTitle>
                <CardDescription>Visual breakdown of results</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={results.candidates}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="votes"
                    >
                      {results.candidates.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Demographics and Timeline */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
                <CardDescription>Voter turnout by age group</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results.demographics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="votes" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voting Timeline</CardTitle>
                <CardDescription>Vote accumulation throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={results.timeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="votes" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
