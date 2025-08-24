import { create } from "zustand"
import type { Election, Candidate, ElectionResults } from "@/types"
import { api } from "@/lib/api"

interface ElectionsState {
  elections: Election[]
  currentElection: Election | null
  candidates: Candidate[]
  results: ElectionResults | null
  isLoading: boolean
  error: string | null
}

interface ElectionsActions {
  fetchElections: () => Promise<void>
  fetchElection: (id: string) => Promise<void>
  fetchCandidates: (electionId: string) => Promise<void>
  fetchResults: (electionId: string) => Promise<void>
  createElection: (data: any) => Promise<boolean>
  castVote: (electionId: string, candidateId: string) => Promise<boolean>
  setError: (error: string | null) => void
  clearCurrentElection: () => void
}

export const useElectionsStore = create<ElectionsState & ElectionsActions>((set, get) => ({
  elections: [],
  currentElection: null,
  candidates: [],
  results: null,
  isLoading: false,
  error: null,

  fetchElections: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.getElections()
      if (response.success) {
        set({ elections: response.data, isLoading: false })
      } else {
        set({ error: response.error || "Failed to fetch elections", isLoading: false })
      }
    } catch (error) {
      set({ error: "Network error", isLoading: false })
    }
  },

  fetchElection: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.getElection(id)
      if (response.success) {
        set({ currentElection: response.data, isLoading: false })
      } else {
        set({ error: response.error || "Failed to fetch election", isLoading: false })
      }
    } catch (error) {
      set({ error: "Network error", isLoading: false })
    }
  },

  fetchCandidates: async (electionId: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.getCandidates(electionId)
      if (response.success) {
        set({ candidates: response.data, isLoading: false })
      } else {
        set({ error: response.error || "Failed to fetch candidates", isLoading: false })
      }
    } catch (error) {
      set({ error: "Network error", isLoading: false })
    }
  },

  fetchResults: async (electionId: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.getResults(electionId)
      if (response.success) {
        set({ results: response.data, isLoading: false })
      } else {
        set({ error: response.error || "Failed to fetch results", isLoading: false })
      }
    } catch (error) {
      set({ error: "Network error", isLoading: false })
    }
  },

  createElection: async (data: any) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.createElection(data)
      if (response.success) {
        const { elections } = get()
        set({
          elections: [...elections, response.data],
          isLoading: false,
        })
        return true
      } else {
        set({ error: response.error || "Failed to create election", isLoading: false })
        return false
      }
    } catch (error) {
      set({ error: "Network error", isLoading: false })
      return false
    }
  },

  castVote: async (electionId: string, candidateId: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.castVote(electionId, candidateId)
      if (response.success) {
        set({ isLoading: false })
        return true
      } else {
        set({ error: response.error || "Failed to cast vote", isLoading: false })
        return false
      }
    } catch (error) {
      set({ error: "Network error", isLoading: false })
      return false
    }
  },

  setError: (error: string | null) => set({ error }),
  clearCurrentElection: () => set({ currentElection: null, candidates: [], results: null }),
}))
