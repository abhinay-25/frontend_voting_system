"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Download, FileText, CalendarIcon, TrendingUp, Users, Vote } from "lucide-react"
import { format } from "date-fns"
import { useUiStore } from "@/src/store/ui"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("turnout")
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date())
  const { addToast } = useUiStore()

  // Mock report data
  const reportTypes = [
    { id: "turnout", name: "Voter Turnout Analysis", description: "Detailed turnout statistics by demographics" },
    { id: "security", name: "Security Audit Report", description: "System security events and compliance" },
    { id: "performance", name: "System Performance", description: "Platform performance metrics and uptime" },
    { id: "engagement", name: "Voter Engagement", description: "User interaction and participation patterns" },
  ]

  const turnoutData = [
    { district: "District 1", registered: 2847, voted: 1923, turnout: 67.5 },
    { district: "District 2", registered: 3156, voted: 2234, turnout: 70.8 },
    { district: "District 3", registered: 2634, voted: 1567, turnout: 59.5 },
    { district: "District 4", registered: 3891, voted: 2789, turnout: 71.7 },
    { district: "District 5", registered: 2198, voted: 1456, turnout: 66.2 },
  ]

  const engagementData = [
    { month: "Jan", logins: 1234, votes: 567, registrations: 89 },
    { month: "Feb", logins: 1456, votes: 789, registrations: 123 },
    { month: "Mar", logins: 1678, votes: 1234, registrations: 156 },
    { month: "Apr", logins: 1890, votes: 1456, registrations: 178 },
    { month: "May", logins: 2123, votes: 1678, registrations: 201 },
  ]

  const recentReports = [
    {
      id: "1",
      name: "Monthly Turnout Report - February 2024",
      type: "Turnout Analysis",
      generated: "2024-02-28",
      status: "completed",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Security Audit - Q1 2024",
      type: "Security Report",
      generated: "2024-02-25",
      status: "completed",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "System Performance - February 2024",
      type: "Performance Report",
      generated: "2024-02-20",
      status: "processing",
      size: "3.1 MB",
    },
  ]

  const handleGenerateReport = () => {
    const reportType = reportTypes.find((r) => r.id === selectedReport)
    addToast({
      title: "Report Generation Started",
      description: `${reportType?.name} is being generated. You'll receive a notification when it's ready.`,
      type: "info",
    })
  }

  const handleDownloadReport = (reportName: string) => {
    addToast({
      title: "Download Started",
      description: `${reportName} download has been initiated.`,
      type: "success",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate comprehensive reports and analyze voting data</p>
        </div>
        <Button onClick={handleGenerateReport}>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Create custom reports with specific parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange ? format(dateRange, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateRange} onSelect={setDateRange} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {selectedReport && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-medium">{reportTypes.find((r) => r.id === selectedReport)?.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {reportTypes.find((r) => r.id === selectedReport)?.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Turnout</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67.1%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+127 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
            <Vote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,847</div>
            <p className="text-xs text-muted-foreground">Across all elections</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Turnout by District</CardTitle>
            <CardDescription>Voter participation across different districts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={turnoutData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="turnout" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Engagement Trends</CardTitle>
            <CardDescription>Platform activity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="logins" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="votes" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="registrations" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{new Date(report.generated).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={report.status === "completed" ? "default" : "secondary"}>{report.status}</Badge>
                  </TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell className="text-right">
                    {report.status === "completed" && (
                      <Button variant="ghost" size="sm" onClick={() => handleDownloadReport(report.name)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
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
