import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Overlay from "../components/Overlay";
import { useSelector } from "react-redux";
import { userSelector } from "../features/user/userSlice";

function MainLayout() {
  const [toggleSidebar, seToggleSidebar] = useState(false);
  const { user, isFetching } = useSelector(userSelector);
  const location = useLocation();

  if (isFetching) return <p>Loading</p>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

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
