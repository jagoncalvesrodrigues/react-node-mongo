const express = require('express');
const app = express();
const port = process.env.PORT
const cors = require('cors');
const mongoose = require('mongoose');
const moviesRoutes = require('./routes/movies.routes');
//acceso a las variables de entorno, teniendo acceso a lo que haya en .env
require('dotenv').config();


const corsOptions = {
  origin: '*', // Orígenes permitidos (cuando esté en un dominio real, lo cambiaremos por ese dominio)
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
};

app.use(cors(corsOptions));
app.use(express.json());

//lo juntamos
app.use('/api/movies',moviesRoutes);


//conexion a la db
const startServer = async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('DATABASE CONNECTED')
  }catch (err){
    console.log('ERROR CORRE',err)
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

startServer();

