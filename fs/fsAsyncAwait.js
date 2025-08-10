const fs = require("fs");
const path = require("path");

const fileName = "fsAsyncAwait.txt";
const filePath = path.join(__dirname, fileName);

const filePath1 = __dirname;

// fs.promises
// .readdir(filePath1)
// .then((data) => console.log(data))
// .catch((err) => console.error(err));

// const readFolder = async() => {
//     try {
//       const data = await fs.promises.readdir(filePath1);
//       console.log(data);
//     } catch(err) {
//         console.error(err);
//     }
// };
// readFolder();

const writeFileExample = async () => {
    try{
       const data = await fs.promises.writeFile(filePath,"This is Async Await File","utf-8");
       console.log(data);

    }catch(err) {
        console.error(err);
    }
};
writeFileExample();

const readFileExample = async () => {
    try{
       const data = await fs.promises.readFile(filePath,"utf-8");
       console.log(data);

    }catch(err) {
        console.error(err);
    }
};
readFileExample();

// const appendFileExample = async () => {
//     try{
//        const data = await fs.promises.appendFile(filePath,"\nThis is updated example","utf-8");
//        console.log(data);

//     }catch(err) {
//         console.error(err);
//     }
// };

// appendFileExample();

// const deleteFileExample = async () => {
//   try {
//     await fs.promises.unlink(filePath);
//     console.log("File deleted successfully");
//   } catch (err) {
//     console.error(err);
//   }
// };
// deleteFileExample();
