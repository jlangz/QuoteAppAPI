module.exports = (app) => {
    const quotes = require('../controllers/quote.controller.js');

    // Create a new quote
    app.post('/quotes', quotes.create);

    // Retrieve all quotes
    app.get('/quotes', quotes.findAll);

    // Retrieve a single quote with quoteId
    app.get('/quotes/:quoteId', quotes.findOne);

    // Update a quote with quoteId
    app.put('/quotes/:quoteId', quotes.update);

    // Delete a quote with quoteId
    app.delete('/quotes/:quoteId', quotes.delete);
}