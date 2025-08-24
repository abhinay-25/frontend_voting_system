import type { Voter } from "@/types"

export const mockVoters: Voter[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    status: "approved",
    approvedBy: "1",
    approvedAt: "2024-10-10T14:00:00Z",
    createdAt: "2024-10-05T09:30:00Z",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    status: "pending",
    kycDocuments: ["id_front.jpg", "id_back.jpg", "proof_of_address.pdf"],
    createdAt: "2024-10-22T11:15:00Z",
  },
  {
    id: "3",
    name: "David Wilson",
    email: "david.wilson@email.com",
    status: "rejected",
    rejectionReason: "Invalid identification documents provided",
    createdAt: "2024-10-18T16:45:00Z",
  },
  {
    id: "4",
    name: "Jennifer Lee",
    email: "jennifer.lee@email.com",
    status: "approved",
    approvedBy: "1",
    approvedAt: "2024-10-20T10:30:00Z",
    createdAt: "2024-10-15T13:20:00Z",
  },
]
