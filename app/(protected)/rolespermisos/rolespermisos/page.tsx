import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, XCircle } from "lucide-react"

// Mock data for roles and permissions
const rolesData = [
  {
    name: "Admin",
    description: "Full access to all features",
    permissions: [
      { name: "Create Users", allowed: true },
      { name: "Delete Users", allowed: true },
      { name: "Edit Settings", allowed: true },
      { name: "View Reports", allowed: true },
    ],
  },
  {
    name: "Editor",
    description: "Can edit and publish content",
    permissions: [
      { name: "Create Users", allowed: false },
      { name: "Delete Users", allowed: false },
      { name: "Edit Settings", allowed: false },
      { name: "View Reports", allowed: true },
    ],
  },
  {
    name: "Viewer",
    description: "Read-only access to content",
    permissions: [
      { name: "Create Users", allowed: false },
      { name: "Delete Users", allowed: false },
      { name: "Edit Settings", allowed: false },
      { name: "View Reports", allowed: true },
    ],
  },
]

export default function RolesAndPermissions() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Roles and Permissions</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rolesData.map((role) => (
          <Card key={role.name} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {role.name}
                <Badge variant="secondary">{role.name}</Badge>
              </CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="permissions">
                  <AccordionTrigger>View Permissions</AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Permission</TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {role.permissions.map((permission) => (
                          <TableRow key={permission.name}>
                            <TableCell>{permission.name}</TableCell>
                            <TableCell className="text-right">
                              {permission.allowed ? (
                                <CheckCircle2 className="inline-block w-5 h-5 text-green-500" />
                              ) : (
                                <XCircle className="inline-block w-5 h-5 text-red-500" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}