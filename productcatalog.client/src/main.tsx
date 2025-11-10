import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
    typography: {
        fontFamily: 'Play, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: 'Play, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                columnHeader: { fontWeight: 'bold' },
                columnHeaderTitle: { fontWeight: 'bold' }
            }
        }
    }
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
)
