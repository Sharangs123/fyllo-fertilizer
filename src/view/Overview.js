import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts';
import {
  FormControl, Select, MenuItem, InputLabel, Card, CardContent, Box, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';
import { fertilizerData } from '../data/fertilizersData';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Overview = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [chartHeight, setChartHeight] = useState(250);
  const [chartWidth, setChartWidth] = useState(0);
  const cardRef = useRef(null);

  const months = [...new Set(fertilizerData.map(item => item.month))];

  const getChartData = () => {
    const filteredData = fertilizerData.filter(item => item.month === selectedMonth);
    
    const chartData = {};
    filteredData.forEach(item => {
      if (!chartData[item.product]) {
        chartData[item.product] = { requirement: 0, availability: 0 };
      }
      chartData[item.product].requirement += Number(item.requirement_in_mt_);
      chartData[item.product].availability += Number(item.availability_in_mt_);
    });

    return Object.entries(chartData).map(([key, value]) => ({
      name: key,
      requirement: value.requirement,
      availability: value.availability,
    }));
  };

  const chartData = getChartData();

  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight * 0.3;
      setChartHeight(newHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      setChartWidth(cardRef.current.offsetWidth);
    }
  }, [chartHeight]);

  const getFertilizerData = () => {
    const filteredData = fertilizerData.filter(item => item.month === selectedMonth);
    
    const uniqueFertilizers = {};
    filteredData.forEach(item => {
      if (!uniqueFertilizers[item.product]) {
        uniqueFertilizers[item.product] = { requirement: 0, availability: 0 };
      }
      uniqueFertilizers[item.product].requirement += Number(item.requirement_in_mt_);
      uniqueFertilizers[item.product].availability += Number(item.availability_in_mt_);
    });

    return Object.entries(uniqueFertilizers).slice(0, 6).map(([product, values]) => {
      const { requirement, availability } = values;
      const percentageDiff = availability > 0 ? ((requirement - availability) / availability) * 100 : 0;
      return {
        product,
        requirement,
        availability,
        percentageDiff,
        isRequirementGreater: requirement > availability,
      };
    });
  };

  const fertilizerTableData = getFertilizerData();

  const getTopFertilizers = (data, key, isLeast = false) => {
    const sortedData = data.sort((a, b) => {
      return isLeast ? a[key] - b[key] : b[key] - a[key];
    });
    return sortedData.slice(0, 5);
  };

  // Get the top 5 required fertilizers
  const top5Required = getTopFertilizers(chartData, 'requirement');
  
  // Get the top 5 least available fertilizers (sorted in ascending order)
  const top5LeastAvailable = getTopFertilizers(chartData, 'availability', true);

  // Colors for pie chart segments
  const colors = top5Required.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
  const leastAvailableColors = top5LeastAvailable.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: 2, height: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', mb: 2 }}>
        <Card variant="elevation" elevation={4} sx={{ backgroundColor: 'white', mr: 2, minWidth: 200 }}>
          <CardContent>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Month</InputLabel>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                label="Month"
              >
                {months.map(month => (
                  <MenuItem key={month} value={month}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <Card variant="elevation" elevation={4} sx={{ width: '60%', borderRadius: 2, paddingRight: 5 }} ref={cardRef}>
            <CardContent sx={{ backgroundColor: 'white' }}>
              <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>{selectedMonth}</Typography>
              <BarChart width={chartWidth * 0.9} height={chartHeight * 1.4} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="requirement" fill="#8884d8" />
                <Bar dataKey="availability" fill="#82ca9d" />
              </BarChart>
            </CardContent>
          </Card>

          <Card variant="elevation" elevation={4} sx={{ width: '35%', marginLeft: 2, borderRadius: 2 }}>
            <CardContent sx={{ backgroundColor: 'white' }}>
              <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>Fertilizer Availability [ {selectedMonth} ]</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Requirement (mt)</TableCell>
                      <TableCell>Availability (mt)</TableCell>
                      <TableCell>Difference (%)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fertilizerTableData.map((row) => {
                      const rowStyle = row.percentageDiff < 0
                        ? { backgroundColor: '#ffcccc' }
                        : { backgroundColor: '#ccffcc' };

                      return (
                        <TableRow key={row.product} sx={rowStyle}>
                          <TableCell>{row.product}</TableCell>
                          <TableCell>{row.requirement}</TableCell>
                          <TableCell>{row.availability}</TableCell>
                          <TableCell>
                            {row.isRequirementGreater ? (
                              <span style={{ color: 'green' }}>
                                <ArrowUpwardIcon fontSize="small" /> {row.percentageDiff.toFixed(2)}%
                              </span>
                            ) : (
                              <span style={{ color: 'red' }}>
                                <ArrowDownwardIcon fontSize="small" /> {Math.abs(row.percentageDiff).toFixed(2)}%
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
        {/* Card for Top 5 Required Fertilizers Pie Chart */}
        <Card variant="elevation" elevation={4} sx={{ flex: 1, borderRadius: 2, margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CardContent sx={{ backgroundColor: 'white', width: '100%', textAlign: 'center' }}>
            <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>Top 5 Fertilizers Requirement in {selectedMonth}</Typography>
            <PieChart width={chartWidth} height={chartHeight}>
              <Pie
                data={top5Required}
                dataKey="requirement"
                nameKey="name"
                cx="45%"
                cy="45%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {top5Required.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            {/* Legend for required fertilizers */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {top5Required.map((entry, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mr: 3, mb: 1 }}>
                  <Box sx={{ width: 20, height: 20, backgroundColor: colors[index], borderRadius: '50%', mr: 1 }} />
                  <Typography variant="body2">{entry.name}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Card for Top 5 Available Fertilizers Pie Chart */}
        <Card variant="elevation" elevation={4} sx={{ flex: 1, borderRadius: 2, margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CardContent sx={{ backgroundColor: 'white', width: '100%', textAlign: 'center' }}>
            <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>Top 5 Least Available Fertilizers in {selectedMonth}</Typography>
            <PieChart width={chartWidth} height={chartHeight}>
              <Pie
                data={top5LeastAvailable}
                dataKey="availability"
                nameKey="name"
                cx="45%"
                cy="45%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {top5LeastAvailable.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={leastAvailableColors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            {/* Legend for available fertilizers */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {top5LeastAvailable.map((entry, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mr: 3, mb: 1 }}>
                  <Box sx={{ width: 20, height: 20, backgroundColor: leastAvailableColors[index], borderRadius: '50%', mr: 1 }} />
                  <Typography variant="body2">{entry.name}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Overview;
