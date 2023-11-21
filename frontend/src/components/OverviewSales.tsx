import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface OverviewSalesProps {
  chartSeries: { name: string; data: number[] }[];
  sx?: any;
}

const OverviewSales: React.FC<OverviewSalesProps> = ({ chartSeries, sx }) => {
  const options = {
    chart: {
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
    },
  };

  return (
    <Paper sx={{ p: 2, ...sx }}>
      <Box>
        <Typography variant="h6" mb={2}>
          Ocupação do Estacionamento ao longo do Tempo
        </Typography>
        <ReactApexChart
          type="line"
          options={options}
          series={chartSeries}
          height={300}
        />
      </Box>
    </Paper>
  );
};

export default OverviewSales;
