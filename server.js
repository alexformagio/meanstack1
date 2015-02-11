/*var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
    */

var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('contactlist',['contactlist']);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist',function(req, res){
    console.log('I received a get request');

    db.contactlist.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });

});

app.post('/contactlist',function(req,res){
    console.log(req.body);
    db.contactlist.insert(req.body,function(err,doc){
        res.json(doc);
    });
});

app.delete('/contactlist/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.put('/contactlist',function(req, res){
    var contact = req.body;
    console.log('update received -> ' + contact._id);
    db.contactlist.findAndModify({query: {_id : mongojs.ObjectId(contact._id)},
                                  update: {$set: {name: contact.name, email: contact.email, number: contact.number}},
                                  new: true}, function(err, doc){
        console.log('update responded -> ' + doc);
        res.json(doc);
    });
});

app.listen(3000);
console.log('Server running on port 3000');