# universal-tree

**NOTE: This is a WIP and not production ready yet**

Tiny wrapper around [Baobab](https://github.com/Yomguithereal/baobab) for an OOTB universal state tree.


## Example

Create your universal tree

````javascript
const tree = require('universal-tree')

const state = module.exports = tree({
  colors: ['yellow', 'purple'],
  name: 'Glorious colors'
})
````

Import and just use it on the client

````javascript
const state = require('./state')

state.on('update', () => render())
````

And import and just use it on the server

````javascript
const state = require('./state')

app.locals.state = state

app.get('/article', (req, res) => {
  Article.find((err, article) => {

    // IMPORTANT: Make sure to only update your state all at once, right before rendering
    state.set({ title: article.title })
    res.render('article')
  })
})
````

## Wait, WAT? Isn't that going to leak state across requests?

Here in lies the big exprimental gamble. We're clearing the state tree out on every event loop tick when used on the server. Since Node's HTTP servers don't handle requests synchronously, we're hoping that's enough to ensure nothing weird happens. We're also turning off Baobab's persistence, immutability, and all that other client-side-useful stuff in hopes it's enough to make performance not dramatically suffer with this approach.

## Caveats

* Must use only use JSON primative data in tree for clone perf
* Only update your state all at once, right before rendering

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `npm test`.

## License

MIT
