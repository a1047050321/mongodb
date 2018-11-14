//这个模块里面封装了所有对数据库的常用操作
//不管数据哭什么操作，都要链接数据库，可以吧链接数据库封装成函数。
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var setting = require("../setting")
function __connectDB(callback){
    var url = setting.dburl;
    MongoClient.connect(url,function(err,client){
        if(err){
            console.log(err);
        }else{
            console.log("链接成功了");
            callback(err,client.db("haha"),client);
        }
    })
};
//插入方法
exports.insertOne = function(collectionName,data,callback){
    __connectDB(function(err,db,client){
        db.collection(collectionName).insertOne(data,function(err,result){
            callback(err,result);
            client.close();  //关闭要是clent关闭 而不是client.db
        });
    })
};
//查询数据 找到所有数据  collectionName=>集合名 json =>查什么 args是个对象 返回当前的分页信息
exports.findData = function(collectionName,json={},args,callback){
    var results= [];
    if(arguments.length != 4){
        callback("find函数接收参数不正确",null);
        client.close();  //关闭要是clent关闭 而不是client.db
        return ;
    }
    __connectDB(function(err,db,client){
        let {PageCount=0,Page = 0} = args;
        //是一个数据库集合的数据 要each遍历之后 回调函数得到每一条数据
        var cursor =  db.collection(collectionName).find(json).limit(PageCount).skip(PageCount * Page).sort("time",-1);
        //遍历每一个数据
        cursor.each(function(err,doc){
            if(doc){
                results.push(doc);  //放入结果数组
            }else{
                callback(null,results);
                client.close();  //关闭要是clent关闭 而不是client.db
            }
        });
    })
};

//删除数据
exports.deleteData = function(collectionName,json,callback){
    __connectDB(function(err,db,client){
        db.collection(collectionName).deleteMany(json,function(err,result){
            callback(err,result);
            client.close();  //关闭要是clent关闭 而不是client.db
        });
    });
};
//更新数据
exports.updateData = function(collectionName,json1,json2,callback){
    __connectDB(function(err,db,client){
        db.collection(collectionName).updateMany(json1,json2,function(err,result){
            callback(err,result);
            client.close();  //关闭要是clent关闭 而不是client.db
        });
    });
}

