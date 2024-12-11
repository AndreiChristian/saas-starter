import { useState } from "react"
import { useGetFullList } from "../hooks/pb/useGetFullList"
import { useCreate } from "../hooks/pb/useCreate"
import { pb } from "../hooks/pb/main"
import { useUpdate } from "../hooks/pb/useUpdate"

export default function ClassesRoute() {

  const [newClass, setNewClass] = useState("")
  const [updatedClass, setUpdatedClass] = useState("")

  const { fetchRecords, data, loading, error } = useGetFullList({
    collection: "classes"
  })

  const { create, error: createError, isLoading: createLoading } = useCreate("classes")
  const { update } = useUpdate("classes")

  async function deleteClass(id: string) {
    try {
      await pb.collection("classes").delete(id)
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    <h1>Class Route</h1>
    <div>Your classes:</div>
    <button onClick={fetchRecords} >Refetch</button>
    {loading && <p>Loading...</p>}
    {error && <p>{error.message}</p>}
    {data && <ul>
      {data.map(c => (
        <li key={c.id} >
          <h3>{c.name}</h3>
          <input
            type="text"
            value={updatedClass}
            onChange={e => setUpdatedClass(e.target.value)}
            placeholder={c.name}
          />
          <button onClick={() => update(c.id, { name: updatedClass })}>Update class</button>
          <span style={{ width: "5 px" }} ></span>
          <button onClick={() => deleteClass(c.id)} >DELETE</button>
        </li>
      ))}
    </ul >}
    <input
      type="text"
      value={newClass}
      onChange={e => setNewClass(e.target.value)}
      placeholder="New class"
    />
    <button onClick={() => create({ name: newClass })}>Create New class</button>
    {createLoading && <p>Loading...</p>}
    {createError && <p>{createError.message}</p>}
  </>
}
