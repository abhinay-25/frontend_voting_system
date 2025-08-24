"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Eye, Search, Download, RefreshCw, UserX } from "lucide-react"
import { useUiStore } from "@/src/store/ui"

export default function SecurityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const { addToast } = useUiStore()

  // Mock security data
  const securityLogs = [
    {
      id: "1",
      timestamp: "2024-02-20 14:32:15",
      type: "authentication",
      severity: "high",
      event: "Multiple failed login attempts",
      user: "admin@avaxvote.com",
      ip: "192.168.1.100",
      status: "blocked",
    },
    {
      id: "2",
      timestamp: "2024-02-20 13:45:22",
      type: "voting",
      severity: "medium",
      event: "Biometric verification failed",
      user: "voter123@email.com",
      ip: "10.0.0.45",
      status: "flagged",
    },
    {
      id: "3",
      timestamp: "2024-02-20 12:18:33",
      type: "system",
      severity: "low",
      event: "Database backup completed",
      user: "system",
      ip: "localhost",
      status: "success",
    },
    {
      id: "4",
      timestamp: "2024-02-20 11:22:44",
      type: "access",
      severity: "high",
      event: "Unauthorized admin panel access attempt",
      user: "unknown",
      ip: "203.0.113.42",
      status: "blocked",
    },
  ]

  const securityAlerts = [
    {
      id: "1",
      type: "critical",
      title: "Suspicious Activity Detected",
      description: "Multiple failed authentication attempts from IP 203.0.113.42",
      timestamp: "2 minutes ago",
    },
    {
      id: "2",
      type: "warning",
      title: "High Volume of Votes",
      description: "Unusual voting pattern detected in District 5",
      timestamp: "15 minutes ago",
    },
  ]

  const systemHealth = {
    blockchain: { status: "healthy", uptime: "99.9%" },
    database: { status: "healthy", uptime: "100%" },
    authentication: { status: "warning", uptime: "98.5%" },
    biometric: { status: "healthy", uptime: "99.7%" },
  }

  const filteredLogs = securityLogs.filter((log) => {
    const matchesSearch =
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm)
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
    const matchesType = typeFilter === "all" || log.type === typeFilter
    return matchesSearch && matchesSeverity && matchesType
  })

  const handleBlockIP = (ip: string) => {
    addToast({
      title: "IP Blocked",
      description: `IP address ${ip} has been blocked from accessing the system.`,
      type: "success",
    })
  }

  const handleRefreshLogs = () => {
    addToast({
      title: "Logs Refreshed",
      description: "Security logs have been refreshed with the latest data.",
      type: "info",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Center</h1>
          <p className="text-muted-foreground">Monitor system security and investigate incidents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshLogs}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active Alerts</h2>
        {securityAlerts.map((alert) => (
          <Alert key={alert.id} variant={alert.type === "critical" ? "destructive" : "default"}>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>
              {alert.description} • {alert.timestamp}
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Real-time status of critical system components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(systemHealth).map(([component, health]) => (
              <div key={component} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium capitalize">{component}</div>
                  <div className="text-sm text-muted-foreground">Uptime: {health.uptime}</div>
                </div>
                <Badge
                  variant={
                    health.status === "healthy" ? "default" : health.status === "warning" ? "secondary" : "destructive"
                  }
                >
                  {health.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Security Logs</CardTitle>
          <CardDescription>Detailed security events and system activities</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="authentication">Authentication</SelectItem>
                <SelectItem value="voting">Voting</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="access">Access</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Logs Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>User</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.severity === "high" ? "destructive" : log.severity === "medium" ? "secondary" : "default"
                      }
                    >
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.event}</TableCell>
                  <TableCell className="font-mono text-sm">{log.user}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.status === "blocked" ? "destructive" : log.status === "flagged" ? "secondary" : "default"
                      }
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {log.status !== "blocked" && log.ip !== "localhost" && (
                        <Button variant="ghost" size="sm" onClick={() => handleBlockIP(log.ip)}>
                          <UserX className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
