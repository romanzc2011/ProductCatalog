import './App.css';
import { Box } from "@mui/material";
import ProductTable from './components/ProductTable';

function App() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0',
        }}>
            <header className="App-header">
                <h1>Product Catalog</h1>
            </header>
            <ProductTable />
        </Box>
    );
}

export default App;