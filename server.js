var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
    
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'testusername',
    password : 'passwordtest',
    database : 'test'
});
       
       
connection.connect(function(err) {
    if (err) throw err;
          console.log('You are now connected...');
    });

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
/*
var server = app.listen(8080, "127.0.0.1", function () {
 
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
   
  });
*/

//Setting up server
var server = app.listen(process.env.PORT || 9000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });
 
 //rest api to get all users
app.get('/api/user', function (req, res) {
    console.log(req);
    connection.query('select * from users', function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 //rest api to get a single user
app.get('/api/user/:id', function (req, res) {
    console.log(req.params.id);
    connection.query('select * from users where id=?', [req.params.id], function (error, results, fields) {
        console.log(results);
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 //rest api to create a new user in mysql database
app.post('/api/user', function (req, res) {
    var postData  = req.body;
    console.log(postData);
    var query = "INSERT INTO users (username, password) VALUES ('"+req.body.username+"','"+req.body.password+"')";
    connection.query(query, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 //rest api to update record into mysql database
app.put('/api/user/:id', function (req, res) {
    connection.query('UPDATE `users` SET `username`=?,`password`=? where `id`=?', [req.body.username,req.body.password,req.params.id], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 //rest api to delete user from mysql database
app.delete('/api/user/:id', function (req, res) {
    console.log(req.body);
    connection.query('DELETE FROM `users` WHERE `id`=?', [req.params.id], function (error, results, fields) {
       if (error) throw error;
       res.end('Record has been deleted!');
     });
 });

