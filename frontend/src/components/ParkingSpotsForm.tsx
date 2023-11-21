import { FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface ParkingSpotFormProps {
  register: ReturnType<typeof useForm>["register"];
  errors: {
    number?: {
      message: string;
    };
  };
}

const ParkingSpotForm: React.FC<ParkingSpotFormProps> = ({
  register,
  errors,
}) => {
  return (
    <>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <TextField
          required
          id="number"
          label="Número"
          {...register("number", {
            required: "Este campo é obrigatório",
          })}
        />
        {errors.number && (
          <Typography variant="caption" color="error">
            {errors.number.message}
          </Typography>
        )}
      </FormControl>
    </>
  );
};

export default ParkingSpotForm;
