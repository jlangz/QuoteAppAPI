const Quote = require('../models/quote.model.js');

// Create and Save a new quote
exports.create = (req, res) => {
    // Validate request
    if(!req.body.quote) {
        return res.status(400).send({
            message: "'quote' cannot be empty!"
        })
    }else if(!req.body.author) {
        return res.status(400).send({
            message: "'author' cannot be empty!"
        })
    }else if(req.body.tags.length < 1) {
        console.log("Quote: '" + req.body.quote + "' has no tags.")
        return res.status(400).send({
            message: "You need at least one tag in the 'tag' array!"
        })
    }else if(!req.body.category) {
        console.log("No category found: Used tag '" + req.body.tags[0] + "' instead.");
        req.body.category = req.body.tags[0];
    };
    // Create a Quote
    const quote = new Quote({
        quote: req.body.quote,
        author: req.body.author,
        tags: req.body.tags,
        popularity: req.body.popularity || 0,
        category: req.body.category
    });

    // Save quote in database
    quote.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There was an internal error adding your quote, please notify admin!"
        });
    });
};

// Retrieve and return all quotes from the database.
exports.findAll = (req, res) => {
    Quote.find()
    .then(quotes => {
        res.send(quotes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There was an error while retrieving the quotes, please notify admin!"
        });
    });
};

// Find a single quote with a quoteId
exports.findOne = (req, res) => {
    Quote.findById(req.params.quoteId)
    .then(quote => {
        if(!quote) {
            return res.status(404).send({
                message: "Quote not found with id " + req.params.quoteId
            });
        }
        res.send(quote);
    }).catch(err => {
        if(err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Quote not found with id " + req.params.quoteId
            })
        }
        return res.status(500).send({
            message: "Error retrieving quote with id " + req.params.quoteId + ". Please notify admin!"
        });
    });
};

// Update a quote identified by the quoteId in the request
exports.update = (req, res) => {
    // Validate request
    if(!req.body.quote) {
        return res.status(400).send({
            message: "'quote' cannot be empty!"
        })
    }else if(!req.body.quote) {
        return res.status(400).send({
            message: "'author' cannot be empty!"
        })
    }else if(req.body.tags.length() < 1) {
        return res.status(400).send({
            message: "You need at least one tag in the 'tag' array!"
        })
    }else if(!req.body.tags) {
        return res.status(400).send({
            message: "'category' cannot be empty!"
        })
    };

    // Find note and update it with the new request data

    Quote.findByIdAndUpdate(req.params.quoteId, {
        quote: req.body.quote,
        author: req.body.author,
        tags: req.body.tags,
        popularity: req.body.popularity || 0,
        category: req.body.category
    }, {new: true})
    .then(quote => {
        if(!quote) {
            return res.status(404).send({
                message: "Quote not found with id " + req.params.quoteId
            });
        }
        res.send(quote);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.satatus(404).send({
                message: "Quote not found with id " + req.params.quoteId
            });
        }
        return res.status(500).send({
            message: "Error updating quote with id " + req.params.quoteId
        });    
    });
};

// Delete a quote with the specified quoteId in the request
exports.delete = (req, res) => {
    Quote.findByIdAndRemove(req.params.quoteId)
    .then(quote => {
        if(!quote) {
            return res.status(404).send({
                message: "Quote not found with id " + req.params.quoteId
            });
        }
        res.send({message: "Quote deleted successfully!"});
    }).catch(err => {
        if(err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Quote not found with id " + req.params.quoteId
            });
        }
        return res.status(500).send({
            message: "Could not delte quote with id " + req.params.quoteId,
        });
    });
};
