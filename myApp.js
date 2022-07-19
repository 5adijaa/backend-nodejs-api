require('dotenv').config()
let express = require('express');
let app = express();

console.log('Hello World')


app.use('/public', express.static(__dirname + '/public'));

app.use(function(req, res, next){
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})
app.get('/', (req, res) => {
  // res.send('Hello Express')
  const absolutePath = __dirname + '/views/index.html'
  console.log(absolutePath)
  res.sendFile(absolutePath)
})

console.log('MESSAGE_STYLE ', process.env.MESSAGE_STYLE)

app.get('/json', (req, res)=>{
  const response = process.env.MESSAGE_STYLE === 'uppercase' ? 'Hello json'.toUpperCase() : 'Hello json'
  // let response 
  // if(process.env.MESSAGE_STYLE === 'uppercase'){
  //   response = 'Hello json'.toUpperCase()
  // }else{
  //   response = 'Hello json'
  // }
  res.send({'message': response})
})


module.exports = app