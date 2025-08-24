"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, CalendarIcon, Save, Plus, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { useUiStore } from "@/src/store/ui"

export default function EditElectionPage() {
  const params = useParams()
  const router = useRouter()
  const { addToast } = useUiStore()
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false)

  // Mock election data
  const [election, setElection] = useState({
    id: params.id,
    title: "City Council Election 2024",
    description: "Annual election for city council members and mayor positions.",
    startDate: new Date("2024-03-15"),
    endDate: new Date("2024-03-17"),
    status: "upcoming",
    settings: {
      requireBiometric: true,
      allowEarlyVoting: false,
      publicResults: true,
      voterVerification: true,
    },
    candidates: [
      {
        id: "1",
        name: "Sarah Johnson",
        party: "Democratic Party",
        position: "Mayor",
        biography: "Experienced city planner with 15 years in public service.",
      },
      {
        id: "2",
        name: "Michael Chen",
        party: "Republican Party",
        position: "Mayor",
        biography: "Local business owner and community advocate.",
      },
      {
        id: "3",
        name: "Emily Rodriguez",
        party: "Independent",
        position: "Council Member",
        biography: "Environmental lawyer focused on sustainable city development.",
      },
    ],
  })

  const handleSaveElection = () => {
    addToast({
      title: "Election Updated",
      description: "Election details have been successfully updated.",
      type: "success",
    })
  }

  const handleAddCandidate = () => {
    addToast({
      title: "Candidate Added",
      description: "New candidate has been added to the election.",
      type: "success",
    })
    setIsAddCandidateOpen(false)
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Edit Election</h1>
          <p className="text-muted-foreground">Modify election details and manage candidates</p>
        </div>
        <Badge
          variant={election.status === "active" ? "default" : election.status === "upcoming" ? "secondary" : "outline"}
        >
          {election.status}
        </Badge>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update election title, description, and schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Election Title</Label>
            <Input
              id="title"
              value={election.title}
              onChange={(e) =>
                setElection({
                  ...election,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={election.description}
              onChange={(e) =>
                setElection({
                  ...election,
                  description: e.target.value,
                })
              }
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {election.startDate ? format(election.startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={election.startDate}
                    onSelect={(date) =>
                      date &&
                      setElection({
                        ...election,
                        startDate: date,
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {election.endDate ? format(election.endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={election.endDate}
                    onSelect={(date) =>
                      date &&
                      setElection({
                        ...election,
                        endDate: date,
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Election Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Election Settings</CardTitle>
          <CardDescription>Configure voting rules and security options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Biometric Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Voters must complete biometric verification to cast votes
                </p>
              </div>
              <Switch
                checked={election.settings.requireBiometric}
                onCheckedChange={(checked) =>
                  setElection({
                    ...election,
                    settings: { ...election.settings, requireBiometric: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Early Voting</Label>
                <p className="text-sm text-muted-foreground">Enable voting before the official election day</p>
              </div>
              <Switch
                checked={election.settings.allowEarlyVoting}
                onCheckedChange={(checked) =>
                  setElection({
                    ...election,
                    settings: { ...election.settings, allowEarlyVoting: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Public Results</Label>
                <p className="text-sm text-muted-foreground">Make election results publicly visible</p>
              </div>
              <Switch
                checked={election.settings.publicResults}
                onCheckedChange={(checked) =>
                  setElection({
                    ...election,
                    settings: { ...election.settings, publicResults: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Voter Verification Required</Label>
                <p className="text-sm text-muted-foreground">Require identity verification before voting</p>
              </div>
              <Switch
                checked={election.settings.voterVerification}
                onCheckedChange={(checked) =>
                  setElection({
                    ...election,
                    settings: { ...election.settings, voterVerification: checked },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Candidates</CardTitle>
              <CardDescription>Manage candidates for this election</CardDescription>
            </div>
            <Dialog open={isAddCandidateOpen} onOpenChange={setIsAddCandidateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Candidate
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Candidate</DialogTitle>
                  <DialogDescription>Add a new candidate to this election</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="candidateName">Full Name</Label>
                      <Input id="candidateName" placeholder="Enter candidate name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="candidateParty">Political Party</Label>
                      <Input id="candidateParty" placeholder="Enter party affiliation" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidatePosition">Position</Label>
                    <Input id="candidatePosition" placeholder="e.g., Mayor, Council Member" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="candidateBio">Biography</Label>
                    <Textarea id="candidateBio" placeholder="Enter candidate biography and qualifications" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddCandidateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCandidate}>Add Candidate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Biography</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {election.candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.party}</TableCell>
                  <TableCell>{candidate.position}</TableCell>
                  <TableCell className="max-w-xs truncate">{candidate.biography}</TableCell>
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

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveElection} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
