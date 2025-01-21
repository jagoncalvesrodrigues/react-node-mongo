const { default: mongoose } = require("mongoose");
const MovieScheme = require("../schemes/movies.schemes");

const MovieModel = mongoose.model('Movie',MovieScheme);

module.exports = MovieModel;