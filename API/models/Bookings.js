const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    price: Number,
    phone: { type: String, required: true },
    name: { type: String, required: true }
})

const BookingModel = mongoose.model('Bookings', placeSchema);

module.exports = BookingModel;