import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { type dataFetch } from '../functions/useFetchData';


export default function ChartUI(datos: dataFetch) {
    return( 
      <>
            {datos.loading && <p>Cargando datos del gráfico...</p>}
            {datos.error && <p>Error al cargar los datos del gráfico: {datos.error}</p>}
            {datos.data && (
                <>
                    <Typography variant="h5" component="div">
                        Temperatura y Velocidad del Viento por hora
                    </Typography>
                    <LineChart
                        height={300}
                        series={[
                            { data: datos.data?.hourly.temperature_2m.slice(0, 24), label: 'Temperatura' },
                            { data: datos.data?.hourly.wind_speed_10m.slice(0, 24), label: 'Velocidad del Viento' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: datos.data?.hourly.time.slice(0, 24) }]}
                        
                    />
                </>
         )}
        </>   
)}