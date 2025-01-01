const { render } = require('ejs');
const express = require('express');
const port = 5000;
const web = express(); 

web.set("view engine", "ejs"); 
web.use(express.urlencoded()); 

web.get("/", (req, res) => {
    return res.render("add");
});

web.get("/view", (req, res) => {
    return res.render("view");
});

web.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is started on http://localhost:${port}`); 
});
