const http = require('http');
//Installed, Librerias utilizadas
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()
var mqtt = require('mqtt')


//Modulos Locales
const crud = require('./crud')
const publisher = require('./publisher')

//Constantes del servidor
const hostname = 'localhost';
const port = 3001;

//Conexion a la base de datos
mongoose.connect('mongodb://localhost/registroDB',{useNewUrlParser: true})


//Clientes del Broker


//Topico del broker
var topic ='Liam'

//Variables Utiles
var algo = "default"
var algo2 = "default"


//MQTT subscriber
var client = mqtt.connect('mqtt://localhost:1883')

client.on('message',(topic, message)=>{

    message = message.toString()
    console.log(message)
    algo = message

})

client.on('connect',()=>{

    client.subscribe(topic)

})

var client2 = mqtt.connect('mqtt://localhost:1234')

client2.on('message',(topic, message)=>{

    message = message.toString()
    console.log(message)
    algo2 = message

})

client2.on('connect',()=>{

    client2.subscribe(topic)

})

/* ==============================================*/

//Utilidades necesarias
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//Envios a la base de datos=====================================================
app.post('/Registro',(req, res)=>{
  crud.Post(mongoose, req, res)
})

app.post('/Login',(req, res) => {
  //loged = req.body.idUsuario
  crud.Get(mongoose,req, res)
})

app.post('/Historial',(req, res)=>{
  //req.body.idUsuario =  crud.GetUsers(mongoose, req.body.idUsuario)
  //req.body.idUsuario = loged.idUsuario
  crud.PostHistory(mongoose, req, res)
})

app.post('/History',(req, res)=>{
  crud.GetHistory(mongoose, req.body.idUsuario, res)

})
//===================================================================================

//Publishers====================================================================
app.post('/Boton',(req, res) => {
// publisher.publisher(ElFanias, req, res, topic)
var ElFanias = mqtt.connect('mqtt://localhost:1883')

var message = req.body.mensaje
    
ElFanias.on('connect', ()=>{
  ElFanias.publish(topic, message)
            console.log('Se envio el mensaje ', message, " ")
    })
    
    res.send(message)

})

app.post('/Bocina',(req, res)=>{
  // publisher.publisher(Bocina, req,res, topic)
  var Bocina = mqtt.connect('mqtt://localhost:1234')

  var message = req.body.mensaje
    
  Bocina.on('connect', ()=>{
    Bocina.publish(topic, message)
            console.log('Se envio el mensaje ', message, " ")
    })
    
    res.send(message)
})
//===============================================================================


//Subcribers=================================================================
app.get('/Bocinas',(req, res)=>{
  res.send(algo2)
  algo2 ="default"
})

app.get('/Semaforo',(req, res) => {
  res.send(algo)
  algo = "default"

})
//===============================================================================


//Configuracion del Servidor (puerto y host)
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


