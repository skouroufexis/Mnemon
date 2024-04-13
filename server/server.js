const express = require('express');
const cors = require('cors');
const { json } = require('stream/consumers');
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/validateEmail', (req, res) => {
  
//validate email
  let email = (req.body.email);
  
  var validator = require("email-validator");
  
  if(validator.validate(email)){
    res.status(200).send({response:true})
  }
  else{
    res.status(400).send({response:'invalid email'})
  }
  


  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})