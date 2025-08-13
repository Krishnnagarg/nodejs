import { createServer } from "http";
import { readFile } from "fs/promises";
import path from "path";

const PORT = 3002;

const serveFile = async (resp, filepath, contentType) => {
  try {
    const data = await readFile(filepath);
    resp.writeHead(200, { "Content-Type": contentType });
    resp.end(data);
  } catch (error) {
    resp.writeHead(404, { "Content-Type": contentType });
    resp.end("404 page not found");
  }
};

const server = createServer(async (req, resp) => {
  console.log(req.url);

  if (req.method === "GET") {
    if (req.url === "/") {
      return serveFile(resp, path.join("public", "index.html"), "text.html");
    } else if (req.method === "GET") {
      if (req.url === "/style.css") {
        return serveFile(resp, path.join("public", "style.css"), "text/css ");
      }
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
