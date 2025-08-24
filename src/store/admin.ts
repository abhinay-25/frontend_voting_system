import { create } from "zustand"
import type { Voter, AuditEvent, SystemHealth, KpiData } from "@/types"
import { api } from "@/lib/api"

interface AdminState {
  voters: Voter[]
  auditEvents: AuditEvent[]
  systemHealth: SystemHealth | null
  kpiData: KpiData | null
  isLoading: boolean
  error: string | null
}

interface AdminActions {
  fetchVoters: () => Promise<void>
  fetchAuditEvents: () => Promise<void>
  fetchSystemHealth: () => Promise<void>
  fetchKpiData: () => Promise<void>
  approveVoter: (id: string) => Promise<boolean>
  rejectVoter: (id: string, reason: string) => Promise<boolean>
  setError: (error: string | null) => void
}

export const useAdminStore = create<AdminState & AdminActions>((set, get) => ({
  voters: [],
  auditEvents: [],
  systemHealth: null,
  kpiData: null,
  isLoading: false,
  error: null,

  fetchVoters: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.getVoters()
      if (response.success) {
        set({ voters: response.data, isLoading: false })
      } else {
        set({ error: response.error || "Failed to fetch voters", isLoading: false })
      }
    } catch (error) {
      set({ error: "Network error", isLoading: false })
    }
  },

  fetchAuditEvents: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.listAuditEvents()
      if (response.success) {
        set({ auditEvents: response.data, isLoading: false })
      } else {
        set({ error: response.error || "Failed to fetch audit events", isLoading: false })
      }
    } catch (error) {
      set({ error: "Network error", isLoading: false })
    }
  },

  fetchSystemHealth: async () => {
    try {
      const response = await api.health()
      if (response.success) {
        set({ systemHealth: response.data })
      }
    } catch (error) {
      console.error("Failed to fetch system health:", error)
    }
  },

  fetchKpiData: async () => {
    try {
      const response = await api.getKpiData()
      if (response.success) {
        set({ kpiData: response.data })
      }
    } catch (error) {
      console.error("Failed to fetch KPI data:", error)
    }
  },

  approveVoter: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.approveVoter(id)
      if (response.success) {
        const { voters } = get()
        set({
          voters: voters.map((v) => (v.id === id ? response.data : v)),
          isLoading: false,
        })
        return true
      } else {
        set({ error: response.error || "Failed to approve voter", isLoading: false })
        return false
      }
    } catch (error) {
      set({ error: "Network error", isLoading: false })
      return false
    }
  },

  rejectVoter: async (id: string, reason: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.rejectVoter(id, reason)
      if (response.success) {
        const { voters } = get()
        set({
          voters: voters.map((v) => (v.id === id ? response.data : v)),
          isLoading: false,
        })
        return true
      } else {
        set({ error: response.error || "Failed to reject voter", isLoading: false })
        return false
      }
    } catch (error) {
      set({ error: "Network error", isLoading: false })
      return false
    }
  },

  setError: (error: string | null) => set({ error }),
}))
