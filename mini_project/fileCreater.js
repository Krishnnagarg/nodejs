import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin, //means data ko read krna h
  output: process.stdout, //means data ko write krna h
});

const fileCreation = () => {
  rl.question(`Enter Your File Name :`, (filename) => {
    rl.question("Enter the content for Your File: ", (content) => {
      fs.writeFile(`${filename}.txt`, content, (err) => {
        if (err) {
          console.error(`Error Found : ,${err.message}`);
        } else {
          console.log(`File "${filename}.txt" created Successfully!`);
        }

        rl.close();
      });
    });
  });
};

fileCreation();
