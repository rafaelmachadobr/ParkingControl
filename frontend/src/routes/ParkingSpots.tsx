import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ParkingSpotsList from "../components/ParkingSpotsList";
import Siderbar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";

const ParkingSpots = () => {
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
      <main className="bg-gray-100 w-full h-screen">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <ParkingSpotsList />
        </div>
      </main>
    </div>
  );
};

export default ParkingSpots;
