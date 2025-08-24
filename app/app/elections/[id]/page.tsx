"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, Users, Vote, CheckCircle, ArrowLeft, Shield, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/store/auth"
import { useUiStore } from "@/store/ui"
import { api } from "@/lib/api"

export default function ElectionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuthStore()
  const { addToast } = useUiStore()

  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [isVoting, setIsVoting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // Mock election data - in real app this would come from API
  const election = {
    id: params.id,
    title: "Presidential Election 2024",
    description:
      "National presidential election to elect the next president of the country. This election will determine the leadership for the next four years and shape the future direction of our nation.",
    start: "2024-11-01T08:00:00Z",
    end: "2024-11-01T20:00:00Z",
    status: "active",
    totalVoters: 25000,
    votedCount: 15420,
    userVoted: false,
    allowLateJoiners: false,
    anonymousReceipts: true,
  }

  const candidates = [
    {
      id: "1",
      name: "Sarah Johnson",
      party: "Democratic Party",
      manifesto:
        "Focused on healthcare reform, climate action, and economic equality. Committed to transparent governance and social justice. My platform centers on creating sustainable jobs, improving access to healthcare, and addressing climate change through innovative green technology initiatives.",
      avatarUrl: "/professional-woman-politician.png",
      experience: "Former Governor, 15 years in public service",
      keyPolicies: ["Healthcare Reform", "Climate Action", "Economic Equality", "Education Investment"],
    },
    {
      id: "2",
      name: "Michael Chen",
      party: "Republican Party",
      manifesto:
        "Advocating for fiscal responsibility, strong defense, and free market policies. Promoting traditional values and limited government. My vision includes reducing government spending, strengthening national security, and supporting small businesses through tax reforms.",
      avatarUrl: "/professional-politician.png",
      experience: "Former Senator, 20 years in Congress",
      keyPolicies: ["Fiscal Responsibility", "Strong Defense", "Free Markets", "Traditional Values"],
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      party: "Green Party",
      manifesto:
        "Environmental protection, renewable energy transition, and sustainable development. Fighting for climate justice and green jobs. My campaign focuses on transitioning to 100% renewable energy, protecting natural resources, and creating green collar jobs for the future.",
      avatarUrl: "/environmental-activist-woman.png",
      experience: "Environmental Lawyer, Climate Activist",
      keyPolicies: ["Environmental Protection", "Renewable Energy", "Climate Justice", "Sustainable Development"],
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleVote = async () => {
    if (!selectedCandidate) return

    setIsVoting(true)
    try {
      const response = await api.castVote(election.id as string, selectedCandidate)

      if (response.success) {
        addToast({
          title: "Vote cast successfully!",
          description: "Your vote has been recorded on the blockchain.",
          type: "success",
        })
        router.push("/app/ballot/confirmation")
      } else {
        addToast({
          title: "Voting failed",
          description: response.error || "Please try again.",
          type: "error",
        })
      }
    } catch (error) {
      addToast({
        title: "Voting failed",
        description: "An unexpected error occurred.",
        type: "error",
      })
    } finally {
      setIsVoting(false)
      setShowConfirmDialog(false)
    }
  }

  const selectedCandidateData = candidates.find((c) => c.id === selectedCandidate)

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/app/elections">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Elections
        </Link>
      </Button>

      {/* Election Header */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{election.title}</CardTitle>
              <CardDescription className="text-base max-w-3xl">{election.description}</CardDescription>
            </div>
            <Badge className="bg-green-500/10 text-green-700 border-green-200">Active</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Election Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Voting Starts</p>
                <p className="text-sm text-muted-foreground">{formatDate(election.start)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Voting Ends</p>
                <p className="text-sm text-muted-foreground">{formatDate(election.end)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Participation</p>
                <p className="text-sm text-muted-foreground">
                  {election.votedCount.toLocaleString()} of {election.totalVoters.toLocaleString()} voters
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Election Settings */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm">Anonymous Receipts</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Blockchain Verified</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voting Status Alert */}
      {user?.status !== "approved" && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your account needs to be verified before you can vote. Please complete your KYC verification.
          </AlertDescription>
        </Alert>
      )}

      {election.userVoted && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            You have already voted in this election. You can view your vote receipt in your history.
          </AlertDescription>
        </Alert>
      )}

      {/* Candidates */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Candidates</h2>
        <div className="grid grid-cols-1 gap-6">
          {candidates.map((candidate) => (
            <Card
              key={candidate.id}
              className={`glass-card cursor-pointer transition-all hover:shadow-lg ${
                selectedCandidate === candidate.id ? "ring-2 ring-primary border-primary" : ""
              }`}
              onClick={() => !election.userVoted && user?.status === "approved" && setSelectedCandidate(candidate.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={candidate.avatarUrl || "/placeholder.svg"} alt={candidate.name} />
                    <AvatarFallback className="gradient-primary text-white text-lg">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{candidate.name}</h3>
                      <p className="text-primary font-medium">{candidate.party}</p>
                      <p className="text-sm text-muted-foreground">{candidate.experience}</p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">{candidate.manifesto}</p>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Key Policies:</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.keyPolicies.map((policy, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {policy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedCandidate === candidate.id && (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Vote Button */}
      {!election.userVoted && user?.status === "approved" && (
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Ready to cast your vote?</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedCandidate
                    ? `You have selected ${selectedCandidateData?.name} (${selectedCandidateData?.party})`
                    : "Please select a candidate above to continue"}
                </p>
              </div>

              <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogTrigger asChild>
                  <Button className="gradient-primary" disabled={!selectedCandidate} size="lg">
                    <Vote className="mr-2 h-4 w-4" />
                    Cast Vote
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Your Vote</DialogTitle>
                    <DialogDescription>
                      Please review your selection carefully. Once submitted, your vote cannot be changed.
                    </DialogDescription>
                  </DialogHeader>

                  {selectedCandidateData && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={selectedCandidateData.avatarUrl || "/placeholder.svg"}
                            alt={selectedCandidateData.name}
                          />
                          <AvatarFallback className="gradient-primary text-white">
                            {selectedCandidateData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{selectedCandidateData.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedCandidateData.party}</p>
                        </div>
                      </div>

                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                          Your vote will be encrypted and recorded on the blockchain. It will remain completely
                          anonymous while being publicly verifiable.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleVote} disabled={isVoting} className="gradient-primary">
                      {isVoting ? "Casting Vote..." : "Confirm Vote"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Election Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Voting Process</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Select your preferred candidate</li>
                <li>• Review your choice carefully</li>
                <li>• Confirm your vote</li>
                <li>• Receive blockchain receipt</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Security Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• End-to-end encryption</li>
                <li>• Blockchain immutability</li>
                <li>• Anonymous voting</li>
                <li>• Real-time verification</li>
              </ul>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Need help with voting? Contact our support team.</p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/app/support">
                Get Help
                <ExternalLink className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
