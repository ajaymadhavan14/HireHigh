
import * as React from 'react';
import { Box } from '@mui/system';
import { Grid} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import CategoryIcon from '@mui/icons-material/Category';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BusinessIcon from '@mui/icons-material/Business';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminSideBar = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#f04f4f',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('adminToken');
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
                navigate('/admin/login')

            }
          })
    }

    return ( 
        <>
           <Grid sx={{position:'fixed'}}>
              <Grid className='comp'  sx={{minWidth:'206px', minHeight: '40vw', overflowY:'scroll' , overflowX: 'hidden',}}>
                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <HomeIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Dashboard</h4>
                    </Box>  
                </Box>
                <Box mt={1} sx={{backgroundColor:'#fff', borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <PeopleAltTwoToneIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Seeker </h4>
                    </Box>
                </Box>
                <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <BusinessIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Recruiter</h4>
                    </Box>
                </Box>
                <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <CategoryIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Category</h4>
                    </Box>
                </Box>
                <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <NotificationsIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Notification</h4>
                    </Box>
                </Box>
                <a onClick={handleClick}>
                <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <LogoutIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Logout</h4>
                    </Box>
                </Box>
                </a>
              </Grid>
              
            </Grid>
        </>
    );
}
 
export default AdminSideBar;


  