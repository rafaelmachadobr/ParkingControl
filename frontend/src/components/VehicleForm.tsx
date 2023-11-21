import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Owner } from "../types/Owner";

interface VehicleFormProps {
  register: ReturnType<typeof useForm>["register"];
  errors: {
    plate?: {
      message: string;
    };
    color?: {
      message: string;
    };
    model?: {
      message: string;
    };
    brand?: {
      message: string;
    };
    owner?: {
      message: string;
    };
  };
  owners: Owner[];
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  register,
  errors,
  owners,
}) => {
  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        id="plate"
        label="Placa"
        type="text"
        fullWidth
        {...register("plate", {
          required: "Este campo é obrigatório",
          pattern: {
            value: /^[A-Z]{3}-[0-9]{4}$/,
            message: "Placa inválida",
          },
        })}
      />
      {errors.plate && (
        <Typography variant="caption" color="error">
          {errors.plate.message}
        </Typography>
      )}
      <TextField
        margin="dense"
        id="color"
        label="Cor"
        type="text"
        fullWidth
        {...register("color", {
          required: "Este campo é obrigatório",
        })}
      />
      {errors.color && (
        <Typography variant="caption" color="error">
          {errors.color.message}
        </Typography>
      )}
      <TextField
        margin="dense"
        id="model"
        label="Modelo"
        type="text"
        fullWidth
        {...register("model", {
          required: "Este campo é obrigatório",
        })}
      />
      {errors.model && (
        <Typography variant="caption" color="error">
          {errors.model.message}
        </Typography>
      )}
      <TextField
        margin="dense"
        id="brand"
        label="Marca"
        type="text"
        fullWidth
        {...register("brand", {
          required: "Este campo é obrigatório",
        })}
      />
      {errors.brand && (
        <Typography variant="caption" color="error">
          {errors.brand.message}
        </Typography>
      )}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="owner-label">Selecione um dono</InputLabel>
        <Select
          labelId="owner-label"
          id="owner"
          label="Selecione um dono"
          {...register("owner.id", {
            required: "Este campo é obrigatório",
          })}
        >
          {owners.map((owner) => (
            <MenuItem key={owner.id} value={owner.id}>
              {owner.firstName} {owner.lastName}
            </MenuItem>
          ))}
        </Select>
        {errors.owner && (
          <Typography variant="caption" color="error">
            {errors.owner.message}
          </Typography>
        )}
      </FormControl>
    </>
  );
};

export default VehicleForm;
