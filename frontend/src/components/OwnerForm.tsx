import { FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface OwnerFormProps {
  register: ReturnType<typeof useForm>["register"];
  errors: {
    firstName?: {
      message: string;
    };
    lastName?: {
      message: string;
    };
    email?: {
      message: string;
    };
    phone?: {
      message: string;
    };
  };
}

const OwnerForm: React.FC<OwnerFormProps> = ({ register, errors }) => {
  return (
    <>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <TextField
          required
          id="firstName"
          label="Primeiro Nome"
          {...register("firstName", {
            required: "Este campo é obrigatório",
          })}
        />
        {errors.firstName && (
          <Typography variant="caption" color="error">
            {errors.firstName.message}
          </Typography>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <TextField
          required
          id="lastName"
          label="Sobrenome"
          {...register("lastName", {
            required: "Este campo é obrigatório",
          })}
        />
        {errors.lastName && (
          <Typography variant="caption" color="error">
            {errors.lastName.message}
          </Typography>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <TextField
          required
          id="email"
          label="E-mail"
          {...register("email", {
            required: "Este campo é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Endereço de e-mail inválido",
            },
          })}
        />
        {errors.email && (
          <Typography variant="caption" color="error">
            {errors.email.message}
          </Typography>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <TextField
          required
          id="phone"
          label="Telefone"
          {...register("phone", {
            required: "Este campo é obrigatório",
            pattern: {
              value: /^\([1-9]{2}\) [9]{1}[0-9]{4}-[0-9]{4}$/,
              message: "Formato de telefone inválido. Use (XX) 9XXXX-XXXX",
            },
          })}
        />
        {errors.phone && (
          <Typography variant="caption" color="error">
            {errors.phone.message}
          </Typography>
        )}
      </FormControl>
    </>
  );
};

export default OwnerForm;
