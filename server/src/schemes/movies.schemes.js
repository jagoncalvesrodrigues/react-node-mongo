const mongoose = require('mongoose');

const MovieScheme = mongoose.Schema({
    //recibe como parametro los datos
    //no hace falta poner el id
    title: String,
    year: Number,
    genre: String
},
{
    collection:'movies-collection'
});

module.exports = MovieScheme;