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

let db = '';

const intitalizeDBAndServer = ()=>{
    try {
    db = mysql.createPool({
        host: "localhost",
        user: 'root',
        password: 'Mahesh@143',
        database: 'userinfo'
    });
    app.listen(5000, ()=>{
        console.log("server is running");
    });
} catch(error){
    console.log("DataBase Connection error: "+ error.message);
}
};
intitalizeDBAndServer();

app.post('/', (request, response)=>{
    const userDetails = request.body;
    const{id,name,password} = userDetails;
    const addUserQuery = `INSERT INTO userdata(id, name, password)
                            VALUES (
                                    '${id}', 
                                    '${name}',
                                    '${password}' ) `;
          db.query(addUserQuery, (error, result)=>{
            if(error){
                response.send("Error occured in post method");
            }
            else{
                response.send("Data successfully submitted into database");
            }
          });                          
});

