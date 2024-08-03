import { Button, Chip } from "@mui/material";
import DataTable from "../../components/dataTable/DataTable";
import { userRows } from "../../data";
import "./Users.scss";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          src={params.row.img || "/noavatar.png"}
          alt=""
          style={{ marginTop: "10px" }}
        />
      );
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
    renderCell: (params) => {
      return (
        <Chip
          label={params.row.verified ? "Yes" : "No"}
          sx={{
            backgroundColor: `${
              params.row.verified ? "success.light" : "error.light"
            }`,
            color: "white",
          }}
        />
      );
    },
  },
];

const Users = () => {
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <Button variant="contained">Add new User</Button>
      </div>
      <DataTable columns={columns} rows={userRows} slug="users" />
    </div>
  );
};

export default Users;
