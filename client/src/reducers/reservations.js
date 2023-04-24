
import { FETCH_ALL, ADD_NEW, UPDATE, DELETE, GET_RESERVATION, START_LOADING, END_LOADING, FETCH_RESERVATION_BY_USER } from '../actions/constants'

const reservations = (state = { isLoading: true, reservations: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        reservations: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_RESERVATION_BY_USER:
      return { ...state, reservations: action.payload };
    case GET_RESERVATION:
      return { ...state, reservation: action.payload };
    case ADD_NEW:
      return { ...state, reservations: [...state.reservations, action.payload] };
    case UPDATE:
      return { ...state, reservations: state.reservations.map((reservation) => (reservation._id === action.payload._id ? action.payload : reservation)) };
    case DELETE:
      return { ...state, reservations: state.reservations.filter((reservation) => reservation._id !== action.payload) };
    default:
      return state;
  }
};

export default reservations

