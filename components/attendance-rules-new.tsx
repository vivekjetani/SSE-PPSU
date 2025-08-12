"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, CheckCircle, XCircle, Info, BookOpen, GraduationCap, Award, AlertCircle, Calendar } from "lucide-react"

interface AttendanceData {
  totalClasses: number
  attendedClasses: number
  attendancePercentage: number
}

interface AttendanceRulesData {
  level: string
  firstInternal: number
  secondInternal: number
  externalExam: number
  gracePeriod: number
}

const attendanceRulesData: Record<string, AttendanceRulesData> = {
  pg: {
    level: "Postgraduate (PG)",
    firstInternal: 65,
    secondInternal: 70,
    externalExam: 75,
    gracePeriod: 5
  },
  ug: {
    level: "Undergraduate (UG)",
    firstInternal: 60,
    secondInternal: 65,
    externalExam: 70,
    gracePeriod: 10
  },
  diploma: {
    level: "Diploma",
    firstInternal: 55,
    secondInternal: 60,
    externalExam: 65,
    gracePeriod: 15
  }
}

const examples = {
  pg: [
    {
      title: "✅ ELIGIBLE Example",
      totalClasses: 100,
      attendedClasses: 78,
      attendancePercentage: 78,
      result: "ELIGIBLE",
      reason: "Attendance (78%) meets all exam requirements: 1st Internal (65%), 2nd Internal (70%), External (75%)"
    },
    {
      title: "❌ NOT ELIGIBLE Example",
      totalClasses: 100,
      attendedClasses: 70,
      attendancePercentage: 70,
      result: "NOT ELIGIBLE",
      reason: "Attendance (70%) below External Exam requirement (75%)"
    }
  ],
  ug: [
    {
      title: "✅ ELIGIBLE Example",
      totalClasses: 100,
      attendedClasses: 75,
      attendancePercentage: 75,
      result: "ELIGIBLE",
      reason: "Attendance (75%) meets all exam requirements: 1st Internal (60%), 2nd Internal (65%), External (70%)"
    },
    {
      title: "❌ NOT ELIGIBLE Example",
      totalClasses: 100,
      attendedClasses: 65,
      attendancePercentage: 65,
      result: "NOT ELIGIBLE",
      reason: "Attendance (65%) below External Exam requirement (70%)"
    }
  ],
  diploma: [
    {
      title: "✅ ELIGIBLE Example",
      totalClasses: 100,
      attendedClasses: 70,
      attendancePercentage: 70,
      result: "ELIGIBLE",
      reason: "Attendance (70%) meets all exam requirements: 1st Internal (55%), 2nd Internal (60%), External (65%)"
    },
    {
      title: "❌ NOT ELIGIBLE Example",
      totalClasses: 100,
      attendedClasses: 60,
      attendancePercentage: 60,
      result: "NOT ELIGIBLE",
      reason: "Attendance (60%) below External Exam requirement (65%)"
    }
  ]
}

export function AttendanceRulesNew() {
  const [activeTab, setActiveTab] = useState("pg")
  const [calculatorData, setCalculatorData] = useState<AttendanceData>({
    totalClasses: 0,
    attendedClasses: 0,
    attendancePercentage: 0
  })
  const [selectedLevel, setSelectedLevel] = useState("pg")
  const [showResult, setShowResult] = useState(false)

  const calculateAttendance = (attended: number, total: number) => {
    if (total === 0) return 0
    return Math.round((attended / total) * 100)
  }

  const checkEligibility = (data: AttendanceData, level: string) => {
    const rules = attendanceRulesData[level]
    const percentage = data.attendancePercentage
    
    const firstInternalEligible = percentage >= rules.firstInternal
    const secondInternalEligible = percentage >= rules.secondInternal
    const externalEligible = percentage >= rules.externalExam
    
    const eligible = externalEligible // Most strict requirement
    
    let reason = ""
    if (eligible) {
      reason = "Congratulations! You are eligible for all exams 🎉"
    } else {
      const failures = []
      if (!firstInternalEligible) failures.push(`1st Internal (${percentage}% < ${rules.firstInternal}%)`)
      if (!secondInternalEligible) failures.push(`2nd Internal (${percentage}% < ${rules.secondInternal}%)`)
      if (!externalEligible) failures.push(`External Exam (${percentage}% < ${rules.externalExam}%)`)
      reason = `You are not eligible because: ${failures.join(", ")}`
    }
    
    return { 
      eligible, 
      reason, 
      firstInternalEligible, 
      secondInternalEligible, 
      externalEligible 
    }
  }

  const handleCalculate = () => {
    const percentage = calculateAttendance(calculatorData.attendedClasses, calculatorData.totalClasses)
    setCalculatorData(prev => ({ ...prev, attendancePercentage: percentage }))
    setShowResult(true)
  }

  const handleInputChange = (field: keyof AttendanceData, value: string) => {
    const numValue = value === "" ? 0 : Math.max(0, parseInt(value) || 0)
    setCalculatorData(prev => ({ ...prev, [field]: numValue }))
    setShowResult(false)
  }

  const result = showResult ? checkEligibility(calculatorData, selectedLevel) : null

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Clock className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
            Attendance Rules & Eligibility
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understand attendance requirements and check your eligibility for different exams at PPSU
          </p>
        </div>

        {/* Attendance Overview */}
        <Card className="border-red-200 mb-8">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-600 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Attendance Requirements Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">1st Internal</div>
                <div className="text-sm text-gray-600">Minimum attendance required</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600 mb-2">2nd Internal</div>
                <div className="text-sm text-gray-600">Minimum attendance required</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600 mb-2">External Exam</div>
                <div className="text-sm text-gray-600">Minimum attendance required</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="text-lg font-semibold text-gray-700">
                Progressive attendance requirements for exam eligibility
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pg" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Postgraduate (PG)
            </TabsTrigger>
            <TabsTrigger value="ug" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Undergraduate (UG)
            </TabsTrigger>
            <TabsTrigger value="diploma" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Diploma
            </TabsTrigger>
          </TabsList>

          {Object.entries(attendanceRulesData).map(([key, rules]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              {/* Rules Table */}
              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-red-600">
                    {rules.level} - Attendance Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-red-600">Exam Type</TableHead>
                          <TableHead className="text-red-600 text-center">Minimum Attendance</TableHead>
                          <TableHead className="text-red-600 text-center">Grace Period</TableHead>
                          <TableHead className="text-red-600 text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                            1st Internal Exam
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {rules.firstInternal}%
                          </TableCell>
                          <TableCell className="text-center text-gray-500">
                            {rules.gracePeriod}%
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="default" className="bg-blue-100 text-blue-800">
                              Required
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                            2nd Internal Exam
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {rules.secondInternal}%
                          </TableCell>
                          <TableCell className="text-center text-gray-500">
                            {rules.gracePeriod}%
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="default" className="bg-orange-100 text-orange-800">
                              Required
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-red-600" />
                            External Exam
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {rules.externalExam}%
                          </TableCell>
                          <TableCell className="text-center text-gray-500">
                            {rules.gracePeriod}%
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="default" className="bg-red-100 text-red-800">
                              Required
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Examples Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {examples[key].map((example, index) => (
                  <Card key={index} className="border-red-200">
                    <CardHeader className="bg-red-50">
                      <CardTitle className="text-red-600 flex items-center gap-2">
                        {example.result === "ELIGIBLE" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        {example.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Classes:</span>
                          <span className="font-medium">{example.totalClasses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Attended Classes:</span>
                          <span className="font-medium">{example.attendedClasses}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold text-gray-700">Attendance:</span>
                          <span className="font-bold text-lg">{example.attendancePercentage}%</span>
                        </div>
                        <div className="mt-4">
                          <Badge 
                            variant={example.result === "ELIGIBLE" ? "default" : "destructive"}
                            className="mb-2"
                          >
                            {example.result}
                          </Badge>
                          <p className="text-sm text-gray-600">{example.reason}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Interactive Calculator - Commented Out */}
        {/* 
        <Card className="border-red-200 mt-12">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-600 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Check Your Eligibility
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="level" className="text-red-600">
                    Academic Level
                  </Label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="border-red-200 focus:border-red-500">
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pg">Postgraduate (PG)</SelectItem>
                      <SelectItem value="ug">Undergraduate (UG)</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalClasses" className="text-red-600">
                    Total Classes Conducted
                  </Label>
                  <Input
                    id="totalClasses"
                    type="number"
                    min="0"
                    value={calculatorData.totalClasses || ""}
                    onChange={(e) => handleInputChange("totalClasses", e.target.value)}
                    placeholder="Enter total classes"
                    className="border-red-200 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attendedClasses" className="text-red-600">
                    Classes Attended
                  </Label>
                  <Input
                    id="attendedClasses"
                    type="number"
                    min="0"
                    max={calculatorData.totalClasses}
                    value={calculatorData.attendedClasses || ""}
                    onChange={(e) => handleInputChange("attendedClasses", e.target.value)}
                    placeholder="Enter attended classes"
                    className="border-red-200 focus:border-red-500"
                  />
                </div>

                <Button 
                  onClick={handleCalculate}
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={!calculatorData.totalClasses || !calculatorData.attendedClasses}
                >
                  Calculate Eligibility
                </Button>
              </div>

              <div className="space-y-4">
                <div className="text-center p-6 bg-gray-50 rounded-lg border">
                  <div className="text-2xl font-bold text-gray-700 mb-2">
                    Attendance: {calculatorData.attendancePercentage}%
                  </div>
                  <div className="text-sm text-gray-600">
                    {calculatorData.attendedClasses} / {calculatorData.totalClasses} classes
                  </div>
                </div>

                {showResult && result && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge 
                        variant={result.eligible ? "default" : "destructive"}
                        className="text-lg px-6 py-2"
                      >
                        {result.eligible ? "✅ ELIGIBLE" : "❌ NOT ELIGIBLE"}
                      </Badge>
                    </div>
                    
                    <Alert className={result.eligible ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                      <AlertDescription className={result.eligible ? "text-green-600" : "text-red-600"}>
                        {result.reason}
                      </AlertDescription>
                    </Alert>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-700">
                          <strong>Requirements for {attendanceRulesData[selectedLevel].level}:</strong><br />
                          • 1st Internal: ≥ {attendanceRulesData[selectedLevel].firstInternal}%<br />
                          • 2nd Internal: ≥ {attendanceRulesData[selectedLevel].secondInternal}%<br />
                          • External Exam: ≥ {attendanceRulesData[selectedLevel].externalExam}%<br />
                          • Grace Period: {attendanceRulesData[selectedLevel].gracePeriod}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        */}

        {/* Footer Note */}
        <Alert className="mt-8 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            <strong>Attendance Percentage = (Classes Attended / Total Classes) × 100</strong><br />
            You must meet the minimum attendance requirement for each exam type to be eligible. Grace periods may apply in special circumstances.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
} 