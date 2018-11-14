var crypto = require("crypto");
module.exports = function(mima){
    //每次都要新增个crypto.createHash("md5")
    var md5 = crypto.createHash("md5"); 
    return md5.update(mima).digest("base64");
}