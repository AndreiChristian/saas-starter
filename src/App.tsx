import './App.css'
import { pb } from './hooks/pb/main'

function App() {

  async function demoCreate() {
    console.log("Hello")
    const data = {
      name: "test"
    }
    const record = await pb.collection("classes").create(data)
    console.log(record)
  }

  return (
    <>
      <div>Hello</div>
      <button onClick={demoCreate} >demoCreate</button>
    </>
  )

}

export default App
