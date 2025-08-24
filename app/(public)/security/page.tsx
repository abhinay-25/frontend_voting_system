import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Eye, Fingerprint, Server, CheckCircle, Download } from "lucide-react"
import Link from "next/link"

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <Badge variant="secondary" className="mb-4 gradient-accent text-white">
          Security & Trust
        </Badge>
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl mb-6">
          Uncompromising Security for Democratic Integrity
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Learn how AVAx Vote's multi-layered security architecture protects your vote and ensures complete election
          integrity through advanced blockchain technology.
        </p>
      </div>

      {/* Security Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        <Card className="glass-card text-center">
          <CardHeader>
            <div className="mx-auto h-16 w-16 rounded-full gradient-primary flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">Blockchain Immutability</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Every vote is cryptographically hashed and stored on an immutable blockchain, making tampering
              mathematically impossible.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardHeader>
            <div className="mx-auto h-16 w-16 rounded-full gradient-accent flex items-center justify-center mb-4">
              <Fingerprint className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">Biometric Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Advanced facial recognition and fingerprint scanning ensure only verified voters can participate in
              elections.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardHeader>
            <div className="mx-auto h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">End-to-End Encryption</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              256-bit AES encryption protects all data in transit and at rest, with zero-knowledge architecture
              preserving voter privacy.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Technical Details */}
      <div className="mb-20">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Technical Security Architecture</h2>
          <p className="text-lg text-muted-foreground">
            Deep dive into the technologies that make AVAx Vote the most secure voting platform
          </p>
        </div>

        <div className="space-y-8">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Server className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Distributed Infrastructure</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base">
                Our voting system runs on a globally distributed network of nodes, eliminating single points of failure
                and ensuring 99.99% uptime.
              </CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Global Nodes</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">Continents</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Eye className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Transparent Auditability</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-4">
                Every transaction is publicly verifiable on the blockchain while maintaining complete voter anonymity
                through advanced cryptographic techniques.
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Zero-Knowledge Proofs</Badge>
                <Badge variant="secondary">Ring Signatures</Badge>
                <Badge variant="secondary">Homomorphic Encryption</Badge>
                <Badge variant="secondary">Merkle Trees</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Multi-Factor Authentication</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base mb-4">
                Layered security approach combining multiple authentication factors to prevent unauthorized access and
                ensure voter identity.
              </CardDescription>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Biometric verification (face + fingerprint)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Government ID validation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">SMS/Email verification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Device fingerprinting</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Privacy Protection */}
      <div className="mb-20">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Privacy Protection</h2>
          <p className="text-lg text-muted-foreground">
            Your vote is completely anonymous while remaining fully auditable
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Lock className="h-5 w-5 text-primary" />
                <span>What We Protect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Your voting choices remain completely anonymous</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Biometric data is encrypted and never stored</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Personal information is separated from votes</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">No tracking or profiling of voting patterns</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Eye className="h-5 w-5 text-primary" />
                <span>What Remains Auditable</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Vote counts and election results</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Blockchain transaction hashes</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Cryptographic proofs of validity</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">System integrity and uptime metrics</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Security Certifications */}
      <div className="mb-20">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Security Certifications & Audits</h2>
          <p className="text-lg text-muted-foreground">
            Independently verified and certified by leading security organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "SOC 2 Type II", status: "Certified" },
            { name: "ISO 27001", status: "Certified" },
            { name: "FIPS 140-2", status: "Level 3" },
            { name: "Common Criteria", status: "EAL 4+" },
          ].map((cert, index) => (
            <Card key={index} className="glass-card text-center">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-lg">{cert.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                  {cert.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Security Resources */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center space-x-3">
            <Download className="h-6 w-6 text-primary" />
            <span>Security Resources</span>
          </CardTitle>
          <CardDescription>Download our security documentation and audit reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">Security Whitepaper</div>
                <div className="text-sm text-muted-foreground">Technical architecture overview</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">Audit Reports</div>
                <div className="text-sm text-muted-foreground">Third-party security assessments</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">Compliance Documentation</div>
                <div className="text-sm text-muted-foreground">Certification details and standards</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">Bug Bounty Program</div>
                <div className="text-sm text-muted-foreground">Help us improve security</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="mt-16 text-center">
        <div className="glass-card p-8">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Ready to Experience Secure Voting?</h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of voters who trust AVAx Vote with their democratic participation.
          </p>
          <Button size="lg" asChild className="gradient-primary">
            <Link href="/auth/register">Start Voting Securely</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
