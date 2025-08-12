import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, AlertCircle, BookOpen } from "lucide-react"

export function AttendanceRules() {
  const rules = [
    { exam: "1st Internal Exam", attendance: "65%", icon: BookOpen, color: "text-blue-600" },
    { exam: "2nd Internal Exam", attendance: "70%", icon: AlertCircle, color: "text-orange-500" },
    { exam: "External Exam", attendance: "75%", icon: CheckCircle, color: "text-red-600" },
  ]

  return (
    <Card className="bg-white border-red-200">
      <CardHeader className="bg-red-50">
        <CardTitle className="text-red-600 flex items-center gap-2">🎓 Attendance Rules</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-red-600">Exam Type</TableHead>
              <TableHead className="text-red-600">Attendance Required</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule, index) => (
              <TableRow key={index} className="hover:bg-red-50">
                <TableCell className="flex items-center gap-2">
                  <rule.icon className={`h-4 w-4 ${rule.color}`} />
                  {rule.exam}
                </TableCell>
                <TableCell className="font-semibold text-red-600">{rule.attendance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
