var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyparser.json());
app.listen('3000', () => {
    console.log('server running at port 3000');
});

// mysql database connection

var db = mysql.createConnection({
    host: "database-1.cyc2ywmoxfol.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "admin1234",
    database: "myDB"
});

// check db connection
db.connect((err) => {
    if (err) throw err;
    else {
        console.log("database conected");
    }
})

// REST CURD API

app.get('/api', (req, res) => {
    res.send("API working")
})

// create data

app.post('/api/create', (req, res) => {
    console.log(req.body);

    // sql query

    let sql = ` INSERT INTO newTable 
                VALUES('${req.body.id}','${req.body.title}')
                `;

    // run query
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("data inserted");
    })
})

// read data

app.get('/api/read', (req, res) => {
    // sql query
    let sql = ` SELECT * FROM newTable
                `;

    // run query
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})


// read data from a particular ID

app.get('/api/read/:id',(req,res)=>{
    // req.params.id gets the id from the API URL
    // console.log(req.params.id);

    let sql = ` SELECT * FROM newTable
                WHERE id = '${req.params.id}'
                `;

    // run query
    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result);
        console.log(result);
    })
})


// update Data

app.put('/api/update/:id',(req,res)=>{
    // get id
    // set query
    let sql = ` UPDATE newTable SET
                title = '${req.body.title}'
                WHERE id = '${req.params.id}'
                `;

     // run query
     db.query(sql,(err,result) =>{
        if(err) throw err;
        res.send("data updated");
        console.log(result);
    })
})