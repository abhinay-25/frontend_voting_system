import type { ElectionResults } from "@/types"

export const mockResults: ElectionResults[] = [
  {
    electionId: "1",
    totalVotes: 15420,
    candidates: [
      {
        candidateId: "1",
        name: "Sarah Johnson",
        party: "Democratic Party",
        votes: 7850,
        percentage: 50.9,
      },
      {
        candidateId: "2",
        name: "Michael Chen",
        party: "Republican Party",
        votes: 6200,
        percentage: 40.2,
      },
      {
        candidateId: "3",
        name: "Elena Rodriguez",
        party: "Green Party",
        votes: 1370,
        percentage: 8.9,
      },
    ],
    turnout: {
      eligible: 25000,
      voted: 15420,
      percentage: 61.7,
    },
    lastUpdated: "2024-11-01T20:30:00Z",
  },
  {
    electionId: "3",
    totalVotes: 8950,
    candidates: [
      {
        candidateId: "4",
        name: "Robert Kim",
        party: "Independent",
        votes: 5200,
        percentage: 58.1,
      },
      {
        candidateId: "5",
        name: "Lisa Thompson",
        party: "Progressive Coalition",
        votes: 3750,
        percentage: 41.9,
      },
    ],
    turnout: {
      eligible: 12000,
      voted: 8950,
      percentage: 74.6,
    },
    lastUpdated: "2024-09-15T20:00:00Z",
  },
]
