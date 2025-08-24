import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Toast {
  id: string
  title: string
  description?: string
  type: "success" | "error" | "warning" | "info"
  duration?: number
}

interface UiState {
  theme: "light" | "dark" | "system"
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  toasts: Toast[]
  isLoading: boolean
  loadingMessage?: string
}

interface UiActions {
  setTheme: (theme: "light" | "dark" | "system") => void
  setSidebarOpen: (open: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  clearToasts: () => void
  setLoading: (loading: boolean, message?: string) => void
}

export const useUiStore = create<UiState & UiActions>()(
  persist(
    (set, get) => ({
      theme: "system",
      sidebarOpen: true,
      sidebarCollapsed: false,
      toasts: [],
      isLoading: false,
      loadingMessage: undefined,

      setTheme: (theme) => {
        set({ theme })
      },

      setSidebarOpen: (open) => {
        set({ sidebarOpen: open })
      },

      setSidebarCollapsed: (collapsed) => {
        set({ sidebarCollapsed: collapsed })
      },

      addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9)
        const newToast = { ...toast, id }
        set((state) => ({
          toasts: [...state.toasts, newToast],
        }))

        // Auto remove toast after duration
        const duration = toast.duration || 5000
        setTimeout(() => {
          get().removeToast(id)
        }, duration)
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }))
      },

      clearToasts: () => {
        set({ toasts: [] })
      },

      setLoading: (loading, message) => {
        set({ isLoading: loading, loadingMessage: message })
      },
    }),
    {
      name: "avax-vote-ui",
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
)
