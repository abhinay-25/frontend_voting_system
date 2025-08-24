"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserCheck, UserX, Users, Shield, Download, Filter } from "lucide-react"
import { useUiStore } from "@/src/store/ui"

export default function VotersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [verificationFilter, setVerificationFilter] = useState("all")
  const { addToast } = useUiStore()

  // Mock data
  const voters = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      registrationDate: "2024-01-15",
      status: "verified",
      biometricVerified: true,
      lastVoted: "2024-02-20",
      votesCount: 3,
      image: "/professional-woman-voter.png",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob.smith@email.com",
      registrationDate: "2024-01-20",
      status: "pending",
      biometricVerified: false,
      lastVoted: null,
      votesCount: 0,
      image: "/professional-man-voter.png",
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol.davis@email.com",
      registrationDate: "2024-01-10",
      status: "verified",
      biometricVerified: true,
      lastVoted: "2024-02-18",
      votesCount: 2,
      image: "/professional-woman-voter-2.png",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@email.com",
      registrationDate: "2024-02-01",
      status: "suspended",
      biometricVerified: true,
      lastVoted: "2024-02-15",
      votesCount: 1,
      image: "/professional-man-voter-2.png",
    },
  ]

  const filteredVoters = voters.filter((voter) => {
    const matchesSearch =
      voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || voter.status === statusFilter
    const matchesVerification =
      verificationFilter === "all" ||
      (verificationFilter === "verified" && voter.biometricVerified) ||
      (verificationFilter === "unverified" && !voter.biometricVerified)
    return matchesSearch && matchesStatus && matchesVerification
  })

  const handleVerifyVoter = (name: string) => {
    addToast({
      title: "Voter Verified",
      description: `${name} has been successfully verified.`,
      type: "success",
    })
  }

  const handleSuspendVoter = (name: string) => {
    addToast({
      title: "Voter Suspended",
      description: `${name} has been suspended from voting.`,
      type: "warning",
    })
  }

  const handleExportData = () => {
    addToast({
      title: "Export Started",
      description: "Voter data export has been initiated. You'll receive a download link shortly.",
      type: "info",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Voter Management</h1>
          <p className="text-muted-foreground">Manage voter registrations and verification status</p>
        </div>
        <Button onClick={handleExportData}>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Voters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+127 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,456</div>
            <p className="text-xs text-muted-foreground">86.3% verification rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">312</div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Biometric Verified</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,203</div>
            <p className="text-xs text-muted-foreground">77.4% with biometrics</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Voter Database</CardTitle>
          <CardDescription>Search and manage all registered voters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search voters by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={verificationFilter} onValueChange={setVerificationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Biometric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Verification</SelectItem>
                <SelectItem value="verified">Biometric Verified</SelectItem>
                <SelectItem value="unverified">Not Verified</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Voters Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Voter</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Biometric</TableHead>
                <TableHead>Last Voted</TableHead>
                <TableHead>Total Votes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVoters.map((voter) => (
                <TableRow key={voter.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={voter.image || "/placeholder.svg"} alt={voter.name} />
                        <AvatarFallback>
                          {voter.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{voter.name}</div>
                        <div className="text-sm text-muted-foreground">{voter.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(voter.registrationDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        voter.status === "verified"
                          ? "default"
                          : voter.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {voter.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={voter.biometricVerified ? "default" : "outline"}>
                      {voter.biometricVerified ? "Verified" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>{voter.lastVoted ? new Date(voter.lastVoted).toLocaleDateString() : "Never"}</TableCell>
                  <TableCell>{voter.votesCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {voter.status === "pending" && (
                        <Button variant="ghost" size="sm" onClick={() => handleVerifyVoter(voter.name)}>
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}
                      {voter.status === "verified" && (
                        <Button variant="ghost" size="sm" onClick={() => handleSuspendVoter(voter.name)}>
                          <UserX className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
