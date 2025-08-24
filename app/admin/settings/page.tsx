"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Shield, Bell, Database, Mail, Globe, Save } from "lucide-react"
import { useUiStore } from "@/src/store/ui"

export default function SettingsPage() {
  const { addToast } = useUiStore()

  // Mock settings state
  const [settings, setSettings] = useState({
    general: {
      siteName: "AVAx Vote",
      siteDescription: "Secure blockchain voting platform",
      timezone: "UTC-8",
      language: "en",
      maintenanceMode: false,
    },
    security: {
      requireBiometric: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      twoFactorAuth: true,
      passwordComplexity: "high",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      adminAlerts: true,
      voterReminders: true,
    },
    blockchain: {
      network: "avalanche",
      gasLimit: "21000",
      confirmations: 6,
      nodeUrl: "https://api.avax.network/ext/bc/C/rpc",
    },
    email: {
      smtpHost: "smtp.avaxvote.com",
      smtpPort: "587",
      smtpUser: "noreply@avaxvote.com",
      smtpPassword: "••••••••",
      fromEmail: "noreply@avaxvote.com",
      fromName: "AVAx Vote",
    },
  })

  const handleSaveSettings = (section: string) => {
    addToast({
      title: "Settings Saved",
      description: `${section} settings have been successfully updated.`,
      type: "success",
    })
  }

  const handleTestEmail = () => {
    addToast({
      title: "Test Email Sent",
      description: "A test email has been sent to verify your configuration.",
      type: "info",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure platform settings and preferences</p>
        </div>
        <Badge variant="outline">
          <Settings className="mr-1 h-3 w-3" />
          Admin Access
        </Badge>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic platform configuration and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, siteName: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.general.timezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="UTC+0">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: { ...settings.general, siteDescription: e.target.value },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable public access to the platform</p>
                </div>
                <Switch
                  checked={settings.general.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      general: { ...settings.general, maintenanceMode: checked },
                    })
                  }
                />
              </div>

              <Separator />
              <Button onClick={() => handleSaveSettings("General")}>
                <Save className="mr-2 h-4 w-4" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure authentication and security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, sessionTimeout: Number.parseInt(e.target.value) },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, maxLoginAttempts: Number.parseInt(e.target.value) },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Biometric Verification</Label>
                    <p className="text-sm text-muted-foreground">Mandate biometric verification for all votes</p>
                  </div>
                  <Switch
                    checked={settings.security.requireBiometric}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, requireBiometric: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, twoFactorAuth: checked },
                      })
                    }
                  />
                </div>
              </div>

              <Separator />
              <Button onClick={() => handleSaveSettings("Security")}>
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure how and when notifications are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailNotifications: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                  </div>
                  <Switch
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, smsNotifications: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Admin Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Immediate alerts for security events</p>
                  </div>
                  <Switch
                    checked={settings.notifications.adminAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, adminAlerts: checked },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Voter Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send voting reminders to registered users</p>
                  </div>
                  <Switch
                    checked={settings.notifications.voterReminders}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, voterReminders: checked },
                      })
                    }
                  />
                </div>
              </div>

              <Separator />
              <Button onClick={() => handleSaveSettings("Notifications")}>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blockchain Settings */}
        <TabsContent value="blockchain">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Blockchain Settings
              </CardTitle>
              <CardDescription>Configure blockchain network and transaction parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="network">Network</Label>
                  <Select value={settings.blockchain.network}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avalanche">Avalanche Mainnet</SelectItem>
                      <SelectItem value="avalanche-testnet">Avalanche Testnet</SelectItem>
                      <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmations">Required Confirmations</Label>
                  <Input
                    id="confirmations"
                    type="number"
                    value={settings.blockchain.confirmations}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        blockchain: { ...settings.blockchain, confirmations: Number.parseInt(e.target.value) },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nodeUrl">Node URL</Label>
                <Input
                  id="nodeUrl"
                  value={settings.blockchain.nodeUrl}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      blockchain: { ...settings.blockchain, nodeUrl: e.target.value },
                    })
                  }
                />
              </div>

              <Separator />
              <Button onClick={() => handleSaveSettings("Blockchain")}>
                <Save className="mr-2 h-4 w-4" />
                Save Blockchain Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Settings
              </CardTitle>
              <CardDescription>Configure SMTP settings for email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.email.smtpHost}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, smtpHost: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={settings.email.smtpPort}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, smtpPort: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, fromEmail: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={settings.email.fromName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, fromName: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <Separator />
              <div className="flex gap-2">
                <Button onClick={() => handleSaveSettings("Email")}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Email Settings
                </Button>
                <Button variant="outline" onClick={handleTestEmail}>
                  <Mail className="mr-2 h-4 w-4" />
                  Test Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
