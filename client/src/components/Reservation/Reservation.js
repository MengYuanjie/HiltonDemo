import React, { useState, useEffect } from 'react'
import styles from './Reservation.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { initialState } from '../../initialState'
import { createReservation, getReservation, updateReservation } from '../../actions/reservationActions';
import { getClientsByUser } from '../../actions/clientActions'
import ReservationType from './ReservationType';
import axios from 'axios'
import { useLocation } from 'react-router-dom'

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
    }
}));

const Reservation = () => {
    const location = useLocation()
    const [reservationData, setReservationData] = useState(initialState)
    const [participants, setParticipants] = useState(2)
    const today = new Date()
    const [arrivalTime, setArrivalTime] = useState(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    const [client, setClient] = useState(null)
    const [type, setType] = useState('Reserved')
    const [status, setStatus] = useState('')
    const { id } = useParams()
    const clients = useSelector((state) => state.clients.clients)
    const { reservation } = useSelector((state) => state.reservations)
    const dispatch = useDispatch()
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'))

    const isAdmin = useState(user?.result?.role === 'admin' ? true : false)

    useEffect(() => {
        getTotalCount()
        // eslint-disable-next-line
    }, [location])


    const getTotalCount = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/reservations/count`);
            //Get total count of reservation from the server and increment by one to serialized numbering of reservation
            setReservationData({ ...reservationData, reservationNumber: (Number(response.data) + 1).toString().padStart(3, '0') })
        } catch (error) {
            console.error(error);
        }
    }




    useEffect(() => {
        dispatch(getReservation(id));
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {

        if (isAdmin[0]) {
            dispatch(getClientsByUser({ search: 'admin' }));
        } else {
            dispatch(getClientsByUser({ search: user?.result._id }));
        }

        // eslint-disable-next-line
    }, [dispatch]);


    useEffect(() => {
        if (reservation && location.pathname !== '/reservation') {
            //Automatically set the default reservation values as the ones in the reservation to be updated
            setReservationData(reservation)
            setParticipants(reservation.participants)
            setClient(reservation.client)
            setStatus(reservation.status)
            setType(reservation.status)
            setArrivalTime(reservation.arrivalTime)
        }
    }, [reservation, location])


    useEffect(() => {
        setStatus(type)
    }, [type])

    const clientsProps = {
        options: clients,
        getOptionLabel: (option) => option.name
    };


    const handleDateChange = (date) => {
        setArrivalTime(date);
    };

    const handleParticipants = (e) => {
        setParticipants(e.target.value)
        setReservationData((prevState) => ({ ...prevState, participants: e.target.value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (reservation && location.pathname !== '/reservation') {
            dispatch(updateReservation(reservation._id, {
                ...reservationData,
                arrivalTime: arrivalTime,
                participants: participants,
                client,
                notes: reservationData.notes,
                status: status
            }))
            history.push(`/reservation/${reservation._id}`)
        } else {
            delete reservationData._id

            dispatch(createReservation({
                ...reservationData,
                arrivalTime: arrivalTime,
                participants: participants,
                reservationNumber: `${reservationData.reservationNumber < 100 ?
                        (Number(reservationData.reservationNumber)).toString().padStart(3, '0')
                        : Number(reservationData.reservationNumber)
                    }`,
                client,
                notes: reservationData.notes,
                status: status,
                creator: [user?.result?._id || 1]
            },
                history
            ))
        }

        setReservationData(initialState)
    }

    const classes = useStyles()
    const CustomPaper = (props) => {
        return <Paper elevation={3} {...props} />;
    };


    if (!user) {
        history.push('/login')
    }


    return (
        <div className={styles.reservationLayout}>
            <form onSubmit={handleSubmit} className="mu-form">
                <Container className={classes.headerContainer}>
                    <Grid container justifyContent="space-between" >
                        <Grid item>
                            <ReservationType type={type} setType={setType} />
                            Reservation #:
                            <div style={{
                                marginTop: '15px',
                                width: '100px',
                                padding: '8px',
                                display: 'inline-block',
                                backgroundColor: '#f4f4f4',
                                outline: '0px solid transparent'
                            }}
                                onInput={e => setReservationData({
                                    ...reservationData, reservationNumber: e.currentTarget.textContent
                                })
                                }
                            >
                                <span style={{
                                    width: '40px',
                                    color: 'black',
                                    padding: '15px',
                                }}
                                > {reservationData.reservationNumber}</span>
                                <br />
                            </div>
                        </Grid>
                    </Grid >
                </Container>
                <Divider />
                <Container>
                    <Grid container justifyContent="space-between" style={{ marginTop: '40px' }} >
                        <Grid item style={{ width: '50%' }}>
                            <Container>
                                <Typography variant="overline" style={{ color: 'gray', paddingRight: '3px' }} gutterBottom>Customer:</Typography>
                                {client && (
                                    <>
                                        <Typography variant="subtitle2" gutterBottom>{client.name}</Typography>
                                        <Typography variant="body2" >{client.email}</Typography>
                                        <Typography variant="body2" >{client.phone}</Typography>
                                        <Typography variant="body2">{client.address}</Typography>
                                        <Button color="primary" size="small" style={{ textTransform: 'none' }} onClick={() => setClient(null)}>Change</Button>
                                    </>
                                )}

                                <div style={client ? { display: 'none' } : { display: 'block' }}>
                                    <Autocomplete
                                        {...clientsProps}
                                        PaperComponent={CustomPaper}
                                        renderInput={(params) => <TextField {...params}
                                            required={!reservation && true}
                                            label="Select Customer"
                                            margin="normal"
                                            variant="outlined"
                                        />}
                                        value={clients?.name}
                                        onChange={(event, value) => setClient(value)}

                                    />
                                </div>
                            </Container>
                        </Grid>

                        <Grid item style={{ marginRight: 20, textAlign: 'right' }}>
                            <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>Status</Typography>
                            <Typography variant="body2" className={type}>{type}</Typography>
                            <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>Ordering Time</Typography>
                            <Typography variant="body2" gutterBottom>{reservationData.createdAt ? moment(reservationData.createdAt).format("MMM Do YYYY HH:mm") : moment().format("MMM Do YYYY HH:mm")}</Typography>
                            <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>Expected Arrival Time</Typography>
                            <Typography variant="body2" gutterBottom>{arrivalTime ? moment(arrivalTime).format("MMM Do YYYY HH:mm") : moment().format("MMM Do YYYY YYYY HH:mm")}</Typography>
                            <Typography variant="overline" style={{ color: 'gray' }} gutterBottom>Participants</Typography>
                            <Typography variant="body2" gutterBottom>{participants ? participants : 2}</Typography>
                        </Grid>
                    </Grid>
                </Container>

                <div className={styles.toolBar}>
                    <Container >
                        <Grid container >
                            <Grid item style={{ marginRight: 10 }} >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDateTimePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Expected Arrival Time"
                                        format="MM/dd/yyyy/ HH:mm"
                                        value={arrivalTime}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </ MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item style={{ marginTop: '16px', marginRight: 10 }}>
                                <TextField
                                    type="text"
                                    step="any"
                                    name="Participants"
                                    id="Participants"
                                    value={participants ? participants : 2}
                                    onChange={handleParticipants}
                                    placeholder="e.g 4"
                                    label="Participants"

                                />
                            </Grid>
                        </Grid>
                    </Container>
                </div>

                <div className={styles.note}>
                    <h4>Note</h4>
                    <textarea
                        style={{ border: 'solid 1px #d6d6d6', padding: '10px' }}
                        placeholder="Provide additional details of reservation."
                        onChange={(e) => setReservationData({ ...reservationData, notes: e.target.value })}
                        value={reservationData.notes}
                    />
                </div>

                <Grid container justifyContent="center" style={{ paddingTop: '20px' }}>
                    <Button
                        variant="contained"
                        style={{ justifyContentContent: 'center' }}
                        type="submit"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save and Continue
                    </Button>
                </Grid>
            </form>
        </div>
    )
}

export default Reservation
