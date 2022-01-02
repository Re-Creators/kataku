import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Overlay from "../components/Overlay";

function MainLayout() {
  const [toggleSidebar, seToggleSidebar] = useState(false);
  return (
    <>
      <Topbar toggleSidebar={() => seToggleSidebar(true)} />
      <CSSTransition
        in={toggleSidebar}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <Sidebar toggleSidebar={() => seToggleSidebar(false)} />
      </CSSTransition>
      <Outlet />
      <CSSTransition
        in={toggleSidebar}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <Overlay />
      </CSSTransition>
    </>
  );
}

export default MainLayout;
