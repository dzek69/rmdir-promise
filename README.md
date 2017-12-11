# rmdir-promise

Promisified `rmdir` npm module for cleaner code.

## Features

- enables `await rmdir("dir");` syntax
- includes `rmdir.silent` method that ignores specific error where directory does not exist
- es6+ first approach, with es5 transpiled version to be found inside `dist` folder (for node 4.0.0) *

\* - transpiling kills JS engines optimizations, makes codes longer and tree shaking harder to do and/or slower and yes,
bundling server code makes sense too :)

## Installation and usage

1. Install it: `yarn add rmdir-promise` or `npm install rmdir-promise --save`
1. Use it like that:
```javascript
const rmdir = require("rmdir-promise");

rmdir("temp").then(() => {
    console.log("Temporary directory removed!");
}, () => {
    console.error("We can't remove `temp`");
});

// or for silent version and async syntax:

const { silent: rmdir } = require("rmdir-promise");

(async () => {
    try {
        await rmdir("temp");
    }
    catch(e) {
        console.error("We can't remove `temp`");
    }
    console.log("Temporary directory removed!");
})();
```

## Unit tests

1. Clone repo
1. Run `yarn test` or `npm test`

## To be done

1. Replace `jsdoc` docs with something better

## License

MIT
