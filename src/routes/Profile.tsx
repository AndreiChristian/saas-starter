import { pb } from "../hooks/pb/main"

export default function ProfileRoute() {

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
  </>
}
