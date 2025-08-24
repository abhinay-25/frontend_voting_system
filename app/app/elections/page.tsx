"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Search, Filter, ArrowRight, Vote } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useElectionsStore } from "@/store/elections"
import { useAuthStore } from "@/store/auth"
import { ElectionCardSkeleton } from "@/components/loading-skeleton"
import { motion } from "framer-motion"

export default function ElectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const { elections, isLoading, error, fetchElections } = useElectionsStore()
  const { user } = useAuthStore()

  useEffect(() => {
    fetchElections()
  }, [fetchElections])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 border-green-200"
      case "upcoming":
        return "bg-blue-500/10 text-blue-700 border-blue-200"
      case "closed":
        return "bg-gray-500/10 text-gray-700 border-gray-200"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "upcoming":
        return "Upcoming"
      case "closed":
        return "Closed"
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredElections = elections.filter((election) => {
    const matchesSearch =
      election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      election.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || election.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Elections</h1>
          <p className="text-muted-foreground">Browse and participate in available elections. Your vote matters.</p>
        </div>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search elections..." className="pl-10" disabled />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select disabled>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="stagger-item">
              <ElectionCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Elections</h1>
          <p className="text-muted-foreground">Browse and participate in available elections. Your vote matters.</p>
        </div>
        <Card className="glass-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-red-600 mb-4">Error loading elections: {error}</p>
            <Button onClick={() => fetchElections()} variant="outline" className="btn-hover">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Elections</h1>
        <p className="text-muted-foreground">Browse and participate in available elections. Your vote matters.</p>
      </div>

      {/* Filters */}
      <Card className="glass-card hover-lift">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search elections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 focus-ring"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] focus-ring">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Elections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredElections.map((election, index) => (
          <motion.div
            key={election.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="glass-card hover-lift hover-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{election.title}</CardTitle>
                    <CardDescription className="text-sm">{election.description}</CardDescription>
                  </div>
                  <Badge className={cn("text-xs animate-scale-in", getStatusColor(election.status))}>
                    {getStatusText(election.status)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Election Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Start</p>
                      <p className="text-muted-foreground">{formatDate(election.startDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">End</p>
                      <p className="text-muted-foreground">{formatDate(election.endDate)}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{election.candidateCount || 0}</p>
                    <p className="text-xs text-muted-foreground">Candidates</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {election.eligibleVoters?.toLocaleString() || 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Eligible Voters</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{election.totalVotes?.toLocaleString() || 0}</p>
                    <p className="text-xs text-muted-foreground">Votes Cast</p>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {election.userVoted && (
                      <Badge variant="outline" className="text-green-600 border-green-200 animate-bounce-subtle">
                        <Vote className="h-3 w-3 mr-1" />
                        Voted
                      </Badge>
                    )}
                    {election.status === "active" && !election.userVoted && (
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        Eligible to Vote
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild className="btn-hover bg-transparent">
                      <Link href={`/app/elections/${election.id}`}>View Details</Link>
                    </Button>

                    {election.status === "active" && !election.userVoted && (
                      <Button size="sm" className="gradient-primary btn-hover hover-glow" asChild>
                        <Link href={`/app/elections/${election.id}`}>
                          Vote Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}

                    {election.status === "closed" && (
                      <Button variant="outline" size="sm" asChild className="btn-hover bg-transparent">
                        <Link href={`/app/results?election=${election.id}`}>View Results</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredElections.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Vote className="h-12 w-12 text-muted-foreground mb-4 animate-bounce-subtle" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No elections found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "There are no elections available at the moment. Check back later for upcoming elections."}
              </p>
              {(searchQuery || statusFilter !== "all") && (
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent btn-hover"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
