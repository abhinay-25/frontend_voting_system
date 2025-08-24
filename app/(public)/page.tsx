"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Fingerprint, Users, CheckCircle, Lock, Zap, Globe, ArrowRight, Star, Quote } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 gradient-accent text-white">
              🚀 Next-Generation Voting Platform
            </Badge>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Empower Your Vote with{" "}
              <span className="gradient-primary bg-clip-text text-transparent">Blockchain Security</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              Experience the future of democratic participation with AVAx Vote's ultra-secure blockchain voting
              platform, enhanced with biometric verification for unparalleled election integrity.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="gradient-primary text-lg px-8 py-6">
                <Link href="/auth/register">
                  Start Voting Securely
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                <Link href="/security">
                  Learn About Security
                  <Shield className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">Three simple steps to secure, verifiable voting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card text-center">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                  <Fingerprint className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">1. Verify Identity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Complete secure biometric enrollment with face and fingerprint verification to ensure only eligible
                  voters can participate.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card text-center">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full gradient-accent flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">2. Cast Your Vote</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Browse candidates, review their platforms, and cast your vote through our intuitive interface with
                  real-time verification.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card text-center">
              <CardHeader>
                <div className="mx-auto h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">3. Secure Recording</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your vote is encrypted and recorded on the blockchain, providing immutable proof while maintaining
                  complete anonymity.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Trust & Security</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built with the highest security standards for democratic integrity
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-primary">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Blockchain Immutability</h3>
                  <p className="mt-2 text-muted-foreground">
                    Every vote is cryptographically secured and recorded on an immutable blockchain, preventing
                    tampering or manipulation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-accent">
                  <Fingerprint className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Biometric Verification</h3>
                  <p className="mt-2 text-muted-foreground">
                    Advanced biometric authentication ensures only verified voters can participate while maintaining
                    complete privacy.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Real-time Auditing</h3>
                  <p className="mt-2 text-muted-foreground">
                    Complete transparency with real-time audit trails and public verification of election integrity.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card p-8 text-center">
                <div className="mx-auto h-24 w-24 rounded-full gradient-primary flex items-center justify-center mb-6">
                  <Globe className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">99.99% Uptime</h3>
                <p className="text-muted-foreground mb-6">
                  Distributed infrastructure ensures your vote is always accessible and secure, backed by
                  enterprise-grade reliability.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">256-bit</div>
                    <div className="text-sm text-muted-foreground">Encryption</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Anonymous</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Why Choose AVAx Vote</h2>
            <p className="mt-4 text-lg text-muted-foreground">The most advanced voting platform for the digital age</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Military-Grade Security",
                description: "Bank-level encryption and security protocols protect every vote",
              },
              {
                icon: Users,
                title: "Scalable Infrastructure",
                description: "Handle millions of voters simultaneously without performance issues",
              },
              {
                icon: CheckCircle,
                title: "Instant Verification",
                description: "Real-time vote confirmation with cryptographic proof",
              },
              {
                icon: Globe,
                title: "Global Accessibility",
                description: "Vote from anywhere in the world with internet access",
              },
              {
                icon: Lock,
                title: "Privacy Protected",
                description: "Complete anonymity while maintaining full auditability",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Sub-second vote processing with instant results",
              },
            ].map((feature, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Trusted by Leaders</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              What election officials and voters are saying about AVAx Vote
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "AVAx Vote has revolutionized how we conduct elections. The transparency and security are unmatched.",
                author: "Sarah Johnson",
                role: "Election Commissioner",
                rating: 5,
              },
              {
                quote: "Finally, a voting system I can trust. The biometric verification gives me complete confidence.",
                author: "Michael Chen",
                role: "Registered Voter",
                rating: 5,
              },
              {
                quote:
                  "The audit trail and real-time verification have eliminated all concerns about election integrity.",
                author: "Dr. Elena Rodriguez",
                role: "Political Science Professor",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground mb-4">"{testimonial.quote}"</blockquote>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl mb-6">
              Ready to Experience the Future of Voting?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of voters who have already embraced secure, transparent, and verifiable elections with AVAx
              Vote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="gradient-primary text-lg px-8 py-6">
                <Link href="/auth/register">
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                <Link href="/auth/login">Sign In to Vote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
