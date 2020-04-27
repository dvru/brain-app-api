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
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// database
const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });


const app = express();

app.use(cors())
app.use(bodyParser.json())
 

// get root route
app.get('/', (req, res)=> {
res.send('it is working!');
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
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})



