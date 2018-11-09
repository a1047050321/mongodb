var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient; //MongoClient 这个要大写 小写找不到
var db = require("./models/db");
var assert = require("assert"); //错误处理 调试用的
app.get("/",function(req,res){
    //url就是数据库的地址. /拜师数据库
    //加入数据库不存在，没有关系，程序会帮你自动创建一个数据库。
    db.insertOne("student",{
        "name":"liuqng",
        "age":19
    },function(err,result){
        if(err){
            res.send("数据库链接失败");
            return ;
        }
        console.log(result); //{"n":1,"ok":1} 说明成功了插入了一个 n是影响了n条数据
        res.send(result);
    });
});
app.get("/du",function(req,res){
    var page = req.query.page || 0;
    var a = [];
    db.findData("student",{},{},function(err,data){
        if(err){
            res.send(err);
            return ;
        }
        res.send(data);
    })
});
//删除
app.get("/shan",function(req,res){
    var name = req.query.name || 0;
    db.deleteData("student",{name:name},function(err,data){
        if(err){
            res.send(err);
            return ;
        }
        res.send(data);
    })
});
//修改
app.get("/update",function(req,res){
    var name = req.query.name || 0;
    db.updateData("student",{name:name},{$set:{age:45}},function(err,data){
        if(err){
            res.send(err);
            return ;
        }
        console.log(data);
        res.send(data);
    })
});
app.listen(3000);