
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import { Grid } from '@mui/material';
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import axios from '../../../axios/axios'
import { useDispatch } from 'react-redux';
import {userDetails} from '../../../redux/seeker'
import { useNavigate } from 'react-router-dom';
import Swal2 from 'sweetalert2'



 const drawerWidth = 260;

export default function PermanentDrawerLeft() {
    const navigate = useNavigate()
    const dispatch = useDispatch(userDetails)

    useEffect(()=>{
      axios.get('/isUserAuth',{
       headers:{"x-access-token":localStorage.getItem("token")}
      }).then((response)=>{
        console.log(response.data)
        if(!response.data.auth){
          
           navigate('/')
  
        } else{
           dispatch(userDetails(response.data))
        }
      })
    },[])
     
    const LogOut = () => {
        Swal2.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#f04f4f',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
                navigate('/login')

            }
          })
    }
    const { user } = useSelector((state)=>state.userInfo)

  return (
    <>
    <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar sx={{justifyContent:"space-between"}}>
                <Typography variant="h6" noWrap component="div">
                    HIREHIGH
                </Typography>
                <Typography variant="h6" noWrap component="div" sx={{}}>
                {user.username}
                </Typography>
                </Toolbar>
                

            </AppBar>
    <Grid sx={{ display:'flex' }}>
        <Grid xs={3}>
        <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                {['Jobs', 'Notification', 'Applied jobs','messaging'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        {index % 2 === 0 ? <WorkIcon/> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List>
               
                    <ListItem  disablePadding>
                    <ListItemButton  >
                        <ListItemIcon>
                       <AccountBoxIcon/> 
                        </ListItemIcon>
                        <ListItemText  >Profile</ListItemText>
                    </ListItemButton >
                    
                    </ListItem>
              
                    <ListItem  disablePadding>
                    <ListItemButton  onClick={LogOut}>
                        <ListItemIcon>
                       <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText  >Logout</ListItemText>
                    </ListItemButton >
                    
                    </ListItem>
                </List>
            </Drawer>
        </Grid>
        <Grid xs={6} sx={{ width:'75%' }}>
            <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Toolbar />
                <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Box>
            </Box>
        </Grid>
        <Grid xs={3} sx={{ mt: 6 }}>
            <h1 style={{ lineBreak:'anywhere' }}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
        </Grid>
    </Grid>
    
    </>
  );
}