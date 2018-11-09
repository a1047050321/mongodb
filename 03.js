var express = require("express");
var app = express();
app.set("view engine",'ejs');
var MongoClient = require("mongodb").MongoClient; //MongoClient 这个要大写 小写找不到
var db = require("./models/db");
var formidable = require("formidable");
app.use(express.static("./public"));
var assert = require("assert"); //错误处理 调试用的
//显示留言列表
app.get("/",function(req,res,next){
    res.render("index");
});
app.get("/liuyan",function(req,res){
    var page = req.query.page || 0;
    db.findData("liuyan",{},{},function(err,data){
        if(err){
            res.send(err);
            return ;
        }
        res.json(data);
    })
});
//提交 处理留言
app.post("/tijiao",function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fileds,files){
        console.log(fileds);
        for(let p in fileds){
            if(!fileds[p]){
                res.send("请补充信息");
                return ;
            }
        };
        db.insertOne("liuyan",fileds,function(err,data){
            if(err){
                //ajax返回值一般设置为json
                res.json("-1");
            }else{
                console.log(data);
                res.json("1");
            }
        })
    })
})
app.listen(3000);