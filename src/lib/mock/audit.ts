import type { AuditEvent } from "@/types"

export const mockAuditEvents: AuditEvent[] = [
  {
    id: "1",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    timestamp: "2024-11-01T10:30:00Z",
    eventType: "vote_cast",
    entityId: "1",
    entityType: "vote",
    details: {
      electionId: "1",
      candidateId: "1",
      voterHash: "0xhashed_voter_id",
    },
    blockNumber: 1234567,
  },
  {
    id: "2",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    timestamp: "2024-10-01T10:00:00Z",
    eventType: "election_created",
    entityId: "1",
    entityType: "election",
    details: {
      title: "Presidential Election 2024",
      createdBy: "1",
    },
    blockNumber: 1234500,
  },
  {
    id: "3",
    txHash: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    timestamp: "2024-10-10T14:00:00Z",
    eventType: "voter_approved",
    entityId: "1",
    entityType: "voter",
    details: {
      voterEmail: "john.smith@email.com",
      approvedBy: "1",
    },
    blockNumber: 1234520,
  },
]
