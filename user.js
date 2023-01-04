const mongoose = require('mongoose')
const User= mongoose.model('users', {
email:{
    type :String,
    required:true,
    minlength:3,
    trim:true,
    unique:true
},
password:{
    type :String,
   required:true,
    minlength:8,
 
    
}
})

module.exports= {User}