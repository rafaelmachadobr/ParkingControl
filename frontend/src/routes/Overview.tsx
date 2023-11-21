import { Box, Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { OverviewBudget } from "../components/OverviewBudget";
import OverviewSales from "../components/OverviewSales";
import { OverviewTasksProgress } from "../components/OverviewTasksProgress";
import { OverviewTotalCustomers } from "../components/OverviewTotalCustomers";
import { OverviewTotalProfit } from "../components/OverviewTotalProfit";
import OverviewTraffic from "../components/OverviewTraffic";
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
                    value="R$ 2 Mil"
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={3} item>
                  <OverviewTotalCustomers
                    difference={16}
                    positive={false}
                    sx={{ height: "100%" }}
                    value="18"
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={3} item>
                  <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
                </Grid>
                <Grid xs={12} sm={6} lg={3} item>
                  <OverviewTotalProfit
                    sx={{ height: "100%" }}
                    value="R$ 3 Mil"
                  />
                </Grid>
                <Grid xs={12} lg={8} item>
                  <OverviewSales
                    chartSeries={[
                      {
                        name: "Este ano",
                        data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                      },
                      {
                        name: "Ano passado",
                        data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                      },
                    ]}
                    sx={{ height: "100%" }}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={4} item>
                  <OverviewTraffic
                    chartSeries={[63, 15, 22, 12, 14]}
                    labels={["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]}
                    sx={{ height: "100%" }}
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
