import SearchIcon from "@mui/icons-material/Search";
import Input from '@mui/material/Input';
import { useState } from "react";
import { useDebounce } from '../hooks/ProductDataManager';
import { useQuery } from '@tanstack/react-query';
import { Box, IconButton } from "@mui/material";

const DEBOUNCE_MS = 100;
const API_URL = "/api/getSearchData";

function SearchBar() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 2 }}>
            <span>Product Search: </span>
            <Box sx={{
                display: 'inline-flex',
                alignItems: 'center',
                width: '25%',
                backgroundColor: '#363B3F',
                borderRadius: '3px'
            }}>
                <Input sx={{ ml: 2, color: 'white', flex: 1}} />
                <IconButton type="button" sx={{ p: 1}}>
                    <SearchIcon sx={{ color: 'white'}} />
                </IconButton>
            </Box>
        </Box>
    )
}

export default SearchBar;

