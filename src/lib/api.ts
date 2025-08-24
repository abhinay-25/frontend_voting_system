import type {
  User,
  Election,
  Candidate,
  VoteReceipt,
  Voter,
  AuditEvent,
  ElectionResults,
  SystemHealth,
  KpiData,
  ApiResponse,
  LoginForm,
  RegisterForm,
  CreateElectionForm,
  CreateCandidateForm,
} from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api"

// Utility function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock data will be imported from separate files
import { mockElections } from "./mock/elections"
import { mockCandidates } from "./mock/candidates"
import { mockVoters } from "./mock/voters"
import { mockReceipts } from "./mock/receipts"
import { mockResults } from "./mock/results"
import { mockAuditEvents } from "./mock/audit"

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      // Simulate network delay
      await delay(Math.random() * 500 + 200)

      const url = `${API_BASE_URL}${endpoint}`
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error("API request failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Auth endpoints
  async login(payload: LoginForm): Promise<ApiResponse<{ user: User; token: string }>> {
    // Mock login logic
    await delay(800)

    if (payload.email === "admin@avaxvote.com" && payload.password === "admin123") {
      return {
        success: true,
        data: {
          user: {
            id: "1",
            name: "Admin User",
            email: "admin@avaxvote.com",
            role: "admin",
            status: "approved",
            kycVerified: true,
            biometricsEnrolled: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: "mock-admin-token",
        },
      }
    }

    if (payload.email === "user@avaxvote.com" && payload.password === "user123") {
      return {
        success: true,
        data: {
          user: {
            id: "2",
            name: "John Voter",
            email: "user@avaxvote.com",
            role: "user",
            status: "approved",
            kycVerified: true,
            biometricsEnrolled: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: "mock-user-token",
        },
      }
    }

    return {
      success: false,
      error: "Invalid credentials",
    }
  }

  async register(payload: RegisterForm): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(1000)

    return {
      success: true,
      data: {
        user: {
          id: Math.random().toString(36).substring(2, 9),
          name: payload.name,
          email: payload.email,
          role: "user",
          status: "pending",
          kycVerified: false,
          biometricsEnrolled: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: "mock-new-user-token",
      },
    }
  }

  // Election endpoints
  async getElections(): Promise<ApiResponse<Election[]>> {
    await delay(300)
    return { success: true, data: mockElections }
  }

  async getElection(id: string): Promise<ApiResponse<Election>> {
    await delay(200)
    const election = mockElections.find((e) => e.id === id)
    if (!election) {
      return { success: false, error: "Election not found" }
    }
    return { success: true, data: election }
  }

  async createElection(data: CreateElectionForm): Promise<ApiResponse<Election>> {
    await delay(800)
    const newElection: Election = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
      status: "draft",
      createdBy: "1", // Mock admin user
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockElections.push(newElection)
    return { success: true, data: newElection }
  }

  async updateElection(id: string, data: Partial<Election>): Promise<ApiResponse<Election>> {
    await delay(500)
    const index = mockElections.findIndex((e) => e.id === id)
    if (index === -1) {
      return { success: false, error: "Election not found" }
    }
    mockElections[index] = { ...mockElections[index], ...data, updatedAt: new Date().toISOString() }
    return { success: true, data: mockElections[index] }
  }

  // Candidate endpoints
  async getCandidates(electionId: string): Promise<ApiResponse<Candidate[]>> {
    await delay(200)
    const candidates = mockCandidates.filter((c) => c.electionId === electionId)
    return { success: true, data: candidates }
  }

  async createCandidate(data: CreateCandidateForm & { electionId: string }): Promise<ApiResponse<Candidate>> {
    await delay(400)
    const newCandidate: Candidate = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
      order: mockCandidates.filter((c) => c.electionId === data.electionId).length + 1,
      createdAt: new Date().toISOString(),
    }
    mockCandidates.push(newCandidate)
    return { success: true, data: newCandidate }
  }

  // Voting endpoints
  async castVote(electionId: string, candidateId: string): Promise<ApiResponse<VoteReceipt>> {
    await delay(1500) // Simulate blockchain transaction time

    const receipt: VoteReceipt = {
      id: Math.random().toString(36).substring(2, 9),
      electionId,
      userId: "2", // Mock user
      candidateId,
      txHash: `0x${Math.random().toString(16).substring(2, 66)}`,
      timestamp: new Date().toISOString(),
      status: "confirmed",
      blockNumber: Math.floor(Math.random() * 1000000) + 1000000,
    }

    mockReceipts.push(receipt)
    return { success: true, data: receipt }
  }

  // Results endpoints
  async getResults(electionId: string): Promise<ApiResponse<ElectionResults>> {
    await delay(300)
    const results = mockResults.find((r) => r.electionId === electionId)
    if (!results) {
      return { success: false, error: "Results not found" }
    }
    return { success: true, data: results }
  }

  // Admin endpoints
  async getVoters(): Promise<ApiResponse<Voter[]>> {
    await delay(400)
    return { success: true, data: mockVoters }
  }

  async approveVoter(id: string): Promise<ApiResponse<Voter>> {
    await delay(300)
    const index = mockVoters.findIndex((v) => v.id === id)
    if (index === -1) {
      return { success: false, error: "Voter not found" }
    }
    mockVoters[index] = {
      ...mockVoters[index],
      status: "approved",
      approvedBy: "1",
      approvedAt: new Date().toISOString(),
    }
    return { success: true, data: mockVoters[index] }
  }

  async rejectVoter(id: string, reason: string): Promise<ApiResponse<Voter>> {
    await delay(300)
    const index = mockVoters.findIndex((v) => v.id === id)
    if (index === -1) {
      return { success: false, error: "Voter not found" }
    }
    mockVoters[index] = {
      ...mockVoters[index],
      status: "rejected",
      rejectionReason: reason,
    }
    return { success: true, data: mockVoters[index] }
  }

  // Audit endpoints
  async listAuditEvents(): Promise<ApiResponse<AuditEvent[]>> {
    await delay(500)
    return { success: true, data: mockAuditEvents }
  }

  // System health
  async health(): Promise<ApiResponse<SystemHealth>> {
    await delay(100)
    return {
      success: true,
      data: {
        blockchain: {
          status: "healthy",
          latency: Math.floor(Math.random() * 100) + 50,
          lastBlock: Math.floor(Math.random() * 1000000) + 1000000,
        },
        ipfs: {
          status: "healthy",
          peers: Math.floor(Math.random() * 50) + 20,
        },
        faceApi: {
          status: "healthy",
          responseTime: Math.floor(Math.random() * 200) + 100,
        },
      },
    }
  }

  // KPI data
  async getKpiData(): Promise<ApiResponse<KpiData>> {
    await delay(200)
    return {
      success: true,
      data: {
        activeElections: mockElections.filter((e) => e.status === "active").length,
        totalVoters: mockVoters.filter((v) => v.status === "approved").length,
        votesCast: mockReceipts.length,
        systemHealth: "healthy",
      },
    }
  }

  // Biometrics endpoints
  async enrollFace(imageBlob: Blob): Promise<ApiResponse<{ success: boolean; vectorId: string }>> {
    await delay(2000) // Simulate processing time
    return {
      success: true,
      data: {
        success: true,
        vectorId: `face_${Math.random().toString(36).substring(2, 9)}`,
      },
    }
  }

  async enrollFingerprint(imageBlob: Blob): Promise<ApiResponse<{ success: boolean; vectorId: string }>> {
    await delay(1500)
    return {
      success: true,
      data: {
        success: true,
        vectorId: `finger_${Math.random().toString(36).substring(2, 9)}`,
      },
    }
  }
}

export const api = new ApiClient()
