/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Moment from 'react-moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RecruiterSideJobList, RecruiterJobDele } from '../../../apis/RecruiterApi';

export default function RecruiterJobList(props) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  const navigate = useNavigate();
  const [job, setJob] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function invoke() {
      const id = props.id._id;
      await RecruiterSideJobList(id).then((response) => {
        if (response.status === 'failed') {
          navigate('/recruiter/add_job');
        } else {
          setJob(response.data);
        }
      });
    }
    invoke();
  }, [refresh]);

  const deleteJob = async (id) => {
    await RecruiterJobDele(id).then((response) => {
      if (response.data.status === 'success') {
        toast.success('🦄 Wow so easy!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setRefresh(!refresh);
      } else {
        swal('OOPS', response.data.message, 'error');
      }
    });
  };

  return (
    <Box>
      <ToastContainer />
      <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">NO</StyledTableCell>
              <StyledTableCell align="center">Job Title</StyledTableCell>
              <StyledTableCell align="center">Posted On</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Salary</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
              {/* <StyledTableCell align="center">PHONE NO</StyledTableCell>
              <StyledTableCell align="center">Website</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {job.map((el, index) => (
              <StyledTableRow key={el?.id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {el?.jobTitle}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">

                  <Moment format="DD/MM/YYYY" date={el?.createdAt} />

                </StyledTableCell>
                <StyledTableCell align="center">{el?.jobCategory?.name}</StyledTableCell>
                <StyledTableCell align="center">{el?.salaryRange}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="contained" sx={{ bgcolor: 'red' }} onClick={() => deleteJob(el?._id)}>
                    Dele
                  </Button>

                </StyledTableCell>
                {/* <StyledTableCell align="center">
                  {el.isActive
                    ? (
                      <Button
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={() => blocked(el._id)}
                        sx={{
                          backgroundColor: '#03a903', color: '#fff', fontWeight: '800',
                           ':hover': { backgroundColor: 'blue' },
                        }}
                      >
                        Active
                      </Button>
                    )
                    : (
                      <Button
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={() => actived(el._id)}
                        sx={{
                          ml: 1, backgroundColor: 'red', color: '#fff', fontWeight: '800',
                           ':hover': { backgroundColor: 'blue' },
                        }}
                      >
                        Block
                      </Button>
                    )}
                </StyledTableCell> */}

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Box>
  );
}