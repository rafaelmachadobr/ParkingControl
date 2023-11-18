import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Siderbar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/Loading";

const Overview = () => {
  const { signed } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(delay);
  }, []);

  if (loading) {
    return <Loading />;
  }

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
