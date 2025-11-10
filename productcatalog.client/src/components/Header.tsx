import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
} from "@mui/material";

const Header: React.FC = () => {
	return (
		<AppBar
			position="fixed"
			sx={{
				background: "linear-gradient(to top, #2c2c2c, #800000)",
				transition: "margin 0.3s ease",
				boxShadow: "none",
				width: "100%",
				zIndex: 1300
			}}
		>
			<Toolbar sx={{ minHeight: { xs: 72, sm: 96 }, px: 2 }}>
				<Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
					
					PRODUCT CATALOG
					
				</Typography>
			</Toolbar>
		</AppBar>
	)

};

export default Header;