const express = require('express')
const { Client } = require('pg');
var cors = require('cors')
var app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { isMatch } = require('lodash');

app.use(cors())

/* const products = [{ name: 'Pomme', description: 'Pomme de fes', price: '100', picture: 'pomme.jpg' },
{ name: 'Banane', description: 'Banane de costarica', price: '200', picture: 'banane.jpg' },
{ name: 'Pasthèque', description: 'Pasthèque de Agadir', price: '300', picture: 'pastheque.jpg' },
{ name: 'Avocat', description: 'Avocat de kenitra', price: '400', picture: 'avocat.jpg' },
{ name: 'Courgette', description: 'Courgette ...', price: '200', picture: 'courgette.jpg' },
{ name: 'Olive', description: 'Olive Essaouira', price: '700', picture: 'olive.jpg' },
{ name: 'Pomme de terre', description: 'Pomme de terre ...', price: '800', picture: 'pomme_de_terre.jpg' },
{ name: 'Persil', description: 'Persil ...', price: '300', picture: 'persil.jpg' }
] */

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database :'stock_produit',
    password: '7465',
    port : 5432,
});

client.connect();

const secret = 'ma-cle-secrete';

app.post('/register', (req, res) => {
    const {email, password} = req.body;
    const user = users.find(u =>email === email && u.password === password);
    if (user) {
        res.status(200).json({id :user.id, email : user.email});
    } else {
        res.status(403).json({message : "Email ou MDP incorrect"})
    }
    // Verifier si un utilisateur avec cet email existe
    // sinon retourner une erreur
 
 
    // si aucun utilisateur existe avec cet email alors
    // Hash du password
    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) {
        console.error("Error hashing password: ", error);
        return res.status(500).json({ message: "Internal server error" });
      }
 
    // On sauvegarde l'utilisateur avec le mot de pass hashé dans la base de donnée
    });
 });




function getAllProducts(clt, callback) {
    const query = "SELECT *  FROM products ORDER BY id ASC";
    clt.query(query, callback);
}

app.get('/get-products', (req, res) => {

    function callback(err, result) {
        if (err) {

            res.status(500).json({ message: err });
        } else {
            // res.status(200).send(displayAllClient(result.rows))
            res.status(200).json(result.rows)

        }
    }
    getAllProducts(client, callback)



})

app.get('/get-product/:id', (req, res)=>{
    const id = req.params.id;
    clt.query("SELECT * FROM products WHERE id =$1", [id], (error, results) =>{
        if (error){
            throw error;
        }
        res.status(200).json(results.rows);
    });
});


let newProduct = {};
function addProduct(clt, callback) {
    console.log(newProduct)
    console.log(newProduct.nom)
    const query = {
        text: 'INSERT INTO products(nom,description,price,picture) VALUES($1, $2, $3, $4)',

        values: [newProduct.nom, newProduct.description, newProduct.price, newProduct.picture],
    };

    console.log(query)
    clt.query(query, callback)
}


app.post('/add-product', (req, res) => {
    console.log(req.body)
    newProduct = req.body
    console.log(newProduct)
    function callback(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding data to database');
        } else {
            res.send('Data added to database successfully');
        }
    };
    addProduct(client, callback)



})


app.post('/login', (req, res) => {
 clt.query('SELECT * FROM users WHERE email = $1', [req.body.email], (err, results) => {
    if (results.rows.length === 0){
        return res.status(401).json({message: 'invalid email or password'});
    } else {
        bcrypt.compare(req.body.password, results.rows[0].password, (error, isMatch) =>{
            if (error){
                console.error("error compared password: ", error);
                return res.status(500).json({message : "internal server error"});
            }
            if (isMatch){
                const token = jwt.sign(req.body.email, secret);
                return res.json({message :"login successful", token,});
            }
            else{
                return res.status(401).json({message : "invalid email or password"});
            }
        })
    }
 })
})


app.post('/register', (req, res) => {
    clt.query('SELECT * FROM users WHERE email = $1', [req.body.email], (err, results) => {
       if (results.rows.length === 0){
           return res.status(401).json({message: 'invalid email or password'});
       } else {
        bcrypt.hash(password, 10, (error, hashedPassword) => {
            if (error) {
              console.error("Error hashing password: ", error);
              return res.status(500).json({ message: "Internal server error" });
            }
               if (isMatch){
                   const token = jwt.sign(req.body.email, secret);
                   return res.json({message :"login successful", token,});
               }
               else{
                   return res.status(401).json({message : "invalid email or password"});
               }
           })
       }
    })
   })



//update du product via  son ID
app.put('/product/:id', (req, res) => {
    const id = req.params.id;
    console.log(id, req.body);
    const { nom, description,price, stock} =req.body;
    client.query(
        `update Products set (
            nom,
            description,
            price,
            stock
             )
             = ($1,$2,$3,$4) where id = $5`,
        [nom, description, price, stock, id],
        (error, results)=> {
            if (error){
                console.error(err);
            }else{
            res.status(200).send(`Product modified with ID : ${id}`);
            }
        }
    )
})

function deleteProduct(clt, callback, id) {

    const query = {
        text: 'DELETE FROM products where id = $1',

        values: [id],
    };

    console.log(query)
    clt.query(query, callback)
}

app.delete('/delete-product/:id', (req, res) => {
    const id = req.params.id;
    function callback(err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding data to database');
        } else {
            res.send('Data added to database successfully');
        }
    };
    deleteProduct(client, callback, id)



})


app.listen(5000, function () {
    console.log('server listening on port 5000')
})