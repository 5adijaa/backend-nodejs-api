let express = require('express');
let app = express();

console.log('Hello World')


app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('Hello Express')
  const absolutePath = __dirname + '/views/index.html'
  console.log(absolutePath)
  res.sendFile(absolutePath)
})

module.exports = app