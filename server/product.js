/* This code is defining a Mongoose schema for a product with three properties: name (a string), price
(a number), and date (a string). It then exports a Mongoose model for this schema, named "products".
This model can be used to interact with a MongoDB database collection named "products". */
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: String,
    date: Date,
    amount:Number
    
});

module.exports= mongoose.model('products', productSchema);