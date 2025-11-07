import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Products }  from "../types/ProductTypes.ts";
import React from "react";

/************************************************************** */
// DATA COLUMNS
const dataColumns: GridColDef[] = [
    { field: 'sku', headerName: 'SKU', width: 150 },
    { field: 'category', headerName: 'CATEGORY', width: 150 },
    { field: 'price', headerName: 'PRICE', width: 150 },
    { field: 'length', headerName: 'LENGTH', width: 150 },
    { field: 'description', headerName: 'DESCRIPTION', width: 300 }
];

export default function ProdictTable() {
    return (
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={rows}
                rowHeight={38}
                checkboxSelection
                columns={dataColumns}
                initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
                pageSizeOptions={[25, 50, 100]}
                disableSelectionOnClick
            />
        </Box>
    )
}