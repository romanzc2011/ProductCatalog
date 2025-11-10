import { useQuery } from '@tanstack/react-query';
import type { Products } from '../types/ProductTypes';
import { useEffect, useState } from "react";

/**
 * Fetch all products from the API.
 * @returns A promise that resolves to an array of products.
 */
export function useGetAllProducts() {
    const getAllProducts = async (): Promise<Products[]> => {
        const res = await fetch("/api/GetAllProducts");
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error fetching all products: ${errorText}`);
        }
        return res.json();
    };

    return useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
    });
}

//******************************************************************/
// * SEARCH DATA HOOK
//******************************************************************/
export async function useGetSearchData(query: string) {
    const API_URL = "/api/getSearchData";
    const url = `${API_URL}/search?query=${encodeURIComponent(query)}` // makes url safe string
    const response = await fetch(url);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching searched data: ${errorText}`);
    }
    return response.json();
}

/************************************************************************/
// USE DEBOUNCE
/************************************************************************/
/* Simple debounce to allow changes to take effect */
export function useDebounce<T>(value: T, delay: number = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}