import './css_styles/App.css';
import { Box } from "@mui/material";
import ProductTable from './components/ProductTable';

function App() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100%',
            backgroundColor: '#f5f5f5'
        }}>
            <header className="App-header">
                <h1>Product Catalog</h1>
            </header>
            <ProductTable />
        </Box>
    );
}

export default App;