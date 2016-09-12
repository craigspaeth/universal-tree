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

  // On the client we will try to keep the same tree state globally.
  // This helps with hot reloading, by instead of regenerating a fresh tree we
  // perist the state from old tree to new. We'll almost certainly want to make
  // this a configurable option instead of a default if this project proves
  // successful.
  } else {
    if (window.__UniversalTree__) tree.set(window.__UniversalTree__.get())
    window.__UniversalTree__ = tree
  }

  return tree
}
