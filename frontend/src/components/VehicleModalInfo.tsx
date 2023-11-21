import { Box, Typography } from "@mui/material";
import React from "react";
import { Car } from "../types/Car";

interface VehicleModalInfoProps {
  vehicle: Car;
}

const VehicleModalInfo: React.FC<VehicleModalInfoProps> = ({ vehicle }) => {
  return (
    <Box>
      <Typography variant="body1">
        <strong>Placa: </strong>
        {vehicle.plate}
      </Typography>
      <Typography variant="body1">
        <strong>Modelo: </strong>
        {vehicle.model}
      </Typography>
      <Typography variant="body1">
        <strong>Cor: </strong>
        {vehicle.color}
      </Typography>
      <Typography variant="body1">
        <strong>Marca: </strong>
        {vehicle.brand}
      </Typography>
      <Typography variant="body1">
        <strong>Cliente: </strong>
        {`${vehicle.owner.firstName} ${vehicle.owner.lastName}`}
      </Typography>
      <Typography variant="h6" mt={2} mb={1}>
        <strong>Contato do Cliente: </strong>
      </Typography>
      <Typography variant="body1">
        <strong>Telefone: </strong>
        {vehicle.owner.phone}
      </Typography>
      <Typography variant="body1">
        <strong>E-mail: </strong>
        {vehicle.owner.email}
      </Typography>
    </Box>
  );
};

export default VehicleModalInfo;
