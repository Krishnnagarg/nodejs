 const fs = require("fs");
 const path = require("path");

const fileName = "fsPromises.txt";
const filePath = path.join(__dirname,fileName);

// const file = __dirname;

// fs.promises
// .readdir(file)
// .then((data) => console.log(data))
// .catch((err) => console.error(err));  

// const filePath1 = __dirname;

// fs.promises
// .readdir(filePath1)
// .then((data) => console.log(data))
// .catch((err) => console.error(err));

//1. fs.promises.writeFile().then().catch();

fs.promises.writeFile(filePath,"This is a Promises Data","utf-8")
.then(console.log("File Created Successfully!"))
.catch((err) => console.error(err));

//2. fs.promises.readFile().then().catch();

fs.promises.readFile(filePath,"utf-8")
.then((data) => console.log("In File Data:",data))
.catch((err) => console.error(err));

//3. fs.promises.appendFile().then().catch();

// fs.promises.appendFile(filePath,"\nthis is updated data","utf-8")
// .then(console.log("successfully appended"))
// .catch((err) => console.error(err));


//4 fs.promises.unlink().then(),catch();

// fs.promises.unlink(filePath)
// .then(console.log("file deleted successfully"))
// .catch((err) => console.error("Error Deleting File :",err));





