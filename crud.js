//const bodyParser = require('body-parser');
const UserModel = require('./models/Users')


const Post = (mongoose,req, res)=>{
    var enombre = req.body.enombre
  var eapellido = req.body.eapellido
  var ecorreo = req.body.ecorreo
  var eclave = req.body.eclave
  var eusuario = req.body.eusuario

  // compile schema to model
  var User = mongoose.model('User', UserModel.RegistroSchema, 'usuarios');

  // a document instance
  var Userx = new User({ 
            enombre :enombre,
            eapellido:eapellido,
              ecorreo:ecorreo,
               eclave:eclave,
             eusuario:eusuario
   });
  // save model to database
  Userx.save(function (err, data) {
    if (err){
      res.send({status:0, result:err})
    }else{
      res.send({status:1, result:data})
    }
    console.log(data.name + " Se ha registrado un nuevo usuario");
  });
console.log('===================', req.body)
}



const Get = (mongoose, req,res)=>{
  var eclave = req.body.eclave
  var eusuario = req.body.eusuario

  var User = mongoose.model('User', UserModel.RegistroSchema, 'usuarios');

  User.findOne({eusuario:eusuario, eclave:eclave},function (err,user){
    if(err){
      console.log(err)
      return res.status(500).send()
    }
    if(!user){
      return res.status(404).send()

    }
    return res.status(200).send(user)
  });

  // // a document instance
  // var Userx = new User({ 
  //           enombre :enombre,
  //           eapellido:eapellido,
  //             ecorreo:ecorreo,
  //              eclave:eclave,
  //            eusuario:eusuario
  //  });
}
module.exports = {Post, Get}