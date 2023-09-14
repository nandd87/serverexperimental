const express = require('express')
const app = express()
const port = 3000
const mysql = require("mysql");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "",
    database : "rawabelongapp",
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/tbproduk" , (req,res) => {
    db.query("SELECT * FROM tbproduk" , (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.post("/createproduk", (req, res) => {
    const shopID = req.body.shopID;
    const nama = req.body.nama;
    const harga = req.body.harga;
    const tipe = req.body.tipe;
    const img = req.body.img;
    const deskripsi = req.body.deskripsi;
    
   db.query(
      "INSERT INTO `tbproduk`(`shopID`, `nama`, `harga`, `tipe`, `img`, `deskripsi`) VALUES ('"+ shopID + "','"+ nama +"','"+harga+"','"+tipe+"','"+img+"','"+deskripsi+"')",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Data berhasil ditambah");
        }
      }
    );
 });  
 
app.get("/getuser" ,(req, res) => {
  db.query("SELECT * FROM accountuser" , (err,result) => {
    if(err){
        console.log(err);
    } else{
        res.send(result);
    }
});

}) 

app.listen(3001, () => {
    console.log("Server running successfully on 3001");
})

app.listen(port)