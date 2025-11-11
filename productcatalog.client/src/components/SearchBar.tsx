import SearchIcon from "@mui/icons-material/Search";
import Input from '@mui/material/Input';
import { useEffect, useState } from "react";
import { useDebounce } from '../hooks/ProductDataManager';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Box, IconButton } from "@mui/material";

// PROPS
interface SearchBarProps {
    setSearchQuery: (query: string) => void;
}

function SearchBar({setSearchQuery}: SearchBarProps) {
    const [input, setInput] = useState('');
    const debouncedQuery = useDebounce(input, 200);

    useEffect(() => {
        // Not fetching yet, just allow update
        setSearchQuery(debouncedQuery);
    }, [debouncedQuery, setSearchQuery]);

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
                <Input 
                    sx={{ 
                        ml: 2, 
                        color: 'white', 
                        flex: 1
                    }} 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <IconButton type="button" sx={{ p: 1}}>
                    <SearchIcon sx={{ color: 'white'}} />
                </IconButton>
            </Box>
        </Box>
    )
}

export default SearchBar;

