export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  status: "pending" | "approved" | "rejected"
  kycVerified: boolean
  biometricsEnrolled: boolean
  createdAt: string
  updatedAt: string
}

export interface Election {
  id: string
  title: string
  description: string
  start: string
  end: string
  status: "draft" | "active" | "closed"
  createdBy: string
  allowLateJoiners: boolean
  anonymousReceipts: boolean
  createdAt: string
  updatedAt: string
}

export interface Candidate {
  id: string
  electionId: string
  name: string
  party: string
  manifesto: string
  avatarUrl?: string
  order: number
  createdAt: string
}

export interface VoteReceipt {
  id: string
  electionId: string
  userId: string
  candidateId: string
  txHash?: string
  timestamp: string
  status: "confirmed" | "pending" | "failed"
  blockNumber?: number
}

export interface Voter {
  id: string
  name: string
  email: string
  status: "pending" | "approved" | "rejected"
  kycDocuments?: string[]
  rejectionReason?: string
  approvedBy?: string
  approvedAt?: string
  createdAt: string
}

export interface AuditEvent {
  id: string
  txHash: string
  timestamp: string
  eventType: "vote_cast" | "election_created" | "election_closed" | "voter_approved" | "candidate_added"
  entityId: string
  entityType: "election" | "vote" | "voter" | "candidate"
  details: Record<string, any>
  blockNumber: number
}

export interface ElectionResults {
  electionId: string
  totalVotes: number
  candidates: Array<{
    candidateId: string
    name: string
    party: string
    votes: number
    percentage: number
  }>
  turnout: {
    eligible: number
    voted: number
    percentage: number
  }
  lastUpdated: string
}

export interface SystemHealth {
  blockchain: {
    status: "healthy" | "degraded" | "down"
    latency: number
    lastBlock: number
  }
  ipfs: {
    status: "healthy" | "degraded" | "down"
    peers: number
  }
  faceApi: {
    status: "healthy" | "degraded" | "down"
    responseTime: number
  }
}

export interface KpiData {
  activeElections: number
  totalVoters: number
  votesCast: number
  systemHealth: "healthy" | "degraded" | "down"
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface CreateElectionForm {
  title: string
  description: string
  start: string
  end: string
  allowLateJoiners: boolean
  anonymousReceipts: boolean
}

export interface CreateCandidateForm {
  name: string
  party: string
  manifesto: string
  avatarUrl?: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
