const express = require('express');
const app = express();
const port = 9000;
const cors = require('cors');

app.use(cors());

app.get('/users', (req, res) => {
 return res.status(200).json({
    success:true,
    message:"user successfully fetch",
    users:[
      {id: 1, name:"kohli" , jno :18 },
      {id: 2, name:"Rohit" , jno :45 },
      {id: 3, name:"KL Rahul" , jno :1 },
      {id: 4, name:"MS D" , jno :7 }
    ]
 })
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`Server is running on http://localhost:${port}`);
});