const {Client} = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const client = new Client({
    user:"postgres",
    host:"127.0.0.1",
    database:"postgres", 
    password:"Zaeem1198!",  
    port:5432
}); 
client.connect();

function validEmail(email) {
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return regex.test(email);
}

function validPassword(password) {
  if(password.length >= 8) {
    return true
  }else {
    return false
  }
}

const logIn = async (request, response) => {
 
   try {
      const {email,password} = request.body
      const token = jwt.sign({email:email,password:password},'secretkey')
      const result = await client.query(`SELECT email,password FROM users3 WHERE email = $1`,[email]);
      const user = result.rows[0]
      if(!user) {
        response.status(400).send('No user with this email')
      }
      if(!validEmail(email)) {
        response.status(400).send('email is not valid!')
      }
      if(!validPassword(password)) {
     response.status(400).send('password must be at least 8 characters!')
      }

     if(user) {
        const passwordMatch = await bcrypt.compare(password,user.password) 
        if(passwordMatch) {
          console.log('you are logged in')
         response.send(token)
       }else{
        console.log('password not matched')
       }
      }

    } catch (error) {
      console.error(error);
      response.status(500).send('internal error');
    }
  };  

 

  module.exports= {
    logIn
  };
