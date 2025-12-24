import { Navigate } from "react-router-dom";

const UserProtected = ({ children }) => {
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    return <Navigate to="/Account" replace />;
  }

  return children;
};

export default UserProtected;
