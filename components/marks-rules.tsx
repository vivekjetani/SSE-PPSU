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
import { Calculator, CheckCircle, XCircle, Info, BookOpen, GraduationCap, Award } from "lucide-react"

interface MarksData {
  ce: number
  faculty: number
  ese: number
  total: number
}

interface RulesData {
  level: string
  ceMin: number
  eseMin: number
  totalMin: number
  ceMinPercent: number
  eseMinPercent: number
  totalMinPercent: number
}

const rulesData: Record<string, RulesData> = {
  pg: {
    level: "Postgraduate (PG)",
    ceMin: 15,
    eseMin: 30,
    totalMin: 50,
    ceMinPercent: 50,
    eseMinPercent: 50,
    totalMinPercent: 50
  },
  ug: {
    level: "Undergraduate (UG)",
    ceMin: 12,
    eseMin: 24,
    totalMin: 40,
    ceMinPercent: 40,
    eseMinPercent: 40,
    totalMinPercent: 40
  },
  diploma: {
    level: "Diploma",
    ceMin: 11,
    eseMin: 21,
    totalMin: 35,
    ceMinPercent: 35,
    eseMinPercent: 35,
    totalMinPercent: 35
  }
}

const examples = {
  pg: [
    {
      title: "PASS Example",
      ce: 13,
      faculty: 9,
      ese: 30,
      total: 52,
      result: "PASS",
      reason: "All requirements met: CE ≥ 15, ESE ≥ 30, Total ≥ 50"
    },
    {
      title: "FAIL Example",
      ce: 11,
      faculty: 6,
      ese: 28,
      total: 45,
      result: "FAIL",
      reason: "Failed CE minimum (11 < 15) and ESE minimum (28 < 30)"
    }
  ],
  ug: [
    {
      title: "PASS Example",
      ce: 14,
      faculty: 8,
      ese: 26,
      total: 48,
      result: "PASS",
      reason: "All requirements met: CE ≥ 12, ESE ≥ 24, Total ≥ 40"
    },
    {
      title: "FAIL Example",
      ce: 10,
      faculty: 7,
      ese: 22,
      total: 39,
      result: "FAIL",
      reason: "Failed CE minimum (10 < 12) and total minimum (39 < 40)"
    }
  ],
  diploma: [
    {
      title: "PASS Example",
      ce: 12,
      faculty: 8,
      ese: 23,
      total: 43,
      result: "PASS",
      reason: "All requirements met: CE ≥ 11, ESE ≥ 21, Total ≥ 35"
    },
    {
      title: "FAIL Example",
      ce: 9,
      faculty: 6,
      ese: 19,
      total: 34,
      result: "FAIL",
      reason: "Failed CE minimum (9 < 11) and ESE minimum (19 < 21)"
    }
  ]
}

export function MarksRules() {
  const [activeTab, setActiveTab] = useState("pg")
  const [calculatorData, setCalculatorData] = useState<MarksData>({
    ce: 0,
    faculty: 0,
    ese: 0,
    total: 0
  })
  const [selectedLevel, setSelectedLevel] = useState("pg")
  const [showResult, setShowResult] = useState(false)

  const calculateTotal = (ce: number, faculty: number, ese: number) => {
    return ce + faculty + ese
  }

  const checkResult = (data: MarksData, level: string) => {
    const rules = rulesData[level]
    const total = calculateTotal(data.ce, data.faculty, data.ese)
  
    // Pass if total >= required pass mark for level
    const totalPass = total >= rules.totalMin
    const passed = totalPass
  
    let reason = ""
    if (passed) {
      reason = `Congratulations! You passed with ${total}/100 🎉`
    } else {
      reason = `You failed because total marks are below the required minimum (${total} < ${rules.totalMin})`
    }
  
    return { passed, reason, total }
  }
  

  const handleCalculate = () => {
    const total = calculateTotal(calculatorData.ce, calculatorData.faculty, calculatorData.ese)
    setCalculatorData(prev => ({ ...prev, total }))
    setShowResult(true)
  }

  const handleInputChange = (field: keyof MarksData, value: string) => {
    const numValue = value === "" ? 0 : Math.max(0, Math.min(100, parseInt(value) || 0))
    setCalculatorData(prev => ({ ...prev, [field]: numValue }))
    setShowResult(false)
  }

  const result = showResult ? checkResult(calculatorData, selectedLevel) : null

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Calculator className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
            Marks & Passing Rules
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understand the marking structure and passing criteria for different academic levels at PPSU
          </p>
        </div>

        {/* Mark Structure Overview */}
        <Card className="border-red-200 mb-8">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-600 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Mark Structure (out of 100)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600 mb-2">30</div>
                <div className="text-sm text-gray-600">CE (Internal Exam)</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">10</div>
                <div className="text-sm text-gray-600">Faculty Evaluation</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600 mb-2">60</div>
                <div className="text-sm text-gray-600">ESE (End Semester Exam)</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="text-lg font-semibold text-gray-700">
                Final Total = 100 marks
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

          {Object.entries(rulesData).map(([key, rules]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              {/* Rules Table */}
              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-red-600">
                    {rules.level} - Passing Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-red-200">
                      <thead>
                        <tr className="bg-red-50">
                          <th className="border border-red-200 px-4 py-3 text-left font-semibold text-red-600">
                            Subject Type
                          </th>
                          <th className="border border-red-200 px-4 py-3 text-center font-semibold text-red-600">
                            CE Min
                          </th>
                          <th className="border border-red-200 px-4 py-3 text-center font-semibold text-red-600">
                            ESE Min
                          </th>
                          <th className="border border-red-200 px-4 py-3 text-center font-semibold text-red-600">
                            Final Pass
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-red-200 px-4 py-3 text-gray-700">
                            CE Only (Theory/Tutorial)
                          </td>
                          <td className="border border-red-200 px-4 py-3 text-center font-medium">
                            {rules.ceMinPercent}% ({rules.ceMin}/30)
                          </td>
                          <td className="border border-red-200 px-4 py-3 text-center text-gray-500">
                            NA
                          </td>
                          <td className="border border-red-200 px-4 py-3 text-center font-medium">
                            {rules.ceMinPercent}% Total
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-red-200 px-4 py-3 text-gray-700">
                            CE + ESE (Theory/Practical)
                          </td>
                          <td className="border border-red-200 px-4 py-3 text-center font-medium">
                            0%
                          </td>
                          <td className="border border-red-200 px-4 py-3 text-center font-medium">
                            {rules.eseMinPercent}% ({rules.eseMin}/60)
                          </td>
                          <td className="border border-red-200 px-4 py-3 text-center font-medium">
                            {rules.totalMinPercent}% ({rules.totalMin}/100)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Examples Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {examples[key].map((example, index) => (
                  <Card key={index} className="border-red-200">
                    <CardHeader className="bg-red-50">
                      <CardTitle className="text-red-600 flex items-center gap-2">
                        {example.result === "PASS" ? (
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
                          <span className="text-gray-600">CE:</span>
                          <span className="font-medium">{example.ce}/30</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Faculty:</span>
                          <span className="font-medium">{example.faculty}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ESE:</span>
                          <span className="font-medium">{example.ese}/60</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold text-gray-700">Total:</span>
                          <span className="font-bold text-lg">{example.total}/100</span>
                        </div>
                        <div className="mt-4">
                          <Badge 
                            variant={example.result === "PASS" ? "default" : "destructive"}
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

        {/* Interactive Calculator */}
        <Card className="border-red-200 mt-12">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-600 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Check If You Pass
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Form */}
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
                  <Label htmlFor="ce" className="text-red-600">
                    CE Marks (out of 30)
                  </Label>
                  <Input
                    id="ce"
                    type="number"
                    min="0"
                    max="30"
                    value={calculatorData.ce || ""}
                    onChange={(e) => handleInputChange("ce", e.target.value)}
                    placeholder="Enter CE marks"
                    className="border-red-200 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faculty" className="text-red-600">
                    Faculty Evaluation (out of 10)
                  </Label>
                  <Input
                    id="faculty"
                    type="number"
                    min="0"
                    max="10"
                    value={calculatorData.faculty || ""}
                    onChange={(e) => handleInputChange("faculty", e.target.value)}
                    placeholder="Enter faculty marks"
                    className="border-red-200 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ese" className="text-red-600">
                    ESE Marks (out of 60)
                  </Label>
                  <Input
                    id="ese"
                    type="number"
                    min="0"
                    max="60"
                    value={calculatorData.ese || ""}
                    onChange={(e) => handleInputChange("ese", e.target.value)}
                    placeholder="Enter ESE marks"
                    className="border-red-200 focus:border-red-500"
                  />
                </div>

                <Button 
                  onClick={handleCalculate}
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={!calculatorData.ce && !calculatorData.faculty && !calculatorData.ese}
                >
                  Calculate Result
                </Button>
              </div>

              {/* Result Display */}
              <div className="space-y-4">
                <div className="text-center p-6 bg-gray-50 rounded-lg border">
                  <div className="text-2xl font-bold text-gray-700 mb-2">
                    Total Marks: {calculatorData.total}/100
                  </div>
                  <div className="text-sm text-gray-600">
                    CE ({calculatorData.ce}) + Faculty ({calculatorData.faculty}) + ESE ({calculatorData.ese})
                  </div>
                </div>

                {showResult && result && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge 
                        variant={result.passed ? "default" : "destructive"}
                        className="text-lg px-6 py-2"
                      >
                        {result.passed ? "✅ PASS" : "❌ FAIL"}
                      </Badge>
                    </div>
                    
                    <Alert className={result.passed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                      <AlertDescription className={result.passed ? "text-green-600" : "text-red-600"}>
                        {result.reason}
                      </AlertDescription>
                    </Alert>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-700">
                          <strong>Requirements for {rulesData[selectedLevel].level}:</strong><br />
                          • CE: ≥ {rulesData[selectedLevel].ceMin}/30 ({rulesData[selectedLevel].ceMinPercent}%)<br />
                          • ESE: ≥ {rulesData[selectedLevel].eseMin}/60 ({rulesData[selectedLevel].eseMinPercent}%)<br />
                          • Total: ≥ {rulesData[selectedLevel].totalMin}/100 ({rulesData[selectedLevel].totalMinPercent}%)
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <Alert className="mt-8 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            <strong>Final Marks = CE (30) + Faculty (10) + ESE (60) = 100</strong><br />
            You must meet both <strong>ESE minimum</strong> and <strong>total score</strong> requirement depending on your level.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
} 