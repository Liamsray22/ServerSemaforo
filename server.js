const http = require('http');
//Installed
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crud = require('./crud')
const app = express()

const hostname = 'localhost';
const port = 3001;
var algo = "default"


//MQTT subscriber
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')
var topic ='Liam'

client.on('message',(topic, message)=>{

    message = message.toString()
    console.log(message)
    algo = message

})

client.on('connect',()=>{

    client.subscribe(topic)

})

/* ==============================================*/


mongoose.connect('mongodb://localhost/registroDB',{useNewUrlParser: true})
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post('/Registro',(req, res)=>{
  crud.Post(mongoose, req, res)
})

app.post('/Login',(req, res) => {

  crud.Get(mongoose,req, res)

})

app.post('/Boton',(req, res) => {

// MQTT publisher
var ElFanias = mqtt.connect('mqtt://localhost:1883')
var topic ='Liam'

var message = req.body.mensaje

  ElFanias.on('connect', ()=>{
  ElFanias.publish(topic, message)
        console.log('Se envio el mensaje ', message, " ")
})

res.send(message)

})

app.get('/Semaforo',(req, res) => {
  res.send(algo)

})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


