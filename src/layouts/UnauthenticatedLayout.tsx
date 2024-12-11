import { Link, Outlet } from "react-router-dom";

export default function UnathenticatedLayout() {
  return <>
    <nav style={{ width: "100%", display: "flex", flex: "row", "justifyContent": "space-between", boxSizing: "border-box", "padding": "5px", gap: "5px" }}>
      <span>SaasStarter</span>
      <span style={{ flex: "1" }} ></span>
      <Link to={'/signup'} >Signup</Link>
      <Link to={'/Login'} >Login</Link>
    </nav>
    <Outlet />
  </>
}
