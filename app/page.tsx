"use client"

import { AttendanceRulesNew } from "@/components/attendance-rules-new"
import { MarksRules } from "@/components/marks-rules"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calculator, Clock, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [animatedText, setAnimatedText] = useState("")
  const fullText = "Know Your Attendance. Track Your Exams. Stay Eligible."

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setAnimatedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-6">
            {animatedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your comprehensive student dashboard for tracking attendance, calculating marks, and ensuring exam
            eligibility across PG, UG, and Diploma programs.
          </p>
          {/* Removed login and signup buttons */}
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Calculator className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-red-600">Smart Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Calculate pass/fail status for PG, UG, and Diploma programs with our intelligent marking system.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-red-600">Attendance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Monitor your attendance and know exactly what you need for exam eligibility.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <CardTitle className="text-red-600">Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  "How Many Classes I Have To Attend" calculator and more exciting features!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Marks & Passing Rules Section */}
          <div className="mb-12">
            <MarksRules />
          </div>

          {/* Attendance Rules & Eligibility Section */}
          <div className="mb-12">
            <AttendanceRulesNew />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Academic Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who are already using SSE to stay on top of their studies.
          </p>
          {/* Removed signup CTA button */}
        </div>
      </section>
    </div>
  )
}
