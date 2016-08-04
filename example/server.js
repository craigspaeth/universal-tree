const express = require('express')
const app = express()
const state = require('./state')

app.set('views', __dirname)
app.set('view engine', 'jade')
app.locals.state = state

app.get('/', (req, res) => {
  state.select('colors').push('blue') // This won't be available by render
  setTimeout(() => {
    state.select('colors').push('red')
    res.render('index')
  }, 100)
})

app.use(express.static(__dirname))
app.listen(3000, () => console.log('Example app listening on port 3000!'))
