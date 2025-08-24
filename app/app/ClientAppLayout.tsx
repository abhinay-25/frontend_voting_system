"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Vote,
  LayoutDashboard,
  Calendar,
  History,
  BarChart3,
  Fingerprint,
  User,
  HelpCircle,
  Bell,
  LogOut,
  Settings,
} from "lucide-react"
import { useAuthStore } from "@/store/auth"
import { useUiStore } from "@/store/ui"

const navigation = [
  { name: "Overview", href: "/app/overview", icon: LayoutDashboard },
  { name: "Elections", href: "/app/elections", icon: Calendar },
  { name: "My History", href: "/app/history", icon: History },
  { name: "Results", href: "/app/results", icon: BarChart3 },
  { name: "Enroll Biometrics", href: "/app/enroll", icon: Fingerprint },
  { name: "Profile", href: "/app/profile", icon: User },
  { name: "Support", href: "/app/support", icon: HelpCircle },
]

export default function ClientAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const { addToast } = useUiStore()

  const handleLogout = () => {
    logout()
    addToast({
      title: "Signed out",
      description: "You have been successfully signed out.",
      type: "success",
    })
    router.push("/")
  }

  if (!user) {
    router.push("/auth/login")
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar variant="inset" className="glass">
          <SidebarHeader className="border-b border-border/50">
            <div className="flex items-center space-x-2 px-2 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Vote className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-foreground">AVAx Vote</span>
                <span className="text-xs text-muted-foreground">Voter Portal</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-border/50">
            <div className="flex items-center space-x-3 px-2 py-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback className="gradient-primary text-white text-sm">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant={user.status === "approved" ? "default" : "secondary"} className="text-xs">
                    {user.status === "approved" ? "Verified" : "Pending"}
                  </Badge>
                  {user.kycVerified && (
                    <Badge variant="outline" className="text-xs">
                      KYC
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset>
          {/* Top Bar */}
          <header className="sticky top-0 z-40 glass border-b border-border/50">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div className="hidden md:block">
                  <h1 className="text-lg font-semibold text-foreground">
                    {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
                  </h1>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full text-xs flex items-center justify-center text-white">
                    2
                  </span>
                </Button>

                <ThemeToggle />

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/diverse-user-avatars.png" />
                        <AvatarFallback className="gradient-primary text-white text-sm">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/app/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/app/profile">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
