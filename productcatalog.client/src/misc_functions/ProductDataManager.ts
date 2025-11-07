import { useQuery } from '@tanstack/react-query';
import type { Products } from '../types/ProductTypes';

async function getProductsBySKU(sku: string): Promise<Products> {
    const res = await fetch(`/api/products/${sku}`);
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error fetching products: ${errorText}`);
    }
    return res.json();
}

export function useProducts(sku: string) {
    // Fetch products from react query
    return useQuery({
        queryKey: ['products', sku],
        queryFn: () => getProductsBySKU(sku),
        enabled: !!sku, // only run query if sku is provided
    });
}