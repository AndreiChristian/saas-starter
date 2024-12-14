import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetFullList } from '@/hooks/pb/useGetFullList'
import LessonsTableRow from './LessonsTableRow'
import CreateNewLesson from './CreateNewLesson'


export default function LessonsTable() {

  const { data, loading, error, fetchRecords } = useGetFullList({
    collection: "lessons"
  })

  return <>
    <h1>Lessons</h1>
    <CreateNewLesson refetch={fetchRecords} />
    {data && <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nr</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead  >Done</TableHead>
          <TableHead  >Edit</TableHead>
          <TableHead  >Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data) => (
          <LessonsTableRow data={data} refetch={fetchRecords} key={data.id} />
        ))}
      </TableBody>
    </Table>}
  </>
}
