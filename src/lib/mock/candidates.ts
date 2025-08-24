import type { Candidate } from "@/types"

export const mockCandidates: Candidate[] = [
  // Presidential Election candidates
  {
    id: "1",
    electionId: "1",
    name: "Sarah Johnson",
    party: "Democratic Party",
    manifesto:
      "Focused on healthcare reform, climate action, and economic equality. Committed to transparent governance and social justice.",
    avatarUrl: "/professional-woman-politician.png",
    order: 1,
    createdAt: "2024-10-01T10:30:00Z",
  },
  {
    id: "2",
    electionId: "1",
    name: "Michael Chen",
    party: "Republican Party",
    manifesto:
      "Advocating for fiscal responsibility, strong defense, and free market policies. Promoting traditional values and limited government.",
    avatarUrl: "/professional-politician.png",
    order: 2,
    createdAt: "2024-10-01T10:35:00Z",
  },
  {
    id: "3",
    electionId: "1",
    name: "Elena Rodriguez",
    party: "Green Party",
    manifesto:
      "Environmental protection, renewable energy transition, and sustainable development. Fighting for climate justice and green jobs.",
    avatarUrl: "/environmental-activist-woman.png",
    order: 3,
    createdAt: "2024-10-01T10:40:00Z",
  },
  // City Council candidates
  {
    id: "4",
    electionId: "2",
    name: "Robert Kim",
    party: "Independent",
    manifesto:
      "Local infrastructure improvement, community safety, and transparent city governance. Focus on neighborhood development.",
    avatarUrl: "/local-politician-man.png",
    order: 1,
    createdAt: "2024-10-20T16:15:00Z",
  },
  {
    id: "5",
    electionId: "2",
    name: "Lisa Thompson",
    party: "Progressive Coalition",
    manifesto:
      "Affordable housing, public transportation expansion, and social services enhancement for all residents.",
    avatarUrl: "/progressive-politician-woman.png",
    order: 2,
    createdAt: "2024-10-20T16:20:00Z",
  },
]
