import { useQuery } from '@tanstack/react-query';
import type { Products } from '../types/ProductTypes';

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
