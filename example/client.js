const state = require('./state')
const h2 = document.body

state.on('update', () => {
  document.getElementById('h2').innerHTML = state.get('colors').join(', ')
})

setInterval(() => state.select('colors').push('black'), 1000)
