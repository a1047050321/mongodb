var express = require("express");
var gm = require("gm").subClass({imageMagick:true});
var app = express();
app.set("view engine",'ejs');
app.use(express.static("./public"));

gm("./4.1.3.jpg")
.resize(50,50,'!')  //！表示强制更改
.write("/hehe.jpg",function(err){ //重写为 hehe.jpg
    if(err)console.log(err);
    if(!err)console.log(done);
});