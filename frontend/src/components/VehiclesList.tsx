import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Car } from "../types/Car";
import Loading from "./Loading";
import VehicleModalAdd from "./VehicleModalAdd";
import VehicleModalInfo from "./VehicleModalInfo";

const VehiclesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Car | null>(null);

  const handleOpenModalInfo = () => setOpenModalInfo(true);
  const handleCloseModalInfo = () => {
    setOpenModalInfo(false);
    setSelectedVehicle(null);
  };

  const handleOpenModalAdd = () => setOpenModalAdd(true);
  const handleCloseModalAdd = () => setOpenModalAdd(false);

  const handleVehicleClick = (vehicle: Car) => {
    setSelectedVehicle(vehicle);
    handleOpenModalInfo();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/v1/cars", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
          },
        });
        setVehicles(response.data);
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

  return (
    <Container
      sx={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: 1,
        border: "1px solid #ccc",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4">Veículos</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModalAdd}
        >
          Adicionar
        </Button>
      </Box>
      <TextField
        label="Pesquisar"
        variant="outlined"
        size="small"
        sx={{ mb: 4 }}
        onChange={(event) => setSearchTerm(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {vehicles
          .filter(
            (vehicle) =>
              vehicle.id.toString().includes(searchTerm) ||
              vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
              vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
              vehicle.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
              vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
              vehicle.owner.firstName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              vehicle.owner.lastName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          )
          .map((vehicle) => (
            <Box
              key={vehicle.id}
              sx={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: 1,
                border: "1px solid #ccc",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => handleVehicleClick(vehicle)}
            >
              <Typography variant="h6">{vehicle.plate}</Typography>
              <Typography variant="body1">{vehicle.model}</Typography>
              <Typography variant="body1">{vehicle.color}</Typography>
            </Box>
          ))}
      </Box>

      <Modal open={openModalInfo} onClose={handleCloseModalInfo}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h4" mb={2}>
            <strong>Detalhes do Veículo</strong>
          </Typography>
          {selectedVehicle && <VehicleModalInfo vehicle={selectedVehicle} />}
        </Paper>
      </Modal>

      <VehicleModalAdd open={openModalAdd} handleClose={handleCloseModalAdd} />
    </Container>
  );
};

export default VehiclesList;
