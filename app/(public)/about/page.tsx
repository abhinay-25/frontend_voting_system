import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <Badge variant="secondary" className="mb-4 gradient-accent text-white">
          About AVAx Vote
        </Badge>
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl mb-6">
          Democratizing Democracy Through Technology
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          AVAx Vote was founded with a simple yet powerful mission: to restore trust in democratic processes through
          cutting-edge blockchain technology and biometric verification.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <Card className="glass-card">
          <CardHeader>
            <Target className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base leading-relaxed">
              To provide the world's most secure, transparent, and accessible voting platform that empowers every
              citizen to participate in democracy with complete confidence in the integrity of their vote.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <Globe className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base leading-relaxed">
              A world where every election is conducted with complete transparency, unshakeable security, and universal
              accessibility, fostering trust in democratic institutions globally.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <div className="mb-20">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
          <p className="text-lg text-muted-foreground">The principles that guide everything we do</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Transparency",
              description: "Every vote is auditable and verifiable while maintaining voter privacy",
            },
            {
              title: "Security",
              description: "Military-grade encryption and blockchain immutability protect election integrity",
            },
            {
              title: "Accessibility",
              description: "Democratic participation should be available to everyone, everywhere",
            },
            {
              title: "Innovation",
              description: "Continuously advancing technology to serve democracy better",
            },
          ].map((value, index) => (
            <Card key={index} className="glass-card text-center">
              <CardHeader>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Leadership Team</h2>
          <p className="text-lg text-muted-foreground">Experts in blockchain, security, and democratic governance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Sarah Mitchell",
              role: "CEO & Co-Founder",
              bio: "Former election security researcher with 15+ years in cryptography and democratic systems.",
              image: "/professional-woman-ceo.png",
            },
            {
              name: "Alex Chen",
              role: "CTO & Co-Founder",
              bio: "Blockchain architect and former lead engineer at major fintech companies.",
              image: "/professional-man-cto.png",
            },
            {
              name: "Maria Rodriguez",
              role: "Head of Security",
              bio: "Cybersecurity expert with extensive experience in government and enterprise security.",
              image: "/professional-woman-security-expert.png",
            },
          ].map((member, index) => (
            <Card key={index} className="glass-card text-center">
              <CardHeader>
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent mb-4" />
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="glass-card p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Impact by the Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">1M+</div>
            <div className="text-sm text-muted-foreground">Secure Votes Cast</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Elections Secured</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">99.99%</div>
            <div className="text-sm text-muted-foreground">Uptime Achieved</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">0</div>
            <div className="text-sm text-muted-foreground">Security Breaches</div>
          </div>
        </div>
      </div>
    </div>
  )
}
