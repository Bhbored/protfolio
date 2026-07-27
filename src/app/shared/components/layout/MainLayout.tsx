import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <NavMenu />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
