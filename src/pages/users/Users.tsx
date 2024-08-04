import { Button, Chip } from "@mui/material";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import AddUser from "../../components/add/AddUser";
import { useQuery } from "@tanstack/react-query";

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isPending, error, data } = useQuery({
    queryKey: ['allusers'],
    queryFn: () =>
      fetch('http://localhost:8800/api/users').then((res) =>
        res.json(),
      ),
  })
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <Button onClick={handleOpen} variant="contained">
          Add new User
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddUser size={data.length} setOpen={setOpen}/>
        </Modal>
      </div>
      <DataTable columns={columns} rows={data} slug="users" />
    </div>
  );
};

export default Users;
