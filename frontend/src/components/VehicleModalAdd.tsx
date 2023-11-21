import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Car } from "../types/Car";
import { Owner } from "../types/Owner";
import VehicleForm from "./VehicleForm";

interface VehicleModalAddProps {
  open: boolean;
  handleClose: () => void;
}

const VehicleModalAdd: React.FC<VehicleModalAddProps> = ({
  open,
  handleClose,
}) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<Car>();

  const [owners, setOwners] = useState<Owner[]>([]);

  useEffect(() => {
    api
      .get("/api/v1/owners", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
        },
      })
      .then((response) => setOwners(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddVehicle: SubmitHandler<Car> = async (data) => {
    try {
      const formattedData = {
        plate: data.plate,
        model: data.model,
        color: data.color,
        brand: data.brand,
        owner: {
          id: data.owner.id,
        },
      };

      console.log(formattedData);

      await api.post("/api/v1/cars", formattedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
        },
      });

      toast.success("Veículo adicionado com sucesso!");
      toast.info("Atualize a página para ver as alterações");

      reset();
      handleClose();
    } catch (error) {
      toast.error("Erro ao adicionar veículo!");
    }
  };

  return (
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
        onSubmit={handleSubmit(handleAddVehicle)}
      >
        <Typography variant="h4" mb={2}>
          <strong>Adicionar Veículo</strong>
        </Typography>
        <VehicleForm register={register} errors={errors} owners={owners} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Adicionar
        </Button>
      </Box>
    </Modal>
  );
};

export default VehicleModalAdd;
