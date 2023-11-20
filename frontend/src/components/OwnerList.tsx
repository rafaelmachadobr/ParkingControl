import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Owner } from "../types/Owner";
import Loading from "./Loading";
import OwnerModal from "./OwnerModal";
import OwnerTable from "./OwnerTable";

const OwnerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Typography variant="h4">Clientes</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
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
      />
      <OwnerTable owners={owners} searchTerm={searchTerm} />
      <OwnerModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default OwnerList;
