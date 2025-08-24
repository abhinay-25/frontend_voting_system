"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, Users, Award, Calendar } from "lucide-react"
import { useUiStore } from "@/src/store/ui"

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedElection, setSelectedElection] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { addToast } = useUiStore()

  // Mock data
  const candidates = [
    {
      id: "1",
      name: "Sarah Johnson",
      party: "Democratic Party",
      position: "Mayor",
      election: "City Council Election 2024",
      status: "approved",
      votes: 1247,
      image: "/professional-woman-politician.png",
    },
    {
      id: "2",
      name: "Michael Chen",
      party: "Republican Party",
      position: "Mayor",
      election: "City Council Election 2024",
      status: "approved",
      votes: 1156,
      image: "/professional-politician.png",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      party: "Independent",
      position: "Council Member",
      election: "City Council Election 2024",
      status: "pending",
      votes: 0,
      image: "/professional-woman-council-member.png",
    },
  ]

  const elections = [
    { id: "1", name: "City Council Election 2024" },
    { id: "2", name: "School Board Election 2024" },
    { id: "3", name: "State Representative Election 2024" },
  ]

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesElection = selectedElection === "all" || candidate.election === selectedElection
    return matchesSearch && matchesElection
  })

  const handleAddCandidate = () => {
    addToast({
      title: "Candidate Added",
      description: "New candidate has been successfully added to the election.",
      type: "success",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteCandidate = (name: string) => {
    addToast({
      title: "Candidate Removed",
      description: `${name} has been removed from the election.`,
      type: "success",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">Manage election candidates and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
              <DialogDescription>
                Add a new candidate to an election. Fill in all required information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter candidate name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="party">Political Party</Label>
                  <Input id="party" placeholder="Enter party affiliation" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="e.g., Mayor, Council Member" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="election">Election</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select election" />
                    </SelectTrigger>
                    <SelectContent>
                      {elections.map((election) => (
                        <SelectItem key={election.id} value={election.id}>
                          {election.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea id="bio" placeholder="Enter candidate biography and qualifications" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCandidate}>Add Candidate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from last election</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">75% approval rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Elections</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Management</CardTitle>
          <CardDescription>Search and filter candidates across all elections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedElection} onValueChange={setSelectedElection}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by election" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Elections</SelectItem>
                {elections.map((election) => (
                  <SelectItem key={election.id} value={election.name}>
                    {election.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Candidates Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Election</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={candidate.image || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {candidate.name}
                    </div>
                  </TableCell>
                  <TableCell>{candidate.party}</TableCell>
                  <TableCell>{candidate.position}</TableCell>
                  <TableCell>{candidate.election}</TableCell>
                  <TableCell>
                    <Badge variant={candidate.status === "approved" ? "default" : "secondary"}>
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{candidate.votes.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteCandidate(candidate.name)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
