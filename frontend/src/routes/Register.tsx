import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Register = () => {
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
            Cadastre-se
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirmar Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <div>
              <Typography color="text.secondary" align="center">
                Já tem uma conta?{" "}
                <a href="/auth/login" className="text-blue-500">
                  Entrar
                </a>
              </Typography>
            </div>
          </Box>
        </Box>
      </Container>
    </main>
  );
};

export default Register;
