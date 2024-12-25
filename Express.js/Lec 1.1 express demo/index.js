const express = require('express');
const app = express();
const port = 8080;

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    app.get('/', (req,res) => {
        res.send(`<h1>Hello, World!</h1>`);
        res.end();
    });

    console.log(`Server is running at http://localhost:${port}`);
});
