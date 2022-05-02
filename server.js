const database = require('./database')
const express = require('express');
const mysql = require('mysql');
const req = require('express/lib/request');
var session = require('express-session')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
})
db.connect(err => {
    if(err){
        console.log(err)
    }
    console.log("Successfuly connected")
})
const app = express()
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, saveUninitialized: true}))
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
app.set('view engine', 'ejs');
const { } =
app.get('/',(req,res)=>{
    console.log(req.sessionID)
    res.render('index.ejs',{
        name:req.query.cmd
    })
})
app.post('/',(req,res) => {
   let query = `SELECT * from users where username = '${req.body.username}' AND password = '${req.body.password}' `;
   db.query(query,function(error, results, fields){
       if (error) throw error;
       if (results.length > 0) {
            res.render('logged.ejs',{id:results[0].ID})
            req.session.loggedin = true;
            console.log(req.session.loggedin)
            req.session.username = results[0].ID;
       }
       else {
        res.render('index.ejs',{
            name:"Username  or Password error"
        })
       }
   })
//    console.log(req.body.username)
//    console.log(req.body.password)
  

})

app.get('/register',(req,res)=>{
    console.log(req.session.loggedin)
    if (req.session.username){
        res.render('logged.ejs',{id:req.session.username})
    }
    res.render('register.ejs')
})


app.post('/register',(req,res) => {
    let query = `INSERT INTO users (ID,username,password) values (null,'${req.body.username}','${req.body.password}')`;
    db.query(query,function(error, results, fields){
        if (error) throw error;
         res.render('index.ejs',{
             name:"Please log in"
         })
    })
 //    console.log(req.body.username)
 //    console.log(req.body.password)
   
 
 })




app.listen(8080)