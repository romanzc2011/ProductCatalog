import React from "react";
import { Box } from "@mui/material";
import {
	AppBar,
	Toolbar,
	Typography,
} from "@mui/material";
import UTCLogo from "../assets/UTC-Logo.jpg";

const Header: React.FC = () => {
	return (
		<AppBar position="static" sx={{ background: "linear-gradient(to right, #600, #900)" }}>
			<Toolbar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<Box
				component="img"
				src={UTCLogo}
				alt="United Tile Companies"
				sx={{
					height: 48,
					width: "auto",
					backgroundColor: "white", // optional: makes the white logo area blend better
					borderRadius: 3,
					p: 0.5,
				}}
				/>
				<Typography
					variant="h5"
					sx={{ fontWeight: "bold", color: "white", letterSpacing: 1 }}
				>
				PRODUCT CATALOG
				</Typography>
			</Toolbar>
		</AppBar>
	)
};

export default Header;