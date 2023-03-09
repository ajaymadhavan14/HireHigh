/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  styled, createTheme, ThemeProvider, useTheme, alpha,
  experimentalStyled as styleds,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TaskIcon from '@mui/icons-material/Task';
import MessageIcon from '@mui/icons-material/Message';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WorkIcon from '@mui/icons-material/Work';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Swal2 from 'sweetalert2';
import { allData, createChat } from '../../../apis/SeekerApi';

const Item = styleds(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function SeekerHomeCard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function invoke() {
      await allData().then((res) => {
        setData(res);
      });
    }
    invoke();
  }, []);
  console.log(data);

  const { user } = useSelector((state) => state.userInfo);

  const sendMessage = async (id) => {
    const datas = { senderId: user.id, receiverId: id };
    await createChat(datas).then((res) => {
      if (res.status === 'success') {
        navigate('/messages');
      }
    });
  };
  return (
  // <Grid container spacing={3}>
  //   {/* Chart */}

  //   <Grid item xs={12} md={8} lg={9} minWidth={'100%'}>

  //     <Box sx={{ display:'flex' , width:'100%' }} columnGap={5}>
  //       {data.map((el) => (
  //         <Card sx={{ width: '30%', minHeight: 340 }}>
  //           <CardMedia
  //             sx={{ height: 170, width: 300 }}
  //             image={el?.image}
  //             title="green iguana"
  //           />
  //           <CardContent>
  //             <Typography gutterBottom variant="h5" component="div">
  //               {`${el.firstName} ${el.lastName}`}
  //             </Typography>
  //             <Typography variant="body2" color="text.secondary">
  //               {el.headline}
  //             </Typography>
  //           </CardContent>
  //           <CardActions>
  //             <Button size="small">view</Button>
  //             <Button variant="contained">Message</Button>
  //           </CardActions>
  //         </Card>

  //       ))}
  //     </Box>
  //   </Grid>
  //   {/* <Grid item xs={12} md={4} lg={3}>
  //     <Paper
  //       sx={{
  //         p: 2,
  //         display: 'flex',
  //         flexDirection: 'column',
  //         height: 240,
  //       }}
  //     />
  //   </Grid> */}
  //   {/* Recent Deposits */}
  //   {/* Recent Orders */}
  //   <Grid item xs={12}>
  //     <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} />
  //   </Grid>
  // </Grid>

    <Box sx={{ flexGrow: 1, marginLeft: '5rem' }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((el) => (
          <Card sx={{ m: 3, minWidth: 300, minHeight: 340 }}>
            <CardMedia
              sx={{ height: 170, width: 300 }}
              image={el?.image}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {`${el.firstName} ${el.lastName}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {el.headline}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">view</Button>
              <Button variant="contained" onClick={() => sendMessage(el._id)}>Message</Button>
            </CardActions>
          </Card>

        ))}
      </Grid>
    </Box>
  );
}
