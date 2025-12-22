// App.tsx
import { useState } from 'react';
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/selectorUI';
import IndicatorUI from './components/IndicatorUI';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import useFetchData from './functions/useFetchData';
import './App.css'

function App() {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // 2. Usamos el hook pasándole la opción seleccionada directamente.
  // El hook se encargará de traducir "quito" a coordenadas y buscar los datos.
  const { data, loading, error } = useFetchData(selectedOption);

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={12}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid size={12}>
        <AlertUI description={error ? `Error de conexión: ${error}` : "No se preveen lluvias"} />
      </Grid>

      {/* Indicadores */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI onOptionSelect={setSelectedOption} />
      </Grid>

      <Grid container size={{ xs: 12, md: 9 }}>
        {/* Indicador 1: Temperatura */}
        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title='Temperatura'
            description={
              loading ? 'Cargando...' :
                error ? 'Sin datos' :
                  `${data?.current.temperature_2m} ${data?.current_units.temperature_2m}`
            }
          />
        </Grid>

        {/* Indicador 2: Temperatura aparente */}
        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title='Temperatura aparente'
            description={
              loading ? 'Cargando...' :
                error ? 'Sin datos' :
                  `${data?.current.apparent_temperature} ${data?.current_units.apparent_temperature}`
            }
          />
        </Grid>

        {/* Indicador 3: Velocidad del viento */}
        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title='Velocidad del viento'
            description={
              loading ? 'Cargando...' :
                error ? 'Sin datos' :
                  `${data?.current.wind_speed_10m} ${data?.current_units.wind_speed_10m}`
            }
          />
        </Grid>

        {/* Indicador 4: Humedad relativa */}
        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title='Humedad relativa'
            description={
              loading ? 'Cargando...' :
                error ? 'Sin datos' :
                  `${data?.current.relative_humidity_2m} ${data?.current_units.relative_humidity_2m}`
            }
          />
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI data={data} loading={loading} error={error} />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI data={data} loading={loading} error={error} />      </Grid>

      
    </Grid>
  )
}

export default App