var express = require("express");
var session = require("express-session");
var app = express();
app.set("view engine",'ejs');

app.use(express.static("./public"));
//中间件 这样使用
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true
}));
//显示留言列表
app.get("/xixi",function(req,res,next){
    console.log(req.session.username);
    if(req.session.username){
        res.send("欢迎"+req.session.username);
    }else{
        res.send("还没登录");
    }

});
//session 只要删除对话 或者关闭服务器 就不见了
app.get("/login",function(req,res){
    req.session.login = true;  //设置这个session
    req.session.username = "哈哈";
    res.send("登录了");
})
app.listen(3000);