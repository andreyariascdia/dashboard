//import { useState } from 'react'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/selectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  const dataFetcherOutput = useFetchData();
  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
      {/* Encabezado */}
      <Grid size={12}>
        <HeaderUI />
      </Grid>
      {/* Alertas */}
      <Grid size={12} ><AlertUI description="No se preveen lluvias" /></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}><SelectorUI></SelectorUI></Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          {dataFetcherOutput &&
            (<IndicatorUI
              title='Temperatura'
              description={`${dataFetcherOutput.current.temperature_2m}${dataFetcherOutput.current_units.temperature_2m}`} />)
          }
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {/* IndicatorUI con la Temperatura aparente en °C' */}
           {dataFetcherOutput &&
        (<IndicatorUI
            title='Temperatura aparente'
            description={ `${dataFetcherOutput.current.apparent_temperature}${dataFetcherOutput.current_units.apparent_temperature}` } />)
    }
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
           {dataFetcherOutput &&
        (<IndicatorUI
            title='Velocidad del viento'
            description={ `${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}` } />)
    }
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
           {dataFetcherOutput &&
        (<IndicatorUI
            title='Humedad relativa'
            description={ `${dataFetcherOutput.current.relative_humidity_2m}${dataFetcherOutput.current_units.relative_humidity_2m}` } />)
    }
        </Grid>

      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Gráfico</Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  )
}

export default App
