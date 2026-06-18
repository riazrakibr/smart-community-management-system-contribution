const mongoose = require("mongoose");

const suggestionLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(
    "SuggestionLog",
    suggestionLogSchema
);
