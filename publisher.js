const publisher = (client, req, res) => {
    var message = req.body.mensaje
    
    client.on('connect', ()=>{
      client.publish(topic, message)
            console.log('Se envio el mensaje ', message, " ")
    })
    
    res.send(message)

}

module.exports = {publisher}