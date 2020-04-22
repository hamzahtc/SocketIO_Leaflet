const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express()
app.use(cors());
const server = http.createServer(app)
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true}
  );
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
  })

  const usersRouter = require('./routes/users');
  app.use('/user', usersRouter);
  const cartesRouter = require('./routes/cartes');
  app.use('/carte', cartesRouter);
  const coordinatesRouter = require('./routes/coordinates');
  app.use('/coordinate', coordinatesRouter);

const io = socketIo(server)
const locationMap = new Map()
//const arrayFiltred = []
io.on('connection', socket => {
  
    
    

     socket.on('updateLocation', cli => {
      locationMap.set(socket.id, cli)
    })


    
    socket.on('requestLocations', (username) => {
      //console.log(username);
      //console.log(Array.from(locationMap)[0]);
      /*arrayFiltred = [];
      arrayFiltred = Array.from(locationMap).filter(element => element[1].username === )*/
      socket.emit('locationsUpdate', Array.from(locationMap).filter(element => element[1].username == username))
     // Array.from(locationMap).map(elemnt => console.log(elemnt[1].username));
     console.log(Array.from(locationMap))
    })
  
    socket.on('disconnect', () => {
      locationMap.delete(socket.id)
    })
  
   
  })
server.listen(5000, err => {
    if (err) {
      throw err
    }
  
    console.log('server started on port 5000')
  })