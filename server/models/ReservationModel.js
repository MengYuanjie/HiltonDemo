import mongoose from 'mongoose'

const ReservationSchema = mongoose.Schema({
    reservationNumber: String,
    arrivalTime: Date,
    participants: String,
    notes: String,
    status: String,
    creator: [String],
    client: { name: String, email: String, phone: String, address: String },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const ReservationModel = mongoose.model('ReservationModel', ReservationSchema)
export default ReservationModel