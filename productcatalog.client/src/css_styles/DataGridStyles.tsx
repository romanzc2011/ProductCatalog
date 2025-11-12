import { SxProps, Theme } from "@mui/material";

/* Various stlyes for the DataGrid */
// *******************************************************************************
// * CELL ROW STYLES
// *******************************************************************************
export const cellRowStyles: SxProps<Theme> = {
	"& .MuiDataGrid-cell": {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		textAlign: "left",
		color: "white !important",
		fontSize: "0.95rem !important"
	},
	'& .MuiDataGrid-cellCheckbox': {
		minWidth: 48,
		display: 'flex',
		alignItems: 'center',
	},
	"& .MuiDataGrid-row": {
		backgroundColor: "#2c2c2c"
	},
	"& .MuiDataGrid-row:hover": {
		backgroundColor: "#444 !important",
	},
	"& .MuiDataGrid-row.Mui-selected": {
		backgroundColor: "#014519 !important",
		color: "#fff",
	},
	"& .MuiDataGrid-row.Mui-selected:hover": {
		backgroundColor: "#014519 !important",
	},
	// Exclude Item Description column from font size increase
	"& .MuiDataGrid-cell[data-field='itemDescription']": {
		fontSize: "0.875rem !important" // Keep original font size for Item Description
	},
	// Shrink font size of requester column
	"& div[data-field='requester']": {
		fontSize: "0.85rem !important"
	}
};

// *******************************************************************************
// * HEADER STYLES
// *******************************************************************************
export const headerStyles: SxProps<Theme> = {
	"& .MuiDataGrid-columnHeaders, .MuiDataGrid-columnHeader": {
		background: "linear-gradient(to top, #600, #900) !important",
		color: "white",
	},
	// Ensure header title aligns left
	"& .MuiDataGrid-columnHeaderTitleContainer": {
		justifyContent: "flex-start",
		textAlign: "left",
	},
	"& .MuiDataGrid-columnHeaderTitle": {
		fontWeight: "bold",
		fontSize: "1.1rem" // Increased font size for column headers
	},
};

// *******************************************************************************
// * FOOTER STYLES
// *******************************************************************************
export const footerStyles: SxProps<Theme> = {
	"& .MuiDataGrid-footerContainer": {
		backgroundColor: "#2c2c2c",
		borderTop: "1px solid rgba(255,255,255,0.2)",
	},
};

// *******************************************************************************
// * PAGINATION STYLES
// *******************************************************************************
export const paginationStyles: SxProps<Theme> = {
	"& .MuiTablePagination-root": {
		color: "white",
		fontSize: "0.95rem" // Increased font size for pagination
	},
	"& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
		color: "white",
		fontSize: "0.95rem" // Increased font size for pagination labels
	},
};