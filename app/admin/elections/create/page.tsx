"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Plus, Trash2, Save, ArrowLeft, Info } from "lucide-react"
import { motion } from "framer-motion"

export default function CreateElectionPage() {
  const router = useRouter()
  const [election, setElection] = useState({
    title: "",
    description: "",
    type: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    eligibleVoters: "",
    requireBiometric: true,
    allowEarlyVoting: false,
    publicResults: true,
  })

  const [candidates, setCandidates] = useState([{ id: 1, name: "", party: "", description: "" }])

  const addCandidate = () => {
    setCandidates([...candidates, { id: Date.now(), name: "", party: "", description: "" }])
  }

  const removeCandidate = (id: number) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id))
  }

  const updateCandidate = (id: number, field: string, value: string) => {
    setCandidates(candidates.map((candidate) => (candidate.id === id ? { ...candidate, [field]: value } : candidate)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit election creation logic
    console.log("Creating election:", { election, candidates })
    router.push("/admin/elections")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Create New Election
          </h1>
          <p className="text-muted-foreground mt-2">Set up a new election with candidates and voting parameters</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>General details about the election</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Election Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., 2024 Presidential Election"
                  value={election.title}
                  onChange={(e) => setElection((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Election Type *</Label>
                <Select
                  value={election.type}
                  onValueChange={(value) => setElection((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select election type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presidential">Presidential</SelectItem>
                    <SelectItem value="congressional">Congressional</SelectItem>
                    <SelectItem value="state">State/Governor</SelectItem>
                    <SelectItem value="local">Local/Municipal</SelectItem>
                    <SelectItem value="referendum">Referendum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details about this election..."
                rows={3}
                value={election.description}
                onChange={(e) => setElection((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Voting Schedule */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Voting Schedule</span>
            </CardTitle>
            <CardDescription>Set the voting period and times</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={election.startDate}
                  onChange={(e) => setElection((prev) => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={election.endDate}
                  onChange={(e) => setElection((prev) => ({ ...prev, endDate: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={election.startTime}
                  onChange={(e) => setElection((prev) => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={election.endTime}
                  onChange={(e) => setElection((prev) => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Candidates</CardTitle>
                <CardDescription>Add candidates for this election</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={addCandidate}>
                <Plus className="h-4 w-4 mr-2" />
                Add Candidate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Candidate {index + 1}</Badge>
                  {candidates.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCandidate(candidate.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Candidate Name *</Label>
                    <Input
                      placeholder="Full name"
                      value={candidate.name}
                      onChange={(e) => updateCandidate(candidate.id, "name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Party/Affiliation</Label>
                    <Input
                      placeholder="Political party or independent"
                      value={candidate.party}
                      onChange={(e) => updateCandidate(candidate.id, "party", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Brief candidate biography or platform..."
                    rows={2}
                    value={candidate.description}
                    onChange={(e) => updateCandidate(candidate.id, "description", e.target.value)}
                  />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Election Settings</CardTitle>
            <CardDescription>Configure voting rules and security options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="eligibleVoters">Eligible Voters (Optional)</Label>
              <Input
                id="eligibleVoters"
                type="number"
                placeholder="Total number of eligible voters"
                value={election.eligibleVoters}
                onChange={(e) => setElection((prev) => ({ ...prev, eligibleVoters: e.target.value }))}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Biometric Verification</Label>
                  <p className="text-sm text-muted-foreground">Voters must verify identity using biometrics</p>
                </div>
                <Switch
                  checked={election.requireBiometric}
                  onCheckedChange={(checked) => setElection((prev) => ({ ...prev, requireBiometric: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Early Voting</Label>
                  <p className="text-sm text-muted-foreground">Enable voting before the official start date</p>
                </div>
                <Switch
                  checked={election.allowEarlyVoting}
                  onCheckedChange={(checked) => setElection((prev) => ({ ...prev, allowEarlyVoting: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Results</Label>
                  <p className="text-sm text-muted-foreground">Make results visible to all users after voting ends</p>
                </div>
                <Switch
                  checked={election.publicResults}
                  onCheckedChange={(checked) => setElection((prev) => ({ ...prev, publicResults: checked }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Once created, some election settings cannot be modified after voting begins. Please review all details
            carefully.
          </AlertDescription>
        </Alert>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Create Election
          </Button>
        </div>
      </form>
    </div>
  )
}
