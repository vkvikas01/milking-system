import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <main className="pt-4">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
