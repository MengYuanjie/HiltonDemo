import express from 'express'
import { createReservation, updateReservation, deleteReservation, getReservation, getReservationsByUser, getTotalCount } from '../controllers/reservations.js'

const router = express.Router()

router.get('/count', getTotalCount) //use to generate Reservation serial number
router.get('/:id', getReservation)
router.get('/', getReservationsByUser)
router.post('/', createReservation)
router.patch('/:id', updateReservation)
router.delete('/:id', deleteReservation)



export default router