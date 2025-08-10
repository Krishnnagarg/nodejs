//in terminal ctrl + c than run after changes 
const http = require('http');

//web server
const server = http.createServer((req,resp) => {
    if(req.url === "/") {
        resp.setHeader("Content-Type" ,"text/plain");
        resp.write("Hello Krishna garg ");
        resp.end();//send data on server 
    }

    if(req.url === "/source-code") {
        resp.setHeader("Content-Type" ,"text/html"); 
        resp.write("hello server ");
        resp.end();//send data on server
    }

    if(req.url === "/contacts") {
        resp.setHeader("Content-Type" ,"text/html"); 
        resp.write(" <h1> hello contact this is a contact page Krishna Garg Vashu Garg Muskan Deswal Mahak Tannu  Archit </h1> ");
        resp.end();//send data on server
    }
});

const PORT =3000;
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`); //localhost 3000 search on google
});