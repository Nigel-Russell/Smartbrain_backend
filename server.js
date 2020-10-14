const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//My Server Controllers

const register = require('./controllers/Register');
const signin = require('./controllers/Signin');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
});

const app = express();

app.use(express.json());
app.use(cors());

//THE FOLLOWING SERVER SECTIONS GET PASSED THEIR PARAMETERS (DB, BCRYPT) TO USE VIA DEPENDENCY INJECTION 

//route of server (home page)
app.get('/',(req, resp) => {resp.send("success") });

//post requests that processes login details and compares it to the database users
app.post('/signin', (req, resp) => {signin.handleSignin(req, resp, db, bcrypt)})

//post request that handles registered new details and stores it in databse variable
app.post('/register', (req, resp) => {register.handleRegister( req, resp, db, bcrypt)})

//get request that finds a users profile by looping through the database and looking for their ID
app.get('/profile/:id', (req, resp) => {profile.handleProfile( req, resp, db)})

//get request that finds a users profile by looping through the database via their ID and updates their entrie submissions
app.put('/image', (req, resp) => {image.handleImage(req, resp, db)})

app.post('/imageurl', (req, resp) => {image.handleAPI(req, resp)})

app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`App is Running on port ${process.env.PORT}`)
});