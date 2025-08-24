import type { VoteReceipt } from "@/types"

export const mockReceipts: VoteReceipt[] = [
  {
    id: "1",
    electionId: "1",
    userId: "2",
    candidateId: "1",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    timestamp: "2024-11-01T10:30:00Z",
    status: "confirmed",
    blockNumber: 1234567,
  },
  {
    id: "2",
    electionId: "3",
    userId: "1",
    candidateId: "4",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    timestamp: "2024-09-15T14:15:00Z",
    status: "confirmed",
    blockNumber: 1234500,
  },
]
