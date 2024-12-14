import { Link, Outlet } from "react-router-dom";

export default function UnathenticatedLayout() {
  return <section className="h-screen max-h-screen box-border flex flex-col items-center justify-start" >
    <nav className="w-full bg-bg box-border p-5 flex  gap-5" >
      <Link to={'/'} >SaasStarter</Link>
      <span className="flex-1"></span>
      <Link to={'/login'} >Login</Link>
      <Link to={'/signup'} >Signup</Link>
    </nav>
    <Outlet />
  </section>
}
