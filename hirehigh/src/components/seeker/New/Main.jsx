/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import * as React from 'react';
// import { Inter } from '@next/font/google';
import Box from '@mui/material/Box';
import {
  Avatar, Button, Card, CardContent, CardHeader, Collapse, Grid, IconButton, Input,
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { BsFillTrashFill } from 'react-icons/bs';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SendIcon from '@mui/icons-material/Send';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Swal from 'sweetalert2';
import VendorNavbar from './Navbar';
import Messages from './Messags';
import Notifications from './Notification';
// import Posts from './Post';
import VendorBottomNavbar from './Footer';

// const inter = Inter({ subsets: ['latin'] });

export default function VendorHome() {
  const [posts, setPosts] = useState([]);
  const [refreshComment, setrefreshComment] = useState(false);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     async function invoke() {
  //       const token = localStorage.getItem('vendortoken');
  //       if (token) {
  //         const response = await VendorisAuthApi(token);
  //         if (response) {
  //           if (response.auth) {
  //             if (response.vendorObj.isBlock) {
  //               Swal.fire(
  //                 'Blocked!',
  //                 'Your account is blocked! Not allowed this application...',
  //                 'error',
  //               ).then(() => {
  //                 localStorage.removeItem('vendortoken');
  //                 router.push('/vendor/signin');
  //               });
  //             } else {
  //               dispatch(vendorDetails(response.vendorObj));
  //             }
  //           } else {
  //             router.push('/vendor/signin');
  //           }
  //         }
  //       } else {
  //         router.push('/vendor/signin');
  //       }
  //       const vendorToken = localStorage.getItem('vendortoken');
  //       const res = await GetAllPosts(vendorToken);
  //       if (res) {
  //         setPosts(res);
  //       }
  //     }
  //     invoke();
  //   }, []);

  //   useEffect(() => {
  //     async function invoke() {
  //       const vendorToken = localStorage.getItem('vendortoken');
  //       const res = await GetAllPosts(vendorToken);
  //       if (res) {
  //         res.map(async (doc) => {
  //           doc.Likes.map((obj) => {
  //             if (obj.likerId == vendor._id) {
  //               doc.like = true;
  //             }
  //           });
  //           doc.Comments = await doc.Comments.reverse();
  //         });
  //         setPosts(res);
  //       }
  //     }
  //     invoke();
  //   }, [refreshComment, vendor]);

  return (
    <div>

      <link href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css" />
      <VendorNavbar />
      <Box>
        <Grid
          container
          sx={{ justifyContent: 'center', mt: 10, display: 'flex' }}
        >
          <Grid md={3}>
            <Notifications />
          </Grid>
          <Grid sm={12} md={5}>
            <Grid sm={12} md={12}>
              <Grid
                md={4.74}
                sx={{
                  width: '-webkit-fill-available',
                  backgroundColor: '#e9e5df',
                  borderRadius: '15px',
                  m: 2,
                  mt: -4,
                  pt: 4,
                  display: 'flex',
                  position: 'fixed',
                  zIndex: 99,
                }}
              >
                <Grid
                  sx={{
                    p: 2,
                    width: '-webkit-fill-available',
                    justifyContent: 'center',
                    boxShadow: 3,
                    display: 'flex',
                    border: '1px solid lightgray',
                    borderRadius: '15px',
                    minHeight: '4.0vw',
                    backgroundColor: '#fff',
                  }}
                >
                  <HomeIcon />
                  <h3 style={{ marginLeft: '7px', fontSize: '22px' }}>
                    Home
                  </h3>
                </Grid>
              </Grid>

              <Grid sx={{ pt: 7 }}>
                <Box
                  sx={{
                    p: 2,
                    width: '-webkit-fill-available',
                    boxShadow: 3,
                    border: '1px solid lightgray',
                    borderRadius: '15px',
                    minHeight: '34.5vw',
                    backgroundColor: '#fff',
                    m: 2,
                  }}
                >
                  {/* {posts.map((post) => (
                    <Posts post={post} setrefreshComment={setrefreshComment} refreshComment={refreshComment} user={vendor} vendor />
                  ))} */}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid md={3}>
            <Messages />
          </Grid>
        </Grid>
      </Box>
      <VendorBottomNavbar />
      <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js" />

    </div>
  );
}
