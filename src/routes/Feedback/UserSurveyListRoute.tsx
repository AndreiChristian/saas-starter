import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { useAuth } from "../../context/AuthContext"
import { pb } from "../../hooks/pb/main"
import { useGetFullList } from "../../hooks/pb/useGetFullList"

export default function UserSurveyListRoute() {

  const { user } = useAuth()

  const { data, error, loading } = useGetFullList({
    collection: "feedback",
    filter: pb.filter("user = {:userId}", { userId: user?.id })
  })

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (data.length == 0) {
    return <div>
      <p>You have no feedbacks yet..... 😢</p>
      <Button className="w-1/2 box-border p-10" >Take the survey</Button>
    </div>
  }

  return <>
    <Table  >
      <TableCaption className="text-text dark:text-darkText">
        A list of your recent invoices.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nr</TableHead>
          <TableHead>How likely you are to recommend us?</TableHead>
          <TableHead>What do you expect?</TableHead>
          <TableHead>What we should improve?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice, index) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-base">{index + 1}</TableCell>
            <TableCell className="font-base">{invoice.netPromoterScore}</TableCell>
            <TableCell>{invoice.pains}</TableCell>
            <TableCell>{invoice.features}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
}
