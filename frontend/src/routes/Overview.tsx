import { useContext } from "react";
import Header from "../components/Header";
import Siderbar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Overview = () => {
  const { signed } = useContext(AuthContext);

  if (!signed) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="flex">
      <Siderbar />
      <div className="w-full">
        <Header />
      </div>
    </div>
  );
};

export default Overview;
