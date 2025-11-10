import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useGetAllProducts } from "../api_functions/ProductDataManager";
import type { Products } from "../types/ProductTypes";


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
    const [paginationModel, setPaginationModel] = useState({ pageSize: 25, page: 0 });
    const { data, isLoading, isError, error } = useGetAllProducts();

    if (isLoading) {
        return <Box>Loading...</Box>;
    }

    if (isError) {
        return <Box color="error.main">Error: {(error as Error)?.message}</Box>
    }

    const rows: Products[] = Array.isArray(data) ? data : [];

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                getRowId={(row) => row.sku}
                rowHeight={38}
                checkboxSelection
                columns={dataColumns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[25, 50, 100]}
            />
        </Box>
    );
}