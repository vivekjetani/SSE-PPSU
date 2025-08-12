"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getCurrentUser, getUserData } from "@/lib/auth"
import { getAnalytics, getNotifications, createNotification, getUsers } from "@/lib/database"
import { Users, Eye, Bell, Send, Shield } from "lucide-react"

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [analytics, setAnalytics] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [notificationTitle, setNotificationTitle] = useState("")
  const [notificationBody, setNotificationBody] = useState("")
  const [sendingNotification, setSendingNotification] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    checkUser()
    fetchAdminData()
  }, [])

  const checkUser = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    
    // Get user data from Firestore to check role
    const { data: userData } = await getUserData(currentUser.uid)
    if (userData?.role !== "admin") {
      router.push("/dashboard")
      return
    }
    setUser({ ...currentUser, ...userData })
  }

  const fetchAdminData = async () => {
    try {
      // Fetch analytics
      const { data: analyticsData } = await getAnalytics()

      if (analyticsData) {
        setAnalytics(analyticsData)
      } else {
        setAnalytics({ views: 0, unique_users: 0 })
      }

      // Fetch all notifications
      const { data: notificationsData } = await getNotifications(50)

      if (notificationsData) {
        setNotifications(notificationsData)
      }

      // Fetch users
      const { data: usersData } = await getUsers()
      if (usersData) {
        setUsers(usersData)
      } else {
        // Fallback to mock data if no users found
        setUsers([
          { id: 1, name: "John Doe", email: "john@student.edu", role: "student", last_login: "2024-01-15" },
          { id: 2, name: "Jane Smith", email: "jane@student.edu", role: "student", last_login: "2024-01-14" },
          { id: 3, name: "Admin User", email: "admin@college.edu", role: "admin", last_login: "2024-01-15" },
        ])
      }
    } catch (error) {
      console.error("Error fetching admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  const sendNotification = async (e: React.FormEvent) => {
    e.preventDefault()
    setSendingNotification(true)
    setMessage("")

    try {
      const { error } = await createNotification({
        title: notificationTitle,
        body: notificationBody,
        created_by: user.uid || user.id,
      })

      if (error) {
        setMessage("Error sending notification: " + error.message)
      } else {
        setMessage("Notification sent successfully!")
        setNotificationTitle("")
        setNotificationBody("")
        fetchAdminData() // Refresh notifications
      }
    } catch (error) {
      setMessage("Error sending notification")
    } finally {
      setSendingNotification(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-red-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-red-600">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage users, send notifications, and view analytics.</p>
        </div>

        {/* Analytics Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{users.length}</div>
              <p className="text-xs text-gray-600">Registered accounts</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Active Today</CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{analytics?.unique_users || 12}</div>
              <p className="text-xs text-gray-600">Users online today</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{analytics?.views || 45}</div>
              <p className="text-xs text-gray-600">Today's traffic</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{notifications.length}</div>
              <p className="text-xs text-gray-600">Total sent</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Send Notification */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Notification
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {message && (
                <Alert
                  className={`mb-4 ${message.includes("Error") ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}
                >
                  <AlertDescription className={message.includes("Error") ? "text-red-600" : "text-green-600"}>
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={sendNotification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-red-600">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                    placeholder="Notification title"
                    required
                    className="border-red-200 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body" className="text-red-600">
                    Message
                  </Label>
                  <Textarea
                    id="body"
                    value={notificationBody}
                    onChange={(e) => setNotificationBody(e.target.value)}
                    placeholder="Notification message"
                    required
                    rows={4}
                    className="border-red-200 focus:border-red-500"
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={sendingNotification}>
                  {sendingNotification ? "Sending..." : "Send to All Users"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r-lg">
                      <h4 className="font-semibold text-red-600">{notification.title}</h4>
                      <p className="text-gray-600 text-sm">{notification.body}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No notifications sent yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-600 flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-red-600">Name</TableHead>
                  <TableHead className="text-red-600">Email</TableHead>
                  <TableHead className="text-red-600">Role</TableHead>
                  <TableHead className="text-red-600">Last Login</TableHead>
                  <TableHead className="text-red-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-red-50">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{user.last_login}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
