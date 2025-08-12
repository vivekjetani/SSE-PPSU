import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MarksCalculator() {
  const pgExamples = [
    {
      type: "PG C",
      ce: "14/40",
      ese: "30/60",
      total: "44/100",
      result: "FAIL",
      resultColor: "bg-red-100 text-red-800",
    },
    {
      type: "PG D",
      ce: "14/40",
      ese: "36/60",
      total: "50/100",
      result: "PASS",
      resultColor: "bg-green-100 text-green-800",
    },
  ]

  const ugExamples = [
    {
      type: "UG K",
      ce: "14/40",
      ese: "26/60",
      total: "40/100",
      result: "PASS",
      resultColor: "bg-green-100 text-green-800",
    },
    {
      type: "UG J",
      ce: "15/40",
      ese: "24/60",
      total: "39/100",
      result: "FAIL",
      resultColor: "bg-red-100 text-red-800",
    },
  ]

  const diplomaExamples = [
    {
      type: "Diploma T",
      ce: "14/40",
      ese: "21/60",
      total: "35/100",
      result: "PASS",
      resultColor: "bg-green-100 text-green-800",
    },
    {
      type: "Diploma S",
      ce: "20/40",
      ese: "19/60",
      total: "39/100",
      result: "FAIL",
      resultColor: "bg-red-100 text-red-800",
    },
  ]

  const PassingRulesTable = ({ title, rules, examples }: any) => (
    <div className="space-y-4">
      <div className="bg-red-50 p-4 rounded-lg">
        <h4 className="font-semibold text-red-600 mb-2">Passing Rules</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-red-600">Subject Type</TableHead>
              <TableHead className="text-red-600">CE Min</TableHead>
              <TableHead className="text-red-600">ESE Min</TableHead>
              <TableHead className="text-red-600">Final Pass</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{rule.type}</TableCell>
                <TableCell>{rule.ceMin}</TableCell>
                <TableCell>{rule.eseMin}</TableCell>
                <TableCell className="font-semibold text-red-600">{rule.finalPass}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h4 className="font-semibold text-red-600 mb-2">Examples</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-red-600">Type</TableHead>
              <TableHead className="text-red-600">CE</TableHead>
              <TableHead className="text-red-600">ESE</TableHead>
              <TableHead className="text-red-600">Total</TableHead>
              <TableHead className="text-red-600">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {examples.map((example: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{example.type}</TableCell>
                <TableCell>{example.ce}</TableCell>
                <TableCell>{example.ese}</TableCell>
                <TableCell>{example.total}</TableCell>
                <TableCell>
                  <Badge className={example.resultColor}>
                    {example.result === "PASS" ? "✅" : "❌"} {example.result}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )

  return (
    <Card className="bg-white border-red-200">
      <CardHeader className="bg-red-50">
        <CardTitle className="text-red-600">📊 Marks & Passing Rules</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="pg" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-red-100">
            <TabsTrigger value="pg" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Postgraduate (PG)
            </TabsTrigger>
            <TabsTrigger value="ug" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Undergraduate (UG)
            </TabsTrigger>
            <TabsTrigger value="diploma" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Diploma
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pg" className="mt-4">
            <PassingRulesTable
              title="Postgraduate"
              rules={[
                { type: "CE Only (Theory/Tutorial)", ceMin: "50%", eseMin: "NA", finalPass: "50%" },
                { type: "CE+ESE (Theory/Practical)", ceMin: "0%", eseMin: "50%", finalPass: "50%" },
              ]}
              examples={pgExamples}
            />
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-700">
                <strong>Mark Values:</strong> CE = 40, ESE = 60
                <br />
                CE Only: Must get 20/40 CE only, no ESE
                <br />
                CE+ESE: Must get minimum 30/60 in ESE, 0 CE required, total 50/100 minimum
              </p>
            </div>
          </TabsContent>

          <TabsContent value="ug" className="mt-4">
            <PassingRulesTable
              title="Undergraduate"
              rules={[
                { type: "CE Only (Theory/Tutorial)", ceMin: "40%", eseMin: "NA", finalPass: "40%" },
                { type: "CE+ESE (Theory/Practical)", ceMin: "0%", eseMin: "40%", finalPass: "40%" },
              ]}
              examples={ugExamples}
            />
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-700">
                <strong>Must Score:</strong>
                <br />
                CE Only: 40/100 → 16/40 in CE-only mode
                <br />
                CE+ESE: 24/60 in ESE, and CE can be 0
              </p>
            </div>
          </TabsContent>

          <TabsContent value="diploma" className="mt-4">
            <PassingRulesTable
              title="Diploma"
              rules={[
                { type: "CE Only (Theory/Tutorial)", ceMin: "35%", eseMin: "NA", finalPass: "35%" },
                { type: "CE+ESE (Theory/Practical)", ceMin: "0%", eseMin: "35%", finalPass: "35%" },
              ]}
              examples={diplomaExamples}
            />
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-700">
                <strong>Must Score:</strong>
                <br />
                CE Only: 35/100 → 14/40 (if scaled)
                <br />
                CE+ESE: 21/60 in ESE, total 35/100 min
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
