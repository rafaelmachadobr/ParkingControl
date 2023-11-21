import { CheckCircleOutline } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ParkingSpot } from "../types/ParkingSpot";

interface ParkingSpotsTableProps {
  parkingSpots: ParkingSpot[];
  searchTerm: string;
}

const convertBoolToString = (value: boolean): string => (value ? "Não" : "Sim");

const ParkingSpotsTable: React.FC<ParkingSpotsTableProps> = ({
  parkingSpots,
  searchTerm,
}) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "number", headerName: "Número da Vaga", flex: 1 },
    {
      field: "isOccupied",
      headerName: "Disponível",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {params.value ? (
            <CheckCircleOutline color="error" />
          ) : (
            <CheckCircleOutline color="success" />
          )}
          {convertBoolToString(params.value as boolean)}
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <DataGrid
        rows={parkingSpots.filter(
          (parkingSpot) =>
            parkingSpot.id.toString().includes(searchTerm) ||
            parkingSpot.number.toString().includes(searchTerm) ||
            parkingSpot.isOccupied.toString().includes(searchTerm) ||
            convertBoolToString(parkingSpot.isOccupied)
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        onRowSelectionModelChange={(selection) => console.log(selection)}
        checkboxSelection
      />
    </div>
  );
};

export default ParkingSpotsTable;
