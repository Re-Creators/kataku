import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useSelector } from "react-redux";
import { userSelector } from "../features/user/userSlice";
import ModalContainer from "../components/modals/ModalContainer";

function MainLayout() {
  const [toggleSidebar, seToggleSidebar] = useState(false);
  const { user, isFetching } = useSelector(userSelector);
  const location = useLocation();

  if (isFetching) return <p>Loading</p>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

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
