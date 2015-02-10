/*var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
    */

var express = require('express');
var app = express();

app.get('/contactlist',function(req, res){
    console.log('I received a get request');

    var person1 = {
        name:'Alexandre',
        email: 'alex@email.com',
        number:'(11)1111-1111'
    };

    var person2 = {
        name:'Thais',
        email:'thais@email.com',
        number:'(22)2222-2222'
    };

    var person3 = {
        name:'Mariana',
        email:'mariana@email.com',
        number:'(33)3333-3333'
    };

    var person4 ={
        name:'Evelyn',
        email:'evelyn@email.com',
        number:'(44)4444-4444'
    };

    var contactlist = [person1,person2,person3,person4];
    res.json(contactlist);
});


app.use(express.static(__dirname + "/public"));
app.listen(3000);
console.log('Server running on port 3000');