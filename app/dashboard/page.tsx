"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from "@/lib/auth"
import { getAnalytics, getNotifications } from "@/lib/database"
import { Users, Eye, Bell, Calendar, Clock, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [analytics, setAnalytics] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    fetchDashboardData()
  }, [])

  const checkUser = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
  }

  const fetchDashboardData = async () => {
    try {
      // Fetch analytics
      const { data: analyticsData } = await getAnalytics()

      if (analyticsData) {
        setAnalytics(analyticsData)
      }

      // Fetch notifications
      const { data: notificationsData } = await getNotifications(5)

      if (notificationsData) {
        setNotifications(notificationsData)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextExamDate = new Date("2024-02-15")
  const today = new Date()
  const daysUntilExam = Math.ceil((nextExamDate.getTime() - today.getTime()) / (1000 * 3600 * 24))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-red-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
            Welcome back, {user?.displayName || "Student"}! 👋
          </h1>
          <p className="text-gray-600">Here's your academic overview and latest updates.</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Visitors Today</CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{analytics?.views || 45}</div>
              <p className="text-xs text-gray-600">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Active Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{analytics?.unique_users || 12}</div>
              <p className="text-xs text-gray-600">Currently online</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Next Exam</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {daysUntilExam > 0 ? `${daysUntilExam} days` : "Today!"}
              </div>
              <p className="text-xs text-gray-600">Internal Assessment</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">78%</div>
              <p className="text-xs text-gray-600">Above minimum required</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Notifications */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Latest Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className="border-l-4 border-red-500 pl-4 py-2">
                      <h4 className="font-semibold text-red-600">{notification.title}</h4>
                      <p className="text-gray-600 text-sm">{notification.body}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No notifications yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon Features */}
          <Card className="border-orange-200">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                Coming Soon Features
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <h4 className="font-semibold text-red-600">How Many Bunks I Can Have</h4>
                    <p className="text-sm text-gray-600">Calculate maximum absences while staying eligible</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-600 border-orange-300">Coming Soon</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <h4 className="font-semibold text-red-600">Grade Predictor</h4>
                    <p className="text-sm text-gray-600">Predict your final grades based on current performance</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-600 border-orange-300">Coming Soon</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <h4 className="font-semibold text-red-600">Study Planner</h4>
                    <p className="text-sm text-gray-600">AI-powered study schedule optimization</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-600 border-orange-300">Coming Soon</Badge>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">🚀 Exciting Updates Ahead!</h3>
                  <p className="text-sm opacity-90">
                    We're working hard to bring you these amazing features. Stay tuned!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-600">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="bg-red-600 hover:bg-red-700 h-16">📊 Check Marks Calculator</Button>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 h-16 bg-transparent">
                  📅 View Attendance Rules
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 h-16 bg-transparent"
                >
                  🔔 View All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
