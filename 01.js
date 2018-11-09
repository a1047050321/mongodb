var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient; //MongoClient 这个要大写 小写找不到
var assert = require("assert"); //错误处理 调试用的
app.get("/",function(req,res){
    //url就是数据库的地址. /拜师数据库
    //加入数据库不存在，没有关系，程序会帮你自动创建一个数据库。
    var url = "mongodb://localhost:27017/test";
    //链接数据库，回调函数标识链接成功做的事情，client.db是连接上的数据库实体，err链接失败
    MongoClient.connect(url,function(err,client){
        // assert.equal(null,err);
        if(err){
            console.log("数据库链接失败");
            return ;
        }
        //插入数据，集合如果不存在，也没关系，程序会帮你创建  3.0以后新写法
        var db = client.db("test");
        //设置test数据库下 student集合插入
        db.collection("student").insertOne({
            "name":"hah",
            "age":"29"
        },function(err,result){
            if(err){
                res.send("数据库链接失败");
                return ;
            }
            console.log(result); //{"n":1,"ok":1} 说明成功了插入了一个 n是影响了n条数据
            res.send(result);
            db.close(); //关闭数据库
        });
    })
});
app.listen(3000);