import { Navigate, Outlet } from "react-router-dom"


export const Authorized = () => {
  if (localStorage.getItem("paws_token")) {
    return (
      <>
        <main className="p-4">
          <Outlet />
        </main>
      </>
    )
  }
  return <Navigate to="/login" replace />
}