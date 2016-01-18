var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

stormpath.init(app,{
    website:true
});

app.on('stormpath.ready',function(){
    var port = 3000;
    var host = 'localhost';
    app.listen(port,host,function(err){
        if(err){
            return console.error(err);
        }
        console.log('Listening at http://'+host+':'+port);
    })
});