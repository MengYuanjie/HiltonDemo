import * as api from '../api/index'

import { ADD_NEW, UPDATE, DELETE, GET_RESERVATION, FETCH_RESERVATION_BY_USER, START_LOADING, END_LOADING } from './constants'

// export const getReservations = () => async (dispatch)=> {
//     try {
//         const { data } = await api.fetchReservations()
//         dispatch({ type: FETCH_ALL, payload: data })
//     } catch (error) {
//         console.log(error)
//     }
// }

export const getReservationsByUser =(searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
      const  { data: { data } } = await api.fetchReservationsByUser(searchQuery)
   
      dispatch({ type: FETCH_RESERVATION_BY_USER, payload: data });
      dispatch({ type: END_LOADING })
    } catch (error) {
      console.log(error.response)
      
    }
  }


export const getReservation = (id) => async (dispatch)=> {

    const user = JSON.parse(localStorage.getItem('profile'))

    try {
        if(id) {
            const { data } = await api.fetchReservation(id)
            const businessDetails = await api.fetchProfilesByUser({search: user?.result?._id})
            const reservationData = {...data, businessDetails}
            // console.log(reservationData)
            dispatch({ type: GET_RESERVATION, payload: reservationData  })
        }
    } catch (error) {
        console.log(error.response)
    }
}

export const createReservation =(reservation, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.addReservation(reservation)
        console.log(data);
        dispatch({ type: ADD_NEW, payload: data })
        history.push(`/reservation/${data._id}`)
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const updateReservation =(id, reservation) => async (dispatch) => {

    try {
        const { data } = await api.updateReservation(id, reservation)
        dispatch({ type: UPDATE, payload: data })
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteReservation =(id, openSnackbar) => async (dispatch) => {
    try {
        await api.deleteReservation(id)

        dispatch({type: DELETE, payload: id})
        openSnackbar("Reservation deleted successfully")
    } catch (error) {
        console.log(error.response)
    }
}