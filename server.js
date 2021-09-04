const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
 
const db = knex({
	client:'pg',
	connection: {
		host: process.env.DATABASE_URL,
		ssl:true
	}
});






const app = express();



app.use(express.json());


app.use(cors());



app.get('/',(req,res) => {res.send('it is working!')})
//signin
app.post('/signin', signin.handleSignin(db,bcrypt))

//dependecy injection. inject db,  bcrypt to handleRegister
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

//profile, for future improvement: add user profile page for them to edit
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req,res,db)})

//image: update entry count
app.put('/image', (req,res) => { image.handleImage(req,res,db)})

//newend-point for api calls
app.post('/imageurl', (req,res) => { image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})


/*
RESTful api planning before actual coding
/ -->res = this is working

/signin  --> POST   res= success/fail
/register --> POST  res= user object returned ,here we are not creating new user, but why still use POST:
	b/c: when sending user password, don't do that through query string(url),
	 	 we need to send it inside of the body over https.


/profile/:userId --> GET res= user profile
/image --> PUT (we are updating rank number to existing user profile) res=updated user object (rank, count...)
*/
