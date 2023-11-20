import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Siderbar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import OwnerList from "../components/OwnerList";

const Clients = () => {
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
        <OwnerList />
      </div>
    </div>
  );
};

export default Clients;
