import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fertilizerData } from '../data/fertilizersData';
import { Typography, Box } from '@mui/material';

const StateWiseAnalysis = () => {
  const [rowData] = useState(fertilizerData);

  // Column definitions
  const columnDefs = useMemo(() => [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: 'agNumberColumnFilter',
      flex: 1,
    },
    {
      headerName: 'Year',
      field: '_year',
      sortable: true,
      filter: 'agNumberColumnFilter',
      flex: 1,
    },
    {
      headerName: 'Month',
      field: 'month',
      sortable: true,
      filter: 'agTextColumnFilter',
      flex: 1,
    },
    {
      headerName: 'Fertilizer',
      field: 'product',
      sortable: true,
      filter: 'agTextColumnFilter',
      flex: 1,
    },
    {
      headerName: 'State',
      field: 'state',
      sortable: true,
      filter: 'agTextColumnFilter',
      flex: 1,
    },
    {
      headerName: 'Requirement (MT)',
      field: 'requirement_in_mt_',
      sortable: true,
      filter: 'agNumberColumnFilter',
      flex: 1,
    },
    {
      headerName: 'Availability (MT)',
      field: 'availability_in_mt_',
      sortable: true,
      filter: 'agNumberColumnFilter',
      flex: 1,
    },
  ], []);

  return (
    <Box sx={{ width: '100%'}}>
      <Typography variant="h5" sx={{ mb: 2 , mt: 2}}>
        Fertilizers List
      </Typography>
    <div className="ag-theme-alpine" style={{ width: '100%', height: '80vh' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
          floatingFilter: true, // Adds search functionality to each column
          resizable: true,
        }}
        pagination={true}
        paginationPageSize={15}
      />
    </div>
    </Box>
  );
};

export default StateWiseAnalysis;
