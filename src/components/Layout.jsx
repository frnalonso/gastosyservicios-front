import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import PageContainer from "./PageContainer"

const Layout = () => {
  return (
    <div>
    <NavBar />
    <PageContainer>
      <Outlet />
    </PageContainer>
    </div>
  )
}

export default Layout
