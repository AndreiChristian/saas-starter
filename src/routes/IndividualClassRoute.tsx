import { useParams } from "react-router-dom"
import { useGetOne } from "../hooks/pb/useGetOne"
import ClassCard from "@/components/Class/ClassCard"
import LessonsTable from "@/components/Class/Lessons/LessonsTable"

export default function IndividualClassRoute() {

  const { classId } = useParams()
  const { data, loading, error } = useGetOne({
    collection: "classes",
    recordId: classId || ""
  })

  if (error) {
    return <p>Error....</p>
  }


  return <section className="w-full flex flex-col justify-start items-center gap-10" >
    <ClassCard data={data} loading={loading} />
    <LessonsTable />
    <h1>Assignments</h1>
    <h1>Notes</h1>
  </section>
}
