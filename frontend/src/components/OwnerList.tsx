import { Add, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../services/api";
import { Owner } from "../types/Owner";
import Loading from "./Loading";

const OwnerList = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<Owner>();

  const [searchTerm, setSearchTerm] = useState("");
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddOwner: SubmitHandler<Owner> = async (data) => {
    try {
      const response = await api.post("/api/v1/owners", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
        },
      });

      setOwners((prevOwners) => [...prevOwners, response.data]);

      alert(data.firstName + " adicionado com sucesso!");

      reset();
      handleClose();
    } catch (error) {
      alert("Erro ao adicionar cliente!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/v1/owners", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
          },
        });

        setOwners(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "firstName", headerName: "Nome", flex: 1 },
    { field: "lastName", headerName: "Sobrenome", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "phone", headerName: "Telefone", flex: 1 },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4">Clientes</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpen}
        >
          Adicionar
        </Button>
      </Box>
      <TextField
        id="search"
        label="Pesquisar"
        variant="outlined"
        sx={{ mb: 4 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <div style={{ maxHeight: 400, width: "100%" }}>
        <DataGrid
          rows={owners.filter(
            (owner) =>
              owner.id.toString().includes(searchTerm) ||
              owner.firstName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              owner.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              owner.phone.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
          component="form"
          noValidate
          onSubmit={handleSubmit(handleAddOwner)}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adicionar Cliente
          </Typography>
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

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            type="submit"
          >
            Adicionar
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default OwnerList;
