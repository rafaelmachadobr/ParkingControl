import { Button } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { api } from "../services/api";
import { Permanence } from "../types/Permanence";
import { toast } from "react-toastify";

interface ParkingTableProps {
  permanences: Permanence[];
  searchTerm: string;
}

const ParkingTable: React.FC<ParkingTableProps> = ({
  permanences,
  searchTerm,
}) => {
  const handleExitCard = async (id: string) => {
    try {
      await api.get(`/api/v1/permanences/${id}/exit`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@Auth:token")}`,
        },
      });

      toast.success("Saída registrada com sucesso!");
      toast.info("Atualize a página para ver as alterações!");
    } catch (error) {
      toast.error("Erro ao registrar saída!");
    }
  };

  const formatDateTime = (dataString: string): string => {
    const data = new Date(dataString);
    return format(data, "dd/MM/yyyy HH:mm:ss");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100, flex: 1 },
    {
      field: "car",
      headerName: "Placa do Carro",
      valueGetter: (params) => params.row.car.plate,
      flex: 1,
    },
    {
      field: "parkingSpot",
      headerName: "Vaga",
      valueGetter: (params) => params.row.parkingSpot.number,
      flex: 1,
    },
    {
      field: "entryTime",
      headerName: "Entrada",
      flex: 1,
      renderCell: (params: GridCellParams) => {
        const entryTime = params.row.entryTime as string;
        return formatDateTime(entryTime);
      },
    },
    {
      field: "exitTime",
      headerName: "Saída",
      flex: 1,
      renderCell: (params: GridCellParams) => {
        const permanenceId = params.row.id as string;

        return (
          <Button
            onClick={() => handleExitCard(permanenceId)}
            variant="contained"
            color="error"
            sx={{ width: "100%" }}
          >
            Saída
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <DataGrid
        rows={permanences
          .filter(
            (permanence) =>
              permanence.id.toString().includes(searchTerm) ||
              permanence.car.plate
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              permanence.parkingSpot.number
                .toString()
                .includes(searchTerm.toLowerCase()) ||
              permanence.entryTime.toString().includes(searchTerm.toLowerCase())
          )}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default ParkingTable;
