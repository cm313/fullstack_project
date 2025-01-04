const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));




    
   const db = mysql.createPool({
        host: "localhost",
        user: 'root',
        password: 'Mahesh@143',
        database: 'userinfo'
    });
    
    db.query('SELECT 1').then(()=>{
      console.log("database is connected");
      app.listen(5000, ()=>{
        console.log("server is running");
      })
    }).catch((error)=>{console.log(error)});
      



app.post('/', async (request, response)=>{
    const userDetails = request.body;
    const{firstName, lastName, email, userName, password} = userDetails;
    const hashedPassword = await bcrypt.hash(password, 8);
    const selectUserQuery = `SELECT * FROM userdata where userName = '${userName}'`;
    const dbUser = await db.query(selectUserQuery);
    if(dbUser[0].length === 0){
      const addUserQuery = `INSERT INTO userdata(firstname, lastname, email, username, password)
      VALUES (?, ?, ?, ?, ?)`;
     await db.query(addUserQuery, [firstName, lastName, email, userName, hashedPassword]); 
      response.json("user created succesfully"); 
    }
    else{
           response.status(400);
           response.json("user already exists,please login");
    }                       
});


app.post('/login', async (request, response)=>{
  const userDetails = request.body;
  const{userName, password} = userDetails;
  const selectUserQuery =`SELECT * FROM userData where username = '${userName}'`;
  const dbUser = await db.query(selectUserQuery);
  if(dbUser[0].length === 0){
     response.status(400);
     response.json("not a valid user, please Register");
  }
  else{
    const userData = dbUser[0];
      const isPasswordMatched = await bcrypt.compare(password, userData[0].password);
      if(isPasswordMatched === true){
          const jwtToken = jwt.sign({userName:userName}, "jwttokengeneration",{expiresIn: '1h'});
        response.send({jwtToken});
      }else{
        response.status(400);
         response.json("Password not valid");
      }
  }
})

