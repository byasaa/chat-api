const express = require('express')
const path = require('path')
require('dotenv').config()
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser')
const morgan = require('morgan')
const connection = require('./src/helpers/mysql')
const cors = require('cors')

connection.connect(function(error) {
    if (error) throw error;
    console.log('Database has connected!');
  });

io.on('connection', socket => {
  console.log('user connected', socket.id)
  socket.on('chat-message', msg => {
    console.log(msg)
  })
  socket.on('disconnect', () => {
    console.log('user disconnect', socket.id);
  })
  // socket.disconnect()
})
app.use('/', express.static(path.join(__dirname, 'public')))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
  req.io = io
  next()
})
app.use('/', require('./src/routes'))

server.listen(3000, () => {
    console.log('This application running in http://localhost:3000');
})