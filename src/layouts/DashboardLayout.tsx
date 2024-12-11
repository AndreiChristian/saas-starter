import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {

  const { logout, user } = useAuth()

  return (
    <>
      <h1>Dashboard</h1>
      <h2>{user.email}</h2>
      <ul>
        <li>
          <Link to={'/dashboard/profile'} >Your profile</Link>
        </li>
        <li>
          <Link to={'/dashboard/classes'} >Classes</Link>
        </li>
      </ul>
      <br />
      <button onClick={logout}>Logout</button>
      <Outlet />
    </>
  )
}
