import { useGetFullList } from "../hooks/pb/useGetFullList"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import CreateNewClass from "../components/Class/CreateNewClass"
import { Skeleton } from "@/components/ui/skeleton"

export default function ClassesRoute() {
  const { fetchRecords, data, loading } = useGetFullList({
    collection: "classes"
  })

  return (
    <section className="flex flex-col items-center gap-10">
      <h1 className="text-3xl">Your Classes</h1>
      <div className="flex gap-5 p-5 self-start w-full">
        <CreateNewClass refetch={fetchRecords} />
        <Button onClick={fetchRecords} className="w-1/5" variant='neutral'>
          Refetch
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5 gap-5">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-32" />
          ))
          : data?.map(c => (
            <Link key={c.id} to={`/dashboard/classes/${c.id}`}>
              <Button
                className="w-full h-32 text-wrap text-xl"
                key={c.id}
              >
                {c.name}
              </Button>
            </Link>
          ))
        }
      </div>
    </section>
  )
}
