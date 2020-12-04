//const bodyParser = require('body-parser');
const UserModel = require('./models/Users')
const HistorialModel = require('./models/Historial')


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

const PostHistory = (mongoose,req, res)=>{
var lugar = req.body.lugar
var uso = req.body.uso
var fecha = new Date()
var idUsuario = req.body.idUsuario

// compile schema to model
var Historial = mongoose.model('Historial', HistorialModel.HistorialSchema, 'historial');

// a document instance
var Historialx = new Historial({ 
          lugar :lugar,
          uso:uso,
            fecha:new Date(),
             idUsuario:idUsuario
 });

// save model to database
Historialx.save(function (err, data) {
  if (err){
    res.send({status:0, result:err})
  }else{
    res.send({status:1, result:data})
  }
  console.log(data.name + " Se ha registrado un press");
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

const GetHistory = (mongoose, id, res)=>{

  var Historial = mongoose.model('Historial', HistorialModel.HistorialSchema, 'historial');
  Historial.find({idUsuario:id},(function (err, result) { 
if (err){ 
  console.log(err)
  return res.status(500) 
}else{ 
  console.log("Result :", result)  
  return res.status(200).send(result)
} 
})); 
}


const GetUsers = (mongoose, id) =>{
  const _id = id;
const schema = new mongoose.Schema({ _id: mongoose.ObjectId }, { versionKey: false });
const Model = mongoose.model('MyModel', UserModel.RegistroSchema, 'usuarios');

Model.create({ _id: new mongoose.Types.ObjectId(_id) });

typeof _id; // 'string'
// `{ _id: '5d273f9ed58f5e7093b549b0' }`
const doc = Model.findById(_id);
return doc._id
// typeof doc._id; // 'object'
// doc._id instanceof mongoose.Types.ObjectId;
}
module.exports = {Post, Get, PostHistory, GetUsers, GetHistory}