import { pb } from "../hooks/pb/main"
import { useAuth } from "../context/AuthContext"
import { Button } from "../components/ui/button"

export default function ProfileRoute() {

  const { logout } = useAuth()

  async function requestPasswordChange() {
    console.log("function called")
    try {
      await pb.collection("users").requestPasswordReset("andreichristiannetoiu@gmail.com")
    } catch (error) {
      console.error(error)
    }
  }

  return <>
    <h1>Your Profile</h1>
    <button onClick={requestPasswordChange} >Request password change</button>
    <Button onClick={logout} >Logout</Button>
  </>
}
