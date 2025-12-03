import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

// Nota: He cambiado el tipo de retorno a 'OpenMeteoResponse | undefined' 
// porque al inicio 'data' no tiene valor.
export default function useFetchData() : OpenMeteoResponse | undefined | null { 
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';

    const [data, setData] = useState<OpenMeteoResponse | null>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const result: OpenMeteoResponse = await response.json();

                setData(result);
            } catch (error) {
                console.error("Error al obtener los datos del clima:", error);
            }
        };

        
        fetchData();

    }, []); 

    return data;
}