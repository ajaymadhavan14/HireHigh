/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function JobCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
        <img src="/logo192.png" alt="" />
        <Box sx={{ width: '40vh', marginLeft: '5vh', alignSelf: 'center' }}>
          <Typography variant="h5" component="div">
            Word of the Day
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            be
            {bull}
            nev
            {bull}
            o
            {bull}
            lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            "a benevolent smile"
          </Typography>
        </Box>
        <Box sx={{ alignSelf: 'center', ml: 'auto' }}>
          <Button variant="contained">Apply</Button>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
