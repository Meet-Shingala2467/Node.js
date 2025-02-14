const  express = require('express');
const port = 9000;

const app = express();

app.set('view engine' , 'ejs');

app.use('/', require('./routes/indexRoute'));

app.listen(port , (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`Server is running on https://localhost:${port}`);
    
})

