import { Button, Chip } from "@mui/material";
import DataTable from "../../components/dataTable/DataTable";
import "./Products.scss";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import AddProduct from "../../components/add/AddProduct";
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
    field: "title",
    type: "string",
    headerName: "Title",
    width: 245,
  },
  {
    field: "color",
    type: "string",
    headerName: "Colour",
    width: 150,
  },
  {
    field: "producer",
    type: "string",
    headerName: "Producer",
    width: 200,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
    renderCell: (params) => {
      return (
        <Chip
          label={params.row.inStock ? "Yes" : "No"}
          sx={{
            backgroundColor: `${
              params.row.inStock ? "success.light" : "error.light"
            }`,
            color: "white",
          }}
        />
      );
    },
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isPending, error, data } = useQuery({
    queryKey: ['allproducts'],
    queryFn: () =>
      fetch('http://localhost:8800/api/products').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <Button onClick={handleOpen} variant="contained">
          Add new Product
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddProduct size={data.length} setOpen={setOpen}/>
        </Modal>
      </div>
      <DataTable columns={columns} rows={data} slug="products" />
    </div>
  );
};

export default Products;
