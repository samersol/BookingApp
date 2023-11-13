const mongoose = require('mongoose');
const { Schema } = mongoose;

const placeSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    price: Number,
    checkIN: Number,
    checkOut: Number,
    maxGuests: Number,

})

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;