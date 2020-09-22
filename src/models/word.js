const mongoose = require('mongoose');
const { Schema } = mongoose;

const WordSchema = new Schema({
    spanish: { type: String, required: true },
    costanish: { type: String, required: true },
    description: { type: String, required: true }
})

module.exports = mongoose.model('Word', WordSchema);