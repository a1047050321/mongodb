var express = require("express");
var app = express();
app.set("view engine",'ejs');
var cookie = require("cookir-parser");
//使用cookie的中间件
app.use(cookie());

app.use(express.static("./public"));
var assert = require("assert"); //错误处理 调试用的
//显示留言列表
app.get("/",function(req,res,next){
    res.cookie("ximing",'liuqing',{maxAge:900000,httpOnly:true});
    res.render("index");
});
app.listen(3000);