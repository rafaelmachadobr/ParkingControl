import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Owner } from "../types/Owner";

interface OwnerTableProps {
  owners: Owner[];
  searchTerm: string;
}

const OwnerTable: React.FC<OwnerTableProps> = ({ owners, searchTerm }) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "firstName", headerName: "Nome", flex: 1 },
    { field: "lastName", headerName: "Sobrenome", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "phone", headerName: "Telefone", flex: 1 },
  ];

  return (
    <div style={{ maxHeight: 400, width: "100%" }}>
      <DataGrid
        rows={owners.filter(
          (owner) =>
            owner.id.toString().includes(searchTerm) ||
            owner.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            owner.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            owner.phone.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default OwnerTable;
