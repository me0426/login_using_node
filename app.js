const express = require('express')
const app = express();
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const {User}= require('./User')
const bcrypt= require('bcryptjs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//mongoose.Promise= global.Promise

mongoose.connect('mongodb://127.0.0.1:27017/loginp', {useNewUrlParser:true}, ()=>{
    console.log('connecTed');
})
app.post('/register', (req,res)=>{
    const newUser = new User()
    newUser.email= req.body.email
    newUser.password= req.body.password

bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash)=>{
        if (err) return err;
        newUser.password= hash;
        newUser.save().then(usersaved=>{
            res.send('user saved')
            console.log(newUser);
        }).catch(err=>{
            res.status(404).send('user not saved')
        })
    })
})


})
    

// newUser.save()
app.get('/register', (req, res)=>{
    User.find({}).then(users=>{
        res.status(200).send(users)
    })
})
//const me= req.body.email;

app.post('/login', (req,res)=>{

    
    User.findOne({email: req.body.email}).then(users=>{
        if(users){
            bcrypt.compare(req.body.password, users.password, (err,matched)=>{
                if (err) return err;
                if(matched){
                    res.send('user was able to login')

                }
                else{
                    res.send('user not able to login')
                  
                }
            })
        }
    })






})
app.listen(5000, ()=>{
    console.log('connect to port 5000');
})