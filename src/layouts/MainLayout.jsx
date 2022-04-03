import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useSelector } from "react-redux";
import { userSelector } from "../features/user/userSlice";
import ModalContainer from "../components/modals/ModalContainer";
import Spinner from "../components/Spinner";

function MainLayout() {
  const { isFetching, user } = useSelector(userSelector);
  const [toggleSidebar, seToggleSidebar] = useState(false);
  const location = useLocation();

  if (!localStorage.getItem("kataku_token"))
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (isFetching || !user)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner classSize="w-10 h-10" />
      </div>
    );

  return (
    <>
      <Topbar toggleSidebar={() => seToggleSidebar(true)} />

      <ModalContainer
        onCLose={() => seToggleSidebar(false)}
        transitionName="slide"
        isModalOpen={toggleSidebar}
      >
        <Sidebar toggleSidebar={() => seToggleSidebar(false)} />
      </ModalContainer>

      <Outlet />
    </>
  );
}

export default MainLayout;
