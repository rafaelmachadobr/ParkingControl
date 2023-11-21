import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Car } from "../types/Car";
import { ParkingSpot } from "../types/ParkingSpot";
import ParkingForm from "./ParkingForm";

interface ParkingModalProps {
  open: boolean;
  handleClose: () => void;
}

const ParkingModal: React.FC<ParkingModalProps> = ({ open, handleClose }) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ParkingSpot>();

  const [cars, setCars] = useState<Car[]>([]);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);

  useEffect(() => {
    api
      .get("/api/v1/cars", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
        },
      })
      .then((response) => setCars(response.data));

    api
      .get("/api/v1/parking-spots", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
        },
      })
      .then((response) => setParkingSpots(response.data));
  }, []);

  const handleAddParkingSpot: SubmitHandler<ParkingSpot> = async (data) => {
    try {
      const carId = data.car;
      const parkingSpotId = data.number;

      const formattedData = {
        car: {
          id: carId,
        },
        parkingSpot: {
          id: parkingSpotId,
        },
      };

      await fetch("http://localhost:8080/api/v1/permanences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
        },
        body: JSON.stringify(formattedData),
      });

      toast.success("Vaga adicionada com sucesso!");
      toast.info("Atualize a página para ver as alterações");

      reset();
      handleClose();
    } catch (error) {
      toast.error("Erro ao adicionar vaga!");
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
        onSubmit={handleSubmit(handleAddParkingSpot)}
      >
        <Typography variant="h6" component="h2">
          Adicionar vaga
        </Typography>
        <ParkingForm
          register={register}
          errors={errors}
          cars={cars}
          parkingSpots={parkingSpots}
        />
        <Button
          sx={{ marginTop: "20px" }}
          variant="contained"
          type="submit"
          color="primary"
        >
          Adicionar
        </Button>
      </Box>
    </Modal>
  );
};

export default ParkingModal;
