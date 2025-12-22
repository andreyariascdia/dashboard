import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type dataFetch } from '../functions/useFetchData';
import { useEffect, useState } from 'react';


const columns: GridColDef[] = [
   {
      field: 'time',
      headerName: 'Hora',
      width: 200, 
   },
   {
      field: 'temperature',
      headerName: 'Temperatura (°C)',
      width: 150,
   },
   {
      field: 'speed',
      headerName: 'Velocidad (km/h)',
      width: 150,
   },
];

export default function TableUI(props: dataFetch) {
   const { data, loading } = props;
   
   const [rows, setRows] = useState<any[]>([]);

   useEffect(() => {
      if (data && data.hourly) {
         const newRows = data.hourly.time.map((time: string, index: number) => ({
            id: index, 
            time: time,
            temperature: data.hourly.temperature_2m[index],
            speed: data.hourly.wind_speed_10m[index],
         }));
         setRows(newRows);
      } else {
         setRows([]);
      }
   }, [data]);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}