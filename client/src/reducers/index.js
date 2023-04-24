import { combineReducers } from 'redux'

import clients from './clients'
import auth from './auth'
import profiles from './profiles'
import reservations from './reservations'


export default combineReducers({ clients, auth, profiles, reservations })