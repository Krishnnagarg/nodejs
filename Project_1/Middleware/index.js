import fs from "fs";

function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
      (err, data) => {
        next();
      }
    );
  };
}

export {logReqRes};
