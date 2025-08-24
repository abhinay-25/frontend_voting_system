"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Calendar, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminElectionsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const elections = [
    {
      id: "EL-2024-001",
      title: "2024 Presidential Election",
      status: "active",
      startDate: "2024-11-01",
      endDate: "2024-11-05",
      totalVotes: 45230,
      eligibleVoters: 125000,
      turnout: 36.2,
      candidates: 3,
    },
    {
      id: "EL-2024-002",
      title: "City Council Election",
      status: "upcoming",
      startDate: "2024-12-01",
      endDate: "2024-12-03",
      totalVotes: 0,
      eligibleVoters: 85000,
      turnout: 0,
      candidates: 5,
    },
    {
      id: "EL-2024-003",
      title: "School Board Election",
      status: "completed",
      startDate: "2024-09-15",
      endDate: "2024-09-17",
      totalVotes: 12450,
      eligibleVoters: 45000,
      turnout: 27.7,
      candidates: 4,
    },
    {
      id: "EL-2024-004",
      title: "State Governor Election",
      status: "draft",
      startDate: "2025-01-15",
      endDate: "2025-01-17",
      totalVotes: 0,
      eligibleVoters: 0,
      turnout: 0,
      candidates: 2,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Completed</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredElections = elections.filter(
    (election) =>
      election.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      election.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Elections Management
          </h1>
          <p className="text-muted-foreground mt-2">Create, manage, and monitor all elections</p>
        </div>
        <Link href="/admin/elections/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Election
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Active Elections</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Upcoming Elections</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">45,230</p>
                  <p className="text-sm text-muted-foreground">Total Votes Cast</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">36.2%</p>
                  <p className="text-sm text-muted-foreground">Average Turnout</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Elections Table */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Elections</CardTitle>
              <CardDescription>Manage and monitor election campaigns</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search elections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Election</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Candidates</TableHead>
                  <TableHead>Turnout</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredElections.map((election, index) => (
                  <motion.tr
                    key={election.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group hover:bg-muted/50"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{election.title}</p>
                        <p className="text-sm text-muted-foreground">{election.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(election.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{election.startDate}</div>
                        <div className="text-muted-foreground">to {election.endDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{election.candidates} candidates</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{election.turnout}%</div>
                        <div className="text-muted-foreground">
                          {election.totalVotes.toLocaleString()} / {election.eligibleVoters.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Election
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Election
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
