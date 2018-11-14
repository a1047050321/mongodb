var mongoose = require("mongoose");
//链接本地数据库 haha
mongoose.connect("mongodb://localhost/haha");
//创建一个模型，所有的猫都有名字是字符串，类
//自动创建集合 cats 
var Cat = mongoose.model("Cat",{name:String});
//实例化一只猫
var ketty = new Cat({name:"ketty"});
//实例有个save方法 保存这只猫
ketty.save(function(err){
    console.log("成功啦");
})