const os = require("os");   

//1.Get the OS platform & User Info 
//Return the operating system platform (e.g.,'win32' , 'linus')

console.log("platform:" , os.platform);
console.log("user:", os.userInfo);

//2. Get the OS CPU architecture 
//Return the architecture of CPU (e.g, 'x64' ,'arm,)    

console.log("CPU architecture :" ,os.arch());

//3. Get Free System Memory 
//Return the amount of free system memory in bytes 
console.log("free memory :" , os.freemem() ,"bytes");

//4. Get Total System Memory
//Return the Total amount of system memory in bytes 

console.log("Total Memory:",os.totalmem(),"Bytes");

//5. Get Operating System name
console.log("operating System :" , os.type());

console.log("Temporary Directory:",os.tmpdir);