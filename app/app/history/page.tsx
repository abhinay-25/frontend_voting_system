"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Filter, Eye } from "lucide-react"
import { motion } from "framer-motion"

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const voteHistory = [
    {
      id: "VR-2024-001",
      election: "2024 Presidential Election",
      date: "2024-11-05",
      time: "14:32:15",
      status: "Verified",
      blockHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
      candidates: ["John Smith", "Sarah Johnson"],
    },
    {
      id: "VR-2024-002",
      election: "City Council Election",
      date: "2024-10-15",
      time: "09:45:22",
      status: "Verified",
      blockHash: "0x9876543210fedcba0987654321fedcba09876543",
      candidates: ["Mike Davis", "Lisa Chen"],
    },
    {
      id: "VR-2024-003",
      election: "School Board Election",
      date: "2024-09-20",
      time: "16:18:45",
      status: "Verified",
      blockHash: "0xabcdef1234567890fedcba0987654321abcdef12",
      candidates: ["Robert Wilson"],
    },
  ]

  const filteredHistory = voteHistory.filter(
    (vote) =>
      vote.election.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vote.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Vote History
        </h1>
        <p className="text-muted-foreground mt-2">
          View and download your complete voting history with blockchain verification
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Your Vote Receipts</CardTitle>
          <CardDescription>
            All your votes are permanently recorded on the blockchain for transparency and verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by election name or receipt ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt ID</TableHead>
                  <TableHead>Election</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((vote, index) => (
                  <motion.tr
                    key={vote.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group hover:bg-muted/50"
                  >
                    <TableCell className="font-mono text-sm">{vote.id}</TableCell>
                    <TableCell className="font-medium">{vote.election}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{vote.date}</div>
                        <div className="text-muted-foreground">{vote.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        {vote.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
