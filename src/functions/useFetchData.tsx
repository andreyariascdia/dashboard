import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export interface dataFetch {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
    'guayaquil': { latitude: -2.1962, longitude: -79.8862 },
    'quito': { latitude: -0.1807, longitude: -78.4678 },
    'cuenca': { latitude: -2.9001, longitude: -79.0059 },
    'manta': { latitude: -0.95, longitude: -80.7333 },
};

export default function useFetchData(selectedOption: string | null): dataFetch {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            
       
            const cityConfig = selectedOption ? CITY_COORDS[selectedOption] : CITY_COORDS['guayaquil'];
            
            
            const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`;

            try {
                const response = await fetch(API_URL);

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

    }, [selectedOption]);

    return { data, loading, error };
}