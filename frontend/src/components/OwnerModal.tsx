import { Box, Button, Modal, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Owner } from "../types/Owner";
import OwnerForm from "./OwnerForm";

interface OwnerModalProps {
  open: boolean;
  handleClose: () => void;
}

const OwnerModal: React.FC<OwnerModalProps> = ({ open, handleClose }) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<Owner>();

  const handleAddOwner: SubmitHandler<Owner> = async (data) => {
    try {
      await api.post("/api/v1/owners", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
        },
      });

      window.location.reload();

      toast.success("Cliente adicionado com sucesso!");

      reset();
      handleClose();
    } catch (error) {
      toast.error("Erro ao adicionar cliente!");
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
        onSubmit={handleSubmit(handleAddOwner)}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Adicionar Cliente
        </Typography>
        <OwnerForm register={register} errors={errors} />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
          type="submit"
        >
          Adicionar
        </Button>
      </Box>
    </Modal>
  );
};

export default OwnerModal;
