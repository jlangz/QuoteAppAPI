const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema({
    quote: String,
    author: String,
    tags: Array,
    popularity: Number,
    category: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Quote', QuoteSchema);
