import React, { useState, useEffect } from 'react'
// import "../../../node_modules/react-progress-button/react-progress-button.css"
import { useSnackbar } from 'react-simple-snackbar'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialState } from '../../initialState'
import { getReservation } from '../../actions/reservationActions'
import styles from './ReservationDetails.module.css'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Spinner from '../Spinner/Spinner'


const ReservationDetails = () => {

  const location = useLocation()
  const [reservationData, setReservationData] = useState(initialState)
  const [client, setClient] = useState([])
  // eslint-disable-next-line
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [company] = useState({})
  const { id } = useParams()
  const { reservation } = useSelector((state) => state.reservations)
  const dispatch = useDispatch()
  const history = useHistory()
  const [participants, setParticipants] = useState(2)
  const [arrivalTime, setArrivalTime] = useState('')






  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const user = JSON.parse(localStorage.getItem('profile'))

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    table: {
      minWidth: 650,
    },

    headerContainer: {
      // display: 'flex'
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(1),
      backgroundColor: '#f2f2f2',
      borderRadius: '10px 10px 0px 0px'
    }
  }));


  const classes = useStyles()

  useEffect(() => {
    dispatch(getReservation(id));
  }, [id, dispatch, location]);

  useEffect(() => {
    if (reservation) {
      //Automatically set the default reservation values as the ones in the reservation to be updated
      setReservationData(reservation)
      setParticipants(reservation.participants)
      setClient(reservation.client)
      setStatus(reservation.status)
      setType(reservation.status)
      setArrivalTime(reservation.arrivalTime)

    }
  }, [reservation])




  const editReservation = (id) => {
    history.push(`/edit/reservation/${id}`)
  }



  const iconSize = { height: '18px', width: '18px', marginRight: '10px', color: 'gray' }




  if (!reservation) {
    return (
      <Spinner />
    )
  }


  return (
    <div className={styles.PageLayout}>

      <div className={styles.buttons}>


        <button
          className={styles.btn}
          onClick={() => editReservation(reservationData._id)}
        >
          <BorderColorIcon style={iconSize}
          />
          Edit Reservation
        </button>


      </div>



      {/* <Modal open={open} setOpen={setOpen} reservation={reservation}/> */}
      <div className={styles.reservationLayout}>
        <Container className={classes.headerContainer}>

          <Grid container justifyContent="space-between" style={{ padding: '30px 0px' }}>
            {!reservation?.creator?.includes(user?.result._id) ?
              (
                <Grid item>
                </Grid>
              )
              : (
                <Grid item onClick={() => history.push('/settings')} style={{ cursor: 'pointer' }}>
                  {company?.logo ? <img src={company?.logo} alt="Logo" className={styles.logo} />
                    :
                    <h2>{company?.name}</h2>
                  }
                </Grid>
              )}
            <Grid item style={{ marginRight: 40, textAlign: 'right' }}>
              {/* <Typography style={{lineSpacing: 1, fontSize: 45, fontWeight: 700, color: 'gray'}} >{Number(total - totalAmountReceived) <= 0 ? 'Receipt' : type}</Typography> */}
              <Typography variant="overline" style={{ color: 'gray' }} >No: </Typography>
              <Typography variant="body2">{reservationData?.reservationNumber}</Typography>
            </Grid>
          </Grid >
        </Container>
        <Divider />
        <Container>
          <Grid container justifyContent="space-between" style={{ marginTop: '40px' }} >
            <Grid item>
              <Container>
                <Typography variant="overline" style={{ color: 'gray', paddingRight: '3px' }} gutterBottom>Customer</Typography>
                <Typography variant="subtitle2" gutterBottom>{client.name}</Typography>
                <Typography variant="body2" >{client?.email}</Typography>
                <Typography variant="body2" >{client?.phone}</Typography>
                <Typography variant="body2">{client?.address}</Typography>
              </Container>
            </Grid>

            <Grid item style={{ marginRight: 20, textAlign: 'right' }}>
              <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>Status</Typography>
              <Typography variant="h6" gutterBottom >{status}</Typography>
              <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>Ordering Time</Typography>
              <Typography variant="body2" gutterBottom>{moment(reservationData.createdAt).format("MMM Do YYYY HH:mm")}</Typography>
              <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>Expected Arrival Time</Typography>
              <Typography variant="body2" gutterBottom>{moment(arrivalTime).format("MMM Do YYYY HH:mm")}</Typography>
              <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>Participants</Typography>
              <Typography variant="body2" gutterBottom>{participants}</Typography>
            </Grid>
          </Grid>
        </Container>

        <form>
          <div className={styles.note}>
            <h4 style={{ marginLeft: '-10px' }}>Note</h4>
            <p style={{ fontSize: '14px' }}>{reservationData.notes}</p>
          </div>

          {/* <button className={styles.submitButton} type="submit">Save and continue</button> */}
        </form>
      </div>
    </div>

  )
}

export default ReservationDetails
