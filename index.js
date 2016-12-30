var express = require('express');
var app = express();
/*var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');*/
var port = 1234;

//giao diện
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("index");
});

//Socket IO
app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
	var ID = socket.id;
    socket.emit('message', { message: 'Xin chào, tên bạn là:<br />' + ID });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

/*
var url = 'mongodb://localhost:27017/chatv2';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connecting to MongoDB.");
  db.close();
});

//insert data

var insertDocument = function(db, callback) {
   db.collection('content').insertOne( {
	   
    "chat_id" : 2,
    "chat_name" : "D-110",
    "chat_content" : "DEMO ACCOUNTING"
	
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};

//Call the insertDocument function.
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});
*/
/*MYSQL
var pool = mysql.createPool({
host: "localhost",
user: "root",
password: null,
database: "chat",
});
app.get("/user", function(req, res){
// Viết câu truy vấn sql
var sql = "SELECT * FROM content";// Thực hiện câu truy vấn và show dữ liệu
pool.query(sql, function(error, result){
if (error) throw error;
console.log("– CONTENT TABLE — " , result);
res.json(result); // Trả kết quả về cho client dưới dạng json
});
}); */