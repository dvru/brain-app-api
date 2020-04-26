const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

// database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'daminivaru',
      password : '',
      database : 'brain-app'
    }
  });


const app = express();

app.use(cors())
app.use(bodyParser.json())
 

// get root route
app.get('/', (req, res)=> {
    res.send(database.users);
})

//sign in route
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

//register route
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// profile/id route
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// image ranks
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, db) })


//port 
app.listen(3000, () => {
    console.log('app is running on port 3000')
})



