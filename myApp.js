require('dotenv').config()
let express = require('express');
let app = express();

console.log('Hello World')


app.use('/public', express.static(__dirname + '/public'));

app.use(function(req, res, next){
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

app.get('/now', (req, res, next)=>{
  req.time = new Date().toString()
  next()
}, (req, res)=>{
  res.send({time: req.time})
}) 

app.get('/:word/echo', (req, res)=>{
  const {word} = req.params
  res.send({echo: word})
})

app.get('/name', (req,res)=>{
  let firstName = req.query.first
  let lastName = req.query.last
  const name = firstName + ' ' + lastName
  res.send({name: name})
})

// console.log('MESSAGE_STYLE ', process.env.MESSAGE_STYLE)

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

app.get('/', (req, res) => {
  // res.send('Hello Express')
  const absolutePath = __dirname + '/views/index.html'
  console.log(absolutePath)
  res.sendFile(absolutePath)
})


module.exports = app