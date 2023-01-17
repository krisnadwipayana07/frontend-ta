import { Navigate, Outlet } from "react-router-dom";

const Authorize = () => {
  // const isLogin = localStorage.getItem("token");
  // return isLogin !== null ? <Outlet /> : <Navigate to={"/admin"} />;
  return <Outlet />;
};

export default Authorize;
