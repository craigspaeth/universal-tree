const Baobab = require('baobab')

const isServer = typeof window === 'undefined'

module.exports = (state) => {
  // Make sure to turn off persistent features in the server for performance
  const tree = new Baobab(state, (isServer
    ? { asynchronous: false, persistent: false, immutable: false }
    : {})
  )

  // On the server we clear out the tree on every next tick so as to not leak
  // data between requests. (TODO: Understand perf. implications)
  if (isServer) {
    const json = JSON.stringify(state)
    setInterval(() => tree.set(JSON.parse(json)))
  }

  return tree
}
