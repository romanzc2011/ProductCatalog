import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { SxProps, Theme } from "@mui/material/styles";
import { useGetAllProducts } from "../hooks/ProductDataManager";
import type { Products } from "../types/ProductTypes";
import SearchBar from "./SearchBar";
import { cellRowStyles, headerStyles, footerStyles, paginationStyles } from "../css_styles/DataGridStyles";

/************************************************************* */
// DATA COLUMNS
/************************************************************* */
const dataColumns: GridColDef[] = [
    { field: 'sku', headerName: 'SKU', sortable: true, minWidth: 140, headerAlign: 'left', align: 'left' },
    { field: 'category', headerName: 'CATEGORY', sortable: true, width: 160, headerAlign: 'left', align: 'left' },
    { field: 'price', headerName: 'PRICE', sortable: true, width: 120, headerAlign: 'left', align: 'left' },
    { field: 'length', headerName: 'LENGTH', sortable: true, width: 120, headerAlign: 'left', align: 'left' },
    // Make DESCRIPTION consume remaining horizontal space
    { field: 'description', headerName: 'DESCRIPTION', sortable: true, flex: 1, minWidth: 300, headerAlign: 'left', align: 'left' }
];

/************************************************************* */
// MAIN PRODUCT TABLE
// Fetches product data from database to render in datagrid table
/************************************************************* */
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
        <Box sx={{ height: '100%', width: '100%', backgroundColor: '#212528' }}>
            {/**********************************************/}
            {/* SEARCH BAR */}
            {/**********************************************/}
            <Box sx={{ mb: 2 }} >
                <SearchBar />
            </Box>

            {/**********************************************/}
            {/* DATA GRID TABLE */}
            {/**********************************************/}
            <Box sx={{ flex: 1 }}>
                <DataGrid
                sx={{
                    ...cellRowStyles,
                    ...headerStyles,
                    ...footerStyles,
                    ...paginationStyles
                } as SxProps<Theme>}
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
        </Box>
    );
}