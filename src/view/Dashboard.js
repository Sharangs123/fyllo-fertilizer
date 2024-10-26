import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Overview from './Overview';
import StateWiseAnalysis from './StateWiseAnalysis';
import { fertilizerData } from '../data/fertilizersData';
import backgroundImage from '../assets/agriculture.jpg';

function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  // Toggle Drawer
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  // Render the selected component based on `activeComponent` state
  const renderContent = () => {
    switch (activeComponent) {
      case 'Overview':
        return <Overview data={fertilizerData} />;
      case 'StateWiseAnalysis':
        return <StateWiseAnalysis data={fertilizerData} />;
      default:
        return (
            <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mt: 4 , color:'black'}}>
        About Us
      </Typography>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'start', justifyContent: 'center', maxWidth: '80%' }}>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', color:'black' }}>
          Agriculture is evolving rapidly with advancements in technology. Modern tools enable precise management, optimize crop yield, and minimize environmental impact. From drone monitoring to AI-driven insights, farming now integrates data to improve decision-making. Automated systems manage irrigation, while sensors track soil health in real-time. This fusion of agriculture and technology is creating sustainable and efficient farming practices, paving the way for a brighter future in food production.
        </Typography>
      </Box>
    </Box>
        );
    }
  };

  console.log("FD",fertilizerData)

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ mr: 'auto', fontWeight: 'bold' }}>
            Fyllo
          </Typography>

          <Box>
            <IconButton color="inherit" aria-label="notifications">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="profile">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem button onClick={() => setActiveComponent('Overview')}>
              <ListItemText primary="Overview" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => setActiveComponent('StateWiseAnalysis')}>
              <ListItemText primary="State-wise Analysis" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Content Section */}
      {renderContent()}
    </div>
  );
}

export default Dashboard;
