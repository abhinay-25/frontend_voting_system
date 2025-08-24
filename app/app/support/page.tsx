"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Phone, Mail, HelpCircle, Send, Clock, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function SupportPage() {
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })

  const [tickets, setTickets] = useState([
    {
      id: "TK-2024-001",
      subject: "Unable to access voting page",
      status: "resolved",
      priority: "high",
      created: "2024-01-15",
      updated: "2024-01-16",
    },
    {
      id: "TK-2024-002",
      subject: "Biometric enrollment failed",
      status: "in_progress",
      priority: "medium",
      created: "2024-01-20",
      updated: "2024-01-21",
    },
  ])

  const faqs = [
    {
      question: "How do I vote in an election?",
      answer:
        "To vote, navigate to the Elections page, select an active election, verify your identity using biometrics, make your selections, and confirm your vote. You'll receive a blockchain receipt for verification.",
    },
    {
      question: "Is my vote anonymous?",
      answer:
        "Yes, your vote is completely anonymous. While your identity is verified for eligibility, your actual vote choices are encrypted and cannot be traced back to you.",
    },
    {
      question: "How secure is the blockchain voting system?",
      answer:
        "Our system uses military-grade encryption, biometric verification, and immutable blockchain technology. Each vote is cryptographically secured and cannot be altered or deleted.",
    },
    {
      question: "Can I change my vote after submitting?",
      answer:
        "No, once a vote is submitted and recorded on the blockchain, it cannot be changed. This ensures the integrity and immutability of the voting process.",
    },
    {
      question: "What if I forget my password?",
      answer:
        "You can reset your password using the 'Forgot Password' link on the login page. You'll need access to your registered email and may need to re-verify your biometric data.",
    },
    {
      question: "How do I enroll my biometric data?",
      answer:
        "Go to the Enroll Biometrics page in your dashboard. Follow the step-by-step process to register your face and fingerprint. This data is encrypted and stored securely.",
    },
  ]

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit ticket logic
    console.log("Submitting ticket:", ticketForm)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Resolved</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">In Progress</Badge>
      case "open":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Open</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Support Center
        </h1>
        <p className="text-muted-foreground mt-2">Get help with your voting experience</p>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>Frequently Asked Questions</span>
              </CardTitle>
              <CardDescription>Find answers to common questions about AVAx Vote</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="glass-card text-center">
                <CardContent className="p-6">
                  <MessageCircle className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-3">Chat with our support team</p>
                  <Button size="sm" className="w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="glass-card text-center">
                <CardContent className="p-6">
                  <Phone className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-3">Call us at (555) 123-VOTE</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="glass-card text-center">
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-3">support@avaxvote.com</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>Describe your issue and we'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm((prev) => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={ticketForm.category}
                      onValueChange={(value) => setTicketForm((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="voting">Voting Issues</SelectItem>
                        <SelectItem value="biometric">Biometric Enrollment</SelectItem>
                        <SelectItem value="account">Account Access</SelectItem>
                        <SelectItem value="technical">Technical Problems</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={ticketForm.priority}
                    onValueChange={(value) => setTicketForm((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General question</SelectItem>
                      <SelectItem value="medium">Medium - Issue affecting usage</SelectItem>
                      <SelectItem value="high">High - Cannot vote or access account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue..."
                    rows={5}
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm((prev) => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>

                <Alert>
                  <HelpCircle className="h-4 w-4" />
                  <AlertDescription>
                    For urgent voting issues during active elections, please call our emergency hotline at (555)
                    123-VOTE.
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Ticket
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Your Support Tickets</CardTitle>
              <CardDescription>Track the status of your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                    <h4 className="font-medium mb-2">{ticket.subject}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Created: {ticket.created}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Updated: {ticket.updated}</span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
