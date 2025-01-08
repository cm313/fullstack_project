const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
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
    const{firstName, lastName, email, userName, password, role} = userDetails;
    const hashedPassword = await bcrypt.hash(password, 8);
    const selectUserQuery = `SELECT * FROM userdata where userName = '${userName}'`;
    const dbUser = await db.query(selectUserQuery);
    if(dbUser[0].length === 0){
      const addUserQuery = `INSERT INTO userdata(firstname, lastname, email, username, password, role)
      VALUES (?, ?, ?, ?, ?, ?)`;
     await db.query(addUserQuery, [firstName, lastName, email, userName, hashedPassword, role]); 
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
    const payload = {userName:userName};
      const isPasswordMatched = await bcrypt.compare(password, userData[0].password);
      if(isPasswordMatched === true){
          const jwtToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET_KEY ,{expiresIn: 60*60});
          const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: '7d'});
        response.send({jwtToken, refreshToken, role:userData[0].role});
      }else{
        response.status(400);
         response.json("Password not valid");
      }
  }
});

function authenticateToken(request, response, next){
  let jwtToken='';
  const header = request.headers["authorization"];
  if(header !== undefined){
    jwtToken = header.split(" ")[1];
    if(jwtToken === undefined){
      response.status(401);
      response.json("Invalid JWT Token");
    }
    else{
      jwt.verify(jwtToken, process.env.JWT_TOKEN_SECRET_KEY, (error, user)=>{
        if(error){
        return  response.status(403).json("Access Denied");
        }
        else{
          request.user = user;
          next();
        }
      } );
    }
  }
  else{
    response.status(400);
    response.json("Bearer Token not provided")
  }
}

app.get('/userinterface', authenticateToken, (request, response)=>{
  response.json("Token validated, Request processed");
});


app.post('/accesstoken', (request, response)=>{
  const {refreshToken} = request.body;
  if(!refreshToken){
  //  console.log("code entered backend server, but no refreshToken provided");
    response.status(401);
  }
  else{
   // console.log("refresh token exists in backend");
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (error, user)=>{
      if(error){
     //   console.log("encountered error while verifying refresh token")
        return response.status(403).json("verification of refresh token failed/accesstoken not generated");
      }
      else{
        const jwtToken = jwt.sign({user},process.env.JWT_TOKEN_SECRET_KEY,{expiresIn: '7d'});
      //  console.log("generated new access token");
       // console.log(jwtToken);
        response.send({jwtToken});
      }
    })
  }
});

