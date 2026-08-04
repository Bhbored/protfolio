import { Outlet } from "react-router-dom"
import NavMenu from "./NavMenu"
import Footer from "./Footer"
import SectionSideNav from "./SectionSideNav"

export default function MainLayout() {
  return (
    <div className="main-layout">
      <NavMenu />
      <SectionSideNav />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
