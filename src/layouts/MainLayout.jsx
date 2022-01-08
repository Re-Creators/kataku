import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useSelector } from "react-redux";
import { userSelector } from "../features/user/userSlice";
import ModalContainer from "../components/modals/ModalContainer";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/user/userSlice";
import { logout } from "../features/user/userSlice";
import Spinner from "../components/Spinner";

function MainLayout() {
  const [loading, setLoading] = useState(true);
  const { user, isSuccess } = useSelector(userSelector);
  const [toggleSidebar, seToggleSidebar] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("kataku_token")) {
      dispatch(fetchUser());
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
    }
  }, [isSuccess]);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner classSize="w-10 h-10" />
      </div>
    );
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
