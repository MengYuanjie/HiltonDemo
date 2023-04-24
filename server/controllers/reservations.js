import express from 'express'
import mongoose from 'mongoose'

import ReservationModel from '../models/ReservationModel.js'

export const getReservationsByUser = async (req, res) => {
    const { searchQuery } = req.query;
    let filter = {};
    //Only for demo, it should check user role from DB
    if (searchQuery !== 'admin') {
        filter = { creator: searchQuery };
    }

    try {
        const reservations = await ReservationModel.find(filter);

        res.status(200).json({ data: reservations });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getTotalCount = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        // const Reservations = await ReservationModel.find({ creator: searchQuery });
        const totalCount = await ReservationModel.countDocuments();

        res.status(200).json(totalCount);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getReservations = async (req, res) => {

    try {
        const allReservations = await ReservationModel.find({}).sort({ _id: -1 })

        res.status(200).json(allReservations)

    } catch (error) {
        res.status(409).json(error.message)

    }

}




export const createReservation = async (req, res) => {

    const Reservation = req.body

    const newReservation = new ReservationModel(Reservation)

    try {
        await newReservation.save()
        res.status(201).json(newReservation)
    } catch (error) {
        res.status(409).json(error.message)
    }

}

export const getReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const Reservation = await ReservationModel.findById(id);

        res.status(200).json(Reservation);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateReservation = async (req, res) => {
    const { id: _id } = req.params
    const Reservation = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Reservation with that id')

    const updatedReservation = await ReservationModel.findByIdAndUpdate(_id, { ...Reservation, _id }, { new: true })

    res.json(updatedReservation)
}


export const deleteReservation = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Reservation with that id')

    await ReservationModel.findByIdAndRemove(id)

    res.json({ message: 'Reservation deleted successfully' })
}