import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { ParkingSpot } from "../types/ParkingSpot";
import ParkingSpotsForm from "./ParkingSpotsForm";

interface ParkingSpotModalProps {
  open: boolean;
  handleClose: () => void;
}

const ParkingSpotsModal: React.FC<ParkingSpotModalProps> = ({
  open,
  handleClose,
}) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ParkingSpot>();

  const handleAddParkingSpot: SubmitHandler<ParkingSpot> = async (data) => {
    try {
      await api.post("/api/v1/parking-spots", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
        },
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Adicionar Vaga
        </Typography>
        <ParkingSpotsForm register={register} errors={errors} />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: "10px" }}
        >
          Adicionar
        </Button>
      </Box>
    </Modal>
  );
};

export default ParkingSpotsModal;
