import { Box, Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { OverviewBudget } from "../components/OverviewBudget";
import { OverviewTasksProgress } from "../components/OverviewTasksProgress";
import { OverviewTotalCustomers } from "../components/OverviewTotalCustomers";
import { OverviewTotalProfit } from "../components/OverviewTotalProfit";
import Siderbar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";

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
        <main className="bg-gray-100 w-full h-screen gap-4">
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 4,
            }}
          >
            <Container maxWidth="xl">
              <Grid container spacing={3}>
                <Grid xs={12} sm={6} lg={3} item>
                  <OverviewBudget
                    difference={12}
                    positive
                    sx={{ height: "100%" }}
                    value="R$ 12 Mil"
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={3} item>
                  <OverviewTotalCustomers
                    difference={16}
                    positive={false}
                    sx={{ height: "100%" }}
                    value="700"
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={3} item>
                  <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
                </Grid>
                <Grid xs={12} sm={6} lg={3} item>
                  <OverviewTotalProfit
                    sx={{ height: "100%" }}
                    value="R$ 53 Mil"
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </main>
      </div>
    </div>
  );
};

export default Overview;
