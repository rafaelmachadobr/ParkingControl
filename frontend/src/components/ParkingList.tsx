import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Permanence } from "../types/Permanence";
import Loading from "./Loading";
import ParkingTable from "./ParkingTable";
import ParkingModal from "./ParkingModal";

const ParkingList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [permanences, setPermanences] = useState<Permanence[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/v1/permanences", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
          },
        });

        console.log(response.data);
        setPermanences(response.data);
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
        <Typography variant="h4">Carros Estacionados</Typography>
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
      <ParkingTable permanences={permanences} searchTerm={searchTerm} />
      <ParkingModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default ParkingList;
