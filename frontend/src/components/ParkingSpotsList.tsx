import { Box, Button, Container, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { ParkingSpot } from "../types/ParkingSpot";
import Loading from "./Loading";
import ParkingSpotsModal from "./ParkingSpotsModal";
import ParkingSpotsTable from "./ParkingSpotsTable";
import { Search } from "@mui/icons-material";

const ParkingSpotsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/v1/parking-spots", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
          },
        });
        setParkingSpots(response.data);
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
        <Typography variant="h4">Vagas de Estacionamento</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
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
      <ParkingSpotsTable parkingSpots={parkingSpots} searchTerm={searchTerm} />
      <ParkingSpotsModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default ParkingSpotsList;
