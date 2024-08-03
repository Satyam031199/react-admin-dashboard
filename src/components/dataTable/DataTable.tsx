import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./DataTable.scss";
import { Link } from "react-router-dom";

type DataGridProps = {
  columns: GridColDef[],
  rows: Object[],
  slug: string
}

const DataTable = ({rows,columns,slug}: DataGridProps) => {
  const handleDelete = (id: number) => {
    console.log(id+" has been deleted");
  }
  const actionCoulmn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return(
        <div className="action">
          <Link to={`/${slug}/${params.row.id}`}><img src="/view.svg" alt="" style={{marginRight: '15px'}}/></Link>
          <img src="/delete.svg" alt="" onClick={() => handleDelete(params.row.id)}/>
        </div>
      )
    }
  }
  return (
    <div className="dataTable">
        <DataGrid
          className="dataGrid"
          rows={rows}
          columns={[...columns,actionCoulmn]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{
            toolbar: GridToolbar
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500
              }
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
    </div>
  );
};

export default DataTable;
