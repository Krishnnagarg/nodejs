const fs = require('fs');
const path = require('path');


const fileName = "test.txt";
const filePath = path.join(__dirname,fileName);

//1. fs.writeFileSync(filename,"jo file m likna h","utf-8")
//this is used for write data in file 

const writeFile = fs.writeFileSync(filePath,"This is initial Data","utf-8");
console.log(writeFile);

//2. fs.readFileSync(filepath,options)

const readFile = fs.readFileSync(filePath,"utf-8");
console.log(readFile);

//3.fs.appendfilesync():Appends Data to file.if file does'nt exist it create the file
//syntax: fs.appendFileSync(filePath,data,options)
//this is used for add data

const appendFile = fs.appendFileSync(filePath,"\nThis is append data","utf-8");
console.log(appendFile);

//4. Delete File fs.unlinkSync() : Deletes a file by its path.
//syntax : fs.unlinkSync(filePath);

const fileDelete = fs.unlinkSync(filePath);
console.log(fileDelete);

//5. Rename File syntax: fs.renameSync(oldPath,newPath)

const newUpdatedFileName = "update.txt";
const newFilePath = path.join(__dirname, newUpdatedFileName);
const renameFile = fs.renameSync(filePath, newFilePath);
console.log(renameFile);
