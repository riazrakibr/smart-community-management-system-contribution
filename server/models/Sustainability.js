const mongoose = require("mongoose");

const sustainabilitySchema = new mongoose.Schema({
    water: Number,
    electricity: Number,
    waste: Number,
    ecoScore: Number,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Sustainability",
    sustainabilitySchema
);