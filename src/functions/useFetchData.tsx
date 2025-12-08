import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';
export interface dataFetch {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}
export default function useFetchData(url: string): dataFetch { 
    
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            
            setLoading(true);
            try {
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const result: OpenMeteoResponse = await response.json();

                setData(result);
                setError(null); 
            } catch (err) {
                console.error("Error al obtener los datos:", err);
                setError(err instanceof Error ? err.message : "Error desconocido");
                setData(null);
            } finally {
     
                setLoading(false);
            }
        };

        fetchData();

        

    }, [url]);

  
    return { data, loading, error };
}