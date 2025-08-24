"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Download, Share, Copy, ArrowRight, Shield, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useUiStore } from "@/store/ui"

export default function BallotConfirmationPage() {
  const router = useRouter()
  const { addToast } = useUiStore()
  const [copied, setCopied] = useState(false)

  // Mock vote receipt data - in real app this would come from the voting process
  const voteReceipt = {
    id: "vote_2024_001",
    electionId: "1",
    electionTitle: "Presidential Election 2024",
    candidateName: "Sarah Johnson",
    candidateParty: "Democratic Party",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    timestamp: new Date().toISOString(),
    blockNumber: 1234567,
    status: "confirmed",
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      addToast({
        title: "Copied!",
        description: "Transaction hash copied to clipboard.",
        type: "success",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      addToast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        type: "error",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Success Animation */}
      <div className="text-center space-y-4">
        <div className="mx-auto h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Vote Cast Successfully!</h1>
          <p className="text-muted-foreground">
            Your vote has been securely recorded on the blockchain and cannot be altered.
          </p>
        </div>
      </div>

      {/* Vote Summary */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Vote Summary</span>
          </CardTitle>
          <CardDescription>Your vote details and blockchain confirmation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Election</p>
              <p className="text-foreground">{voteReceipt.electionTitle}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Vote Cast</p>
              <p className="text-foreground">{formatDate(voteReceipt.timestamp)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Selected Candidate</p>
              <div className="flex items-center space-x-2">
                <p className="text-foreground">{voteReceipt.candidateName}</p>
                <Badge variant="outline" className="text-xs">
                  {voteReceipt.candidateParty}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge className="bg-green-500/10 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Confirmed
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Receipt */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Blockchain Receipt</CardTitle>
          <CardDescription>Cryptographic proof of your vote on the blockchain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Transaction Hash</p>
              <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                <code className="flex-1 text-sm font-mono text-foreground break-all">{voteReceipt.txHash}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(voteReceipt.txHash)}
                  className="shrink-0"
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Block Number</p>
                <p className="text-foreground font-mono">{voteReceipt.blockNumber.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Receipt ID</p>
                <p className="text-foreground font-mono">{voteReceipt.id}</p>
              </div>
            </div>
          </div>

          <Separator />

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              This receipt proves your vote was recorded while maintaining complete anonymity. Save this information for
              your records.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="w-full bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <Share className="mr-2 h-4 w-4" />
              Share Receipt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Track Results</p>
                <p className="text-sm text-muted-foreground">
                  Monitor live election results as votes are counted in real-time.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">View History</p>
                <p className="text-sm text-muted-foreground">
                  Access all your voting history and receipts in your account.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="gradient-primary">
              <Link href="/app/results">
                View Live Results
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/app/history">View Vote History</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/app/overview">Back to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verification Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Want to verify your vote independently?</p>
        <Button variant="link" className="text-primary">
          <ExternalLink className="mr-2 h-4 w-4" />
          Open Blockchain Explorer
        </Button>
      </div>
    </div>
  )
}
