const http = require('http');

const port = 9000;

const server = http.createServer((req, res) => {
    res.write(`<h1>jai swaminarayan</h1>`); 
    res.end();
    });
server.listen(port,(err) =>{
    if(!err){
        console.log(`hello world ${port}`);
        
    }
})