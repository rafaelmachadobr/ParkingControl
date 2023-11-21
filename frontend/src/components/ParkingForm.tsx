import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Car } from "../types/Car";
import { ParkingSpot } from "../types/ParkingSpot";

interface ParkingFormProps {
  register: ReturnType<typeof useForm>["register"];
  errors: {
    number?: {
      message: string;
    };
    car?: {
      message: string;
    };
  };
  cars: Car[];
  parkingSpots: ParkingSpot[];
}

const ParkingForm: React.FC<ParkingFormProps> = ({
  register,
  errors,
  cars,
  parkingSpots,
}) => {
  return (
    <>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="number-label">Selecione uma vaga</InputLabel>
        <Select
          labelId="number-label"
          id="number"
          label="Selecione uma vaga"
          {...register("number", {
            required: "Este campo é obrigatório",
          })}
        >
          {parkingSpots.map((parkingSpot) => (
            <MenuItem key={parkingSpot.id} value={parkingSpot.id}>
              {parkingSpot.number}
            </MenuItem>
          ))}
        </Select>
        {errors.number && (
          <Typography variant="caption" color="error">
            {errors.number.message}
          </Typography>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="car-label">Selecione um carro</InputLabel>
        <Select
          labelId="car-label"
          id="car"
          label="Selecione um carro"
          {...register("car", {
            required: "Este campo é obrigatório",
          })}
        >
          {cars.map((car) => (
            <MenuItem key={car.id} value={car.id}>
              {car.plate}
            </MenuItem>
          ))}
        </Select>
        {errors.car && (
          <Typography variant="caption" color="error">
            {errors.car.message}
          </Typography>
        )}
      </FormControl>
    </>
  );
};

export default ParkingForm;
