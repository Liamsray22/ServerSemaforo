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
var Bocina = mqtt.connect('mqtt://localhost:1883')
var ElFanias = mqtt.connect('mqtt://localhost:1883')


//Topico del broker
var topic ='Liam'

//Variables Utiles
var algo = "default"


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
//===================================================================================

//Publishers====================================================================
app.post('/Boton',(req, res) => {
publisher.publisher(ElFanias, req, res)

})

app.post('/Bocina',(req, res)=>{
  publisher.publisher(Bocina, req,res)
})
//===============================================================================


//Subcribers=================================================================
app.get('/Bocinas',(req, res)=>{
  res.send(algo)
  algo ="default"
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


