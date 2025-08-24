"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageCircle, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an AVAx Vote account?",
          answer:
            "Creating an account is simple. Click 'Get Started' on our homepage, provide your basic information, and complete the identity verification process. You'll need a valid government ID and will go through biometric enrollment to ensure secure voting.",
        },
        {
          question: "What documents do I need for verification?",
          answer:
            "You'll need a valid government-issued photo ID (driver's license, passport, or national ID card) and proof of address (utility bill, bank statement, or lease agreement) dated within the last 3 months.",
        },
        {
          question: "How long does the verification process take?",
          answer:
            "Most verifications are completed within 24-48 hours. During peak periods, it may take up to 5 business days. You'll receive email notifications about your verification status.",
        },
      ],
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          question: "How secure is my vote on the blockchain?",
          answer:
            "Your vote is protected by military-grade encryption and stored on an immutable blockchain. Once recorded, it cannot be altered, deleted, or tampered with. The blockchain provides a permanent, auditable record while maintaining your anonymity.",
        },
        {
          question: "Can anyone see how I voted?",
          answer:
            "No. Your voting choices are completely anonymous. While the blockchain records that a vote was cast, it uses advanced cryptographic techniques to separate your identity from your voting choices. Even AVAx Vote cannot see how you voted.",
        },
        {
          question: "What biometric data do you collect?",
          answer:
            "We collect facial recognition data and fingerprints for identity verification. This data is encrypted, never stored in raw form, and is only used to create unique mathematical signatures for authentication. Your biometric data cannot be reverse-engineered or used for any other purpose.",
        },
        {
          question: "Is my personal information safe?",
          answer:
            "Yes. We use 256-bit AES encryption for all data, maintain SOC 2 Type II compliance, and follow strict data protection protocols. Your personal information is stored separately from your voting data and is never shared with third parties.",
        },
      ],
    },
    {
      category: "Voting Process",
      questions: [
        {
          question: "How do I cast my vote?",
          answer:
            "After logging in, navigate to active elections, review candidate information, make your selections, and confirm your choices. You'll receive a cryptographic receipt as proof of your vote submission.",
        },
        {
          question: "Can I change my vote after submitting?",
          answer:
            "This depends on the specific election rules set by the election administrator. Some elections allow vote changes before the deadline, while others do not. Check the election details for specific policies.",
        },
        {
          question: "What if I encounter technical issues while voting?",
          answer:
            "Contact our 24/7 support team immediately at support@avaxvote.com or 1-800-AVAX-VOTE. We have technical specialists available to help resolve any issues quickly to ensure you can cast your vote.",
        },
        {
          question: "How do I verify my vote was counted?",
          answer:
            "You'll receive a unique transaction hash after voting. You can use this hash to verify your vote was recorded on the blockchain through our verification portal. The system provides real-time confirmation of vote inclusion.",
        },
      ],
    },
    {
      category: "Technical Questions",
      questions: [
        {
          question: "What devices can I use to vote?",
          answer:
            "AVAx Vote works on any device with a modern web browser and camera (for biometric verification). This includes desktop computers, laptops, tablets, and smartphones. We recommend using the latest version of Chrome, Firefox, Safari, or Edge.",
        },
        {
          question: "Do I need special software to vote?",
          answer:
            "No special software is required. AVAx Vote runs entirely in your web browser. However, you'll need to allow camera access for biometric verification during the voting process.",
        },
        {
          question: "What happens if I lose internet connection while voting?",
          answer:
            "The system automatically saves your progress. If you lose connection, simply refresh the page and log back in. Your selections will be preserved, and you can continue from where you left off.",
        },
        {
          question: "Is there a mobile app?",
          answer:
            "Currently, AVAx Vote is web-based and optimized for mobile browsers. We're developing native mobile apps that will be available in 2024. The web version provides full functionality on all mobile devices.",
        },
      ],
    },
    {
      category: "Election Administration",
      questions: [
        {
          question: "Who can create elections on AVAx Vote?",
          answer:
            "Elections can be created by verified election administrators, government officials, and authorized organizations. All election creators must go through a rigorous verification process and meet specific security requirements.",
        },
        {
          question: "How are election results verified?",
          answer:
            "Results are automatically calculated from blockchain data and can be independently verified by anyone. The system provides real-time tallying with cryptographic proofs of accuracy. Third-party auditors can verify results using our open-source verification tools.",
        },
        {
          question: "Can I observe an election in real-time?",
          answer:
            "Yes. AVAx Vote provides real-time election monitoring dashboards that show voting activity, turnout statistics, and system health metrics. Authorized observers can access detailed audit logs and verification tools.",
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <Badge variant="secondary" className="mb-4 gradient-accent text-white">
          Frequently Asked Questions
        </Badge>
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl mb-6">Everything You Need to Know</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Find answers to common questions about AVAx Vote's secure blockchain voting platform. Can't find what you're
          looking for? Contact our support team.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8 mb-16">
        {faqs.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center space-x-2">
                <HelpCircle className="h-6 w-6 text-primary" />
                <span>{category.category}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Still Have Questions?</CardTitle>
          <CardDescription className="text-center text-lg">Our support team is here to help 24/7</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full gradient-primary flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-3">Get instant help from our support team</p>
                <Button variant="outline" size="sm">
                  Start Chat
                </Button>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full gradient-accent flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-3">support@avaxvote.com</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="mailto:support@avaxvote.com">Send Email</Link>
                </Button>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-3">1-800-AVAX-VOTE</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="tel:1-800-282-9868">Call Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
