import './css_styles/App.css';
import { Box } from "@mui/material";
import ProductTable from './components/ProductTable';
import Header from './components/Header';

function App() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100%',
            backgroundColor: '#818181ff'
        }}>
            <Header />
            <ProductTable />
        </Box>
    );
}

export default App;