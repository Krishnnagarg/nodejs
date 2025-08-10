const fs = require('fs');
const path = require('path');

const fileName = "fsAsync.txt";
const filePath = path.join(__dirname,fileName);

fs.writeFile(filePath,"This is Async File","utf-8",(err) => {
    if(err) console.log(err);
    else console.log("File Has been Saved")
});


fs.readFile(filePath,"utf-8",(err,data) => {
    if(err) console.log(err);
    else console.log(data);
});


fs.appendFile(filePath,"\nThis is Async append File","utf-8",(err) => {
    if(err) console.log(err);
    else console.log("file has been updated")
});


fs.unlink(filePath,(err) => {
    if(err) console.log(err);
    else console.log("File Has been deleted")
});


