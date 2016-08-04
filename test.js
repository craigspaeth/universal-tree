/* eslint-env mocha */
const tree = require('./')

describe('on the server', () => {
  it('foos', () => {
    console.log(tree)
  })
})

describe('on the client', () => {
  beforeEach(() => {
    global.window = {}
  })

  afterEach(() => {
    delete global.window
  })

  it('bats', () => {
    console.log(tree)
  })
})
