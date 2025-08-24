"use client"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useUiStore } from "@/src/store/ui"

export function Toaster() {
  const { toasts, removeToast } = useUiStore()

  const getToastVariant = (type: string) => {
    switch (type) {
      case "success":
        return "success"
      case "error":
        return "destructive"
      case "warning":
        return "warning"
      case "info":
        return "info"
      default:
        return "default"
    }
  }

  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={getToastVariant(toast.type)}
          onOpenChange={(open) => {
            if (!open) {
              removeToast(toast.id)
            }
          }}
        >
          <div className="grid gap-1">
            <ToastTitle>{toast.title}</ToastTitle>
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
