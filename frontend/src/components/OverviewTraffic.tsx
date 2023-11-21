import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface OverviewTrafficProps {
  chartSeries: number[];
  labels: string[];
  sx?: any;
}

const OverviewTraffic: React.FC<OverviewTrafficProps> = ({
  chartSeries,
  labels,
  sx,
}) => {
  const options = {
    labels: labels,
    colors: ["#36A2EB", "#FFCE56", "#4CAF50", "#FF6384", "#FF9F40"],
    legend: {
      position: "bottom",
    },
  };

  return (
    <Paper sx={{ p: 2, ...sx }}>
      <Box>
        <Typography variant="h6" mb={2}>
          Dia da Semana com Maior Ocupação
        </Typography>
        <ReactApexChart
          type="donut"
          options={options}
          series={chartSeries}
          height={300}
        />
      </Box>
    </Paper>
  );
};

export default OverviewTraffic;
