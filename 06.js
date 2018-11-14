var express = require("express");
var app = express();
app.set("view engine",'ejs');
var formidable = require("formidable");
var session = require("express-session");

var db = require("./models/db");
app.use(express.static("./public"));

app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true
}));
app.get("/",function(req,res,next){
    if(req.session.login){
        res.send("欢迎"+req.session.login);
    }else{
        res.send("还没登录");
    }

});
//session 只要删除对话 或者关闭服务器 就不见了
app.get("/login",function(req,res){
    res.render("denglu");
});

app.post("/checkLogin",function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fileds,files){
        console.log(fileds);
        for(let p in fileds){
            if(!fileds[p]){
                res.send("请补充信息");
                return ;
            }
        };
        //根据用户输入去数据库里比对 然后读取密码
        //如果读取的密码 和填写的一样，登陆成功，如果不一样，登录失败
        //如果没找到这个记录，用户名错误
        db.findData("user",{name:fileds["name"]},{},function(err,result){
            if(result.length == 0){
                res.send("用户名错误");
            }else{
                if(result[0].password == fileds["password"]){
                    req.session.login = true;
                    res.send("登陆成功");
                }else{
                    res.send("密码错误");
                }
            }
        })
    });
})
app.listen(3000);