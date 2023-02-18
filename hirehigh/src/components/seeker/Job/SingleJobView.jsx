/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BusinessIcon from '@mui/icons-material/Business';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TaskIcon from '@mui/icons-material/Task';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MessageIcon from '@mui/icons-material/Message';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WorkIcon from '@mui/icons-material/Work';
import Card from '@mui/material/Card';
import Moment from 'react-moment';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { getSingleJobData, jobApply } from '../../../apis/SeekerApi';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function SingleJobView(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState({});
  const [cat, setCat] = useState([]);
  const [refresh, setRefresh] = useState();
  useEffect(() => {
    async function invoke() {
      await getSingleJobData(state).then((response) => {
        console.log(response);
        setData(response.data);
        setCat(response.category);
      });
    }
    invoke();
  }, [refresh]);
  console.log(props, '11111111111111111');
  const apply = async (id) => {
    const userData = props?.user;
    await jobApply(id, userData).then((response) => {
      console.log(response);
      if (response.data.status === 'success') {
        swal('success');
        setRefresh(!refresh);
      }
    });
  };
  return (

    <Grid container spacing={3}>
      {/* Chart */}

      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <img src={data?.image} alt="" style={{ width: '25vh' }} />
            <Box sx={{ marginLeft: '5vh' }}>
              <Typography component="h1" variant="h5">{data?.jobTitle}</Typography>
              <Typography color="text.secondary" mt={1}>
                Location :
                {data?.location}
              </Typography>
            </Box>
          </Box>

        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Typography component="h1" variant="h5">Job summary</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '20px' }}>
          <Typography mb={1}>
            Published on :
            <Moment format="DD/MM/YYYY" date={data?.createdAt} />
          </Typography>
          <Typography mb={1}>
            Vaccancy  :
            {data?.vaccancy}
          </Typography>
          <Typography mb={1}>
            Salary  :
            {data?.salaryRange}
          </Typography>
          <Typography mb={1}>
            Location  :
            {data?.location}
          </Typography>
          <Typography mb={1}>
            work Type  :
            {data?.workPlace}
          </Typography>
        </Box>

      </Grid>
      {/* Recent Deposits */}
      {/* Recent Orders */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ marginBottom: '5vh' }}>
              <Typography sx={{ marginBottom: '5vh' }} component="h1" variant="h5">Job description</Typography>
              <Typography>{data?.jobDiscription}</Typography>
              <Typography>Calicut</Typography>
            </Box>
            <Box sx={{ marginBottom: '5vh' }}>
              <Typography sx={{ marginBottom: '5vh' }} component="h1" variant="h5">Responsibility</Typography>
              <Typography>{data?.responsibilities}</Typography>
              <Typography>Calicut</Typography>
            </Box>
            <Box sx={{ marginBottom: '5vh' }}>
              <Typography sx={{ marginBottom: '5vh' }} component="h1" variant="h5">Qualifications</Typography>
              <Typography>{data?.jobQualification}</Typography>
              <Typography>Calicut</Typography>
            </Box>
          </Box>
          {data?.applied
            ? (
              <Button
                        // eslint-disable-next-line no-underscore-dangle
                variant="contained"
                sx={{
                  backgroundColor: 'green', color: '#fff', fontWeight: '800', pointerEvents: 'none',
                }}
              >
                Applied
              </Button>
            )
            : (
              <Button
                        // eslint-disable-next-line no-underscore-dangle
                onClick={() => apply(data?._id)}
                sx={{
                  ml: 1, backgroundColor: 'blue', color: '#fff', fontWeight: '800', ':hover': { backgroundColor: 'green' },
                }}
              >
                Apply
              </Button>
            )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>

        <Box>
          {cat.map((el) => (
            <Card sx={{ minWidth: 275 }} key={el?.id}>
              <CardContent sx={{ display: 'flex', flexDirection: 'row' }} key={el?.id}>
                <img src={el?.image} alt="" style={{ width: '20vh' }} />
                <Box sx={{ marginLeft: '8vh', alignSelf: 'center' }}>
                  <Box sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div">
                      {el?.jobTitle}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {el?.companyName}
                    </Typography>
                    <Typography variant="body2">
                      {el?.jobType}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ alignSelf: 'center', ml: 'auto' }}>
                  {el?.applied
                    ? (
                      <Button
                        // eslint-disable-next-line no-underscore-dangle
                        variant="contained"
                        sx={{
                          backgroundColor: 'green', color: '#fff', fontWeight: '800', pointerEvents: 'none',
                        }}
                      >
                        Applied
                      </Button>
                    )
                    : (
                      <Button
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={() => apply(el?._id)}
                        sx={{
                          ml: 1, backgroundColor: 'blue', color: '#fff', fontWeight: '800', ':hover': { backgroundColor: 'green' },
                        }}
                      >
                        Apply
                      </Button>
                    )}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate('/job_view', { state: el?._id })}>full details</Button>
              </CardActions>
            </Card>
          ))}
        </Box>

      </Grid>

    </Grid>
  );
}
