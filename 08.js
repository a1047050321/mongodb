var express = require("express");
var formidable = require("formidable");
var app = express();
app.set("view engine",'ejs');
var db = require("./models/db");
var md5 = require("./models/md5");
app.use(express.static("./public"));
var assert = require("assert"); //错误处理 调试用的

app.get("/login",function(req,res,next){
    res.render("login");
});
app.post("/dologin",function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        fields["password"] = md5(fields["password"]);
        //注册把登录名 密码存入数据库
        db.findData("user",{name:fields["name"]},{},function(err,result){
            console.log(result);
            if(result[0] && !err && result[0].password == fields["password"]){
                res.json("1");
            }else{
                res.json("-1");
            }
        })
    })
});

app.get("/reg",function(req,res,next){
    res.render("regiest");
});
app.post("/doregiest",function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        fields["password"] = md5(fields["password"]);
        //注册把登录名 密码存入数据库
        db.insertOne("user",fields,function(err,result){
            if(result && !err){
                res.json("1");
            }else{
                res.json("-1");
            }
        })
    })
})
app.listen(3000);