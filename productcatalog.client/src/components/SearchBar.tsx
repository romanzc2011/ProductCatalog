import SearchIcon from "@mui/icons-material/Search";
import Input from '@mui/material/Input';
import { useCallback, useEffect, useState } from "react";
import { useDebounce, useGetSearchData } from '../hooks/ProductDataManager';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Box, IconButton } from "@mui/material";

// PROPS
interface SearchBarProps {
    setSearchQuery: (query: string) => void;
}

function SearchBar({setSearchQuery}: SearchBarProps) {
    const [tanQuery, setTanQuery] = useState('');
    const [debouncedQuery] = useDebounce(tanQuery, 100);

    useEffect(() => {
        // Not fetching yet, just allow update
        setSearchQuery(debouncedQuery);
    }, [debouncedQuery, setSearchQuery]);

    // Fetch data from backend and put into useQuery data
    useQuery({
        queryKey: ['searchStr', debouncedQuery],
        queryFn: async () => {
            if (!debouncedQuery) return [];
            setSearchQuery(debouncedQuery);
            return useGetSearchData(debouncedQuery);
        },
        staleTime: 100,
        placeholderData: keepPreviousData,
    });
    
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

