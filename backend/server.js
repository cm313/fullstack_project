const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));

  app.listen(5000, ()=>{
    console.log("server is running");
});


    
   const db = mysql.createConnection({
        host: "localhost",
        user: 'root',
        password: 'Mahesh@143',
        database: 'userinfo'
    });
    
    db.connect((err) => {
        if (err) {
          console.error('Database connection failed: ');
          return;
        }
        else{
            console.log("coonected succesfully");
        }
      });
      



app.post('/', (request, response)=>{
    const userDetails = request.body;
    const{id,name,password} = userDetails;
    const addUserQuery = `INSERT INTO userdata(id, name, password)
                            VALUES (?, ?, ?)`;
          db.query(addUserQuery, [id, name, password], (error, result)=>{
            if(error){
                console.log(error);
                response.send("Error occured in post method");
            }
            else{
                response.send("Data successfully submitted into database");
            }
          });                         
});

