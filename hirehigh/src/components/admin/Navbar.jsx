import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../axios/axios';
import { adminDetails } from '../../redux/admin';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch(adminDetails);
  useEffect(() => {
    axios.get('/admin/isAdminAuth', {
      headers: { 'a-access-token': localStorage.getItem('admintoken') },
    }).then((response) => {
      console.log(response.data);
      if (!response.data.auth) {
        navigate('/admin/login');
      } else {
        dispatch(adminDetails(response.data));
      }
    });
  }, []);
  const { admin } = useSelector((state) => state.adminInfo);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#6096B4' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HIREHIGH
          </Typography>
          <Button color="inherit">{admin?.username}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
