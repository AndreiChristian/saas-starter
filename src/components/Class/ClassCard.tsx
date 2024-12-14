
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
  data: any,
  loading: boolean
}

export default function ClassCard({ data, loading }: Props) {

  if (loading) {
    return <Card className="w-full" >
      <CardHeader>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-1/2 " />
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-12 w-20" />
        <Skeleton className="h-12 w-20 " />
      </CardFooter>
    </Card>
  }

  return <Card className="w-full" >
    <CardHeader>
      <CardTitle>{data.name}</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="neutral">Update</Button>
      <Button>Delete</Button>
    </CardFooter>
  </Card>
}
