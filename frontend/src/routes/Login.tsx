import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { signIn, signed } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = async (data: LoginForm) => {
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Preencha todos os campos!");
      return;
    }

    signIn(data);
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
            Bem-vindo de volta!
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              {...register("email")}
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
              {...register("password")}
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
                      onMouseDown={handleMouseDownPassword}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </form>
          <div>
            <Typography color="text.secondary" align="center">
              Não tem uma conta?{" "}
              <Link to="/auth/register" className="text-blue-500">
                Registre-se
              </Link>
            </Typography>
          </div>
        </Box>
      </Container>
    </main>
  );
};

export default Login;
