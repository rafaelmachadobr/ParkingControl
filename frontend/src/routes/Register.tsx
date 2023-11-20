import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";
import { UserRequest } from "../types/UserRequest";

const Register = () => {
  const { signed } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserRequest>();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const onSubmit = async (data: UserRequest) => {
    if (!data.email || !data.password || !data.confirmPassword) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("As senhas não conferem!");
      return;
    }

    try {
      const response = await api.post("/api/v1/auth/register", {
        email: data.email,
        password: data.password,
        role: "ADMIN",
      });

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      toast.success("Usuário cadastrado com sucesso!");
      navigate("/auth/login");
    } catch (error) {
      toast.error("Erro ao cadastrar usuário!");
    }
  };

  React.useEffect(() => {
    if (signed) {
      navigate("/");
    }
  }, [signed, navigate]);

  return (
    <main className="bg-gray-100">
      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
        maxWidth="xs"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            border: "1px solid #ccc",
            maxWidth: "4020px",
            width: "100%",
          }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <Typography component="h1" variant="h5">
            Registre-se
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              {...register("email", { required: "Campo obrigatório" })}
              autoComplete="email"
              autoFocus
            />
            {errors.email && (
              <Typography variant="caption" color="error">
                {errors.email.message}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("password", { required: "Campo obrigatório" })}
              name="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <Typography variant="caption" color="error">
                {errors.password.message}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("confirmPassword", {
                required: "Campo obrigatório",
                validate: (value) =>
                  value === watch("password") || "As senhas não conferem",
              })}
              label="Confirmar Senha"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.confirmPassword && (
              <Typography variant="caption" color="error">
                {errors.confirmPassword.message}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar Conta
            </Button>
          </form>
          <div>
            <Typography color="text.secondary" align="center">
              Já tem uma conta?{" "}
              <Link to="/auth/login" className="text-blue-500">
                Entrar
              </Link>
            </Typography>
          </div>
        </Box>
      </Container>
    </main>
  );
};

export default Register;
