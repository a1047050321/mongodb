var crypto = require("crypto");

var md5 = crypto.createHash("md5"); 



var password = md5.update('hahahah').digest("base64");  
console.log(password);
