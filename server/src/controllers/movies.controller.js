const MovieModel = require("../models/movie.model");

const moviesController = {};

//construimos el controlador 
moviesController.getAllMovies = async (req,res)=>{
    try{
        //esto es leer la db
        const allMovies = await MovieModel.find()
        console.log(allMovies);
        return res.status(200).json(allMovies)
    }catch (err){
        return res.status(500).json({error:'Error reading db' + err})
    }
}

moviesController.getMovieById = async (req,res)=>{
    const {id} = req.params
    try{
        //esto es leer la db
        const movie = await MovieModel.findById(id);
        if(!movie){
            return res.status(404).json({error:'movie not found'});
        }
        return res.status(200).json(movie)
    }catch (err){
        return res.status(500).json({error:'Error reading db' + err})
    }
}

moviesController.getMoviesByGenre = async (req,res)=>{
    const {genre} = req.params;
    try{
        const movies = await MovieModel.find({
            //buscamos especificamente por genero con un operador de compracion
            genre: {$eq:genre}
        });
        if(!movies){
            return res.status(200).json([]);
        }
        return res.status(200).json(movies);
    }catch (err){
        return res.status(500).json({error:'Error reading db' + err})
    }
}

moviesController.getMoviesByYear = async (req,res)=>{
    const {year} = req.params;
    try{
        const movies = await MovieModel.find({
            //buscamos especificamente por genero con un operador de compracion
            year: {$gte:year}
        });
        if(!movies){
            return res.status(200).json('NO hay peliculas en la db despues de ese año');
        }
        return res.status(200).json(movies);
    }catch(err){
        return res.status(500).json({error:'Error reading db' + err})
    }
}

moviesController.getMoviesByRangeYear = async (req,res)=>{
    const {yearstart,yearend} = req.params;
    try{
        const movies = await MovieModel.find({
            year: {$gte:yearstart, $lte:yearend}
        });
        if(!movies){
            return res.status(200).json('NO hay peliculas en la db despues de ese año');
        }
        return res.status(200).json(movies);
    }catch(err){
        return res.status(500).json({error:'Error reading db' + err})
    }
}



moviesController.createMovie = async (req,res)=>{
    const movieInfo = req.body;
    //hacemos una copia del esquema
    const newMovie = new MovieModel({...movieInfo});
    try{
        await newMovie.save();
        const allMovies = await MovieModel.find();
        return res.status(200).json(allMovies)
    }catch (err){
        return res.status(500).json({error:'Error reading/write db' + err})
    }
}

moviesController.updateMovie = async (req,res)=>{
    const {id} = req.params;
    const newInfo=req.body;
    try{
        const movieToUpdate = await MovieModel.findById(id);
        if(!movieToUpdate){
            return res.status(404).json({error:'Movien not found'})
        }
        //parametros: el id que sepa cual es y la infoque se va a actualizar
        await MovieModel.updateOne({_id:id},{$set:{...newInfo}});
        const allMovies = await MovieModel.find();
        return res.status(200).json(allMovies);
    }catch(err){
        return res.status(500).json({error:'Error reading/write db' + err})
    }
}

moviesController.deleteMovie = async (req,res)=>{
    const {id} = req.params;
    try{
        const movieToUpdate = await MovieModel.findById(id);
        if(!movieToUpdate){
            return res.status(404).json({error:'Movien not found'})
        }
        await MovieModel.deleteOne({_id:id});
        const allMovies = await MovieModel.find();
        return res.status(200).json(allMovies);
    }catch(err){
        return res.status(500).json({error:'Error reading/write db' + err})
    }
}

//controlador que nos de peliculas mayores a un año



module.exports = moviesController;
