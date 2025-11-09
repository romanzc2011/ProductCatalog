import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useGetAllProducts } from "../misc_functions/ProductDataManager";

/************************************************************* */
// DATA COLUMNS
/************************************************************* */
const dataColumns: GridColDef[] = [
    { field: 'sku', headerName: 'SKU', width: 150 },
    { field: 'category', headerName: 'CATEGORY', width: 150 },
    { field: 'price', headerName: 'PRICE', width: 150 },
    { field: 'length', headerName: 'LENGTH', width: 150 },
    { field: 'description', headerName: 'DESCRIPTION', width: 300 }
];

export default function ProductTable() {
    const { data, isLoading, isError, error } = useGetAllProducts();

    if (isLoading) {
        return <Box>Loading...</Box>;
    }
    if (isError) {
        return <Box>Error: {(error as Error)}</Box>
    }

    const rows = (data ?? []);
    return (
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={rows}
                getRowId={(row) => row.sku}
                rowHeight={38}
                checkboxSelection
                columns={dataColumns}
                initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
                pageSizeOptions={[25, 50, 100]}
            />
        </Box>
    );
}
