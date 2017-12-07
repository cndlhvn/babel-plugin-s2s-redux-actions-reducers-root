# babel-plugin-s2s-redux-actions-reducers-root

> generate redux actions reducers root

Here is the sample repository using this s2s plugin.
[https://github.com/cndlhvn/s2s-redux-actions-sample](https://github.com/cndlhvn/s2s-redux-actions-sample)

## Install

```
$ yarn add --dev babel-plugin-s2s-redux-actions-reducers-root
```

## Install babel handler
You need a handler compatible with syntax object rest spread.

```
$ yarn add --dev s2s-handler-babel-object-rest-spread
```
This handler can transform a code containing object rest spread like this.

```js
[action_name]: () => ({
  ...state
})
```

## s2s.config.js

s2s-redux-actions-reducers-root plugin watch the `src/reducers/(?!.*index).*\.js` files

```js
const handlerBabelSpread = require('s2s-handler-babel-object-rest-spread').default

module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /src\/reducers\/(?!.*index).*\.js/,
      output: "index.js",
      handler: handlerBabelSpread,
      plugin: ['s2s-redux-actions-reducers-root',
      { input: 'src/reducers/*.js', output: "src/reducers/index.js" }]
    }
  ]
}
```

### For React Router Redux
If you use react-router-redux, pleaser pass a router option.
```js
plugin: ['s2s-redux-actions-reducers-root',
{ input: 'src/reducers/*.js', output: "src/reducers/index.js", router: true }]
```

## Start s2s

Start the s2s with yarn command

`yarn run s2s`

## Usage

#### When create reducers file

When you create a `src/reducers/*.js`, this plugin inserts reducers into index.js automatically.

For example you create a `src/reducers/user.js`. It is inserted into index.js

#### Out:

```js
import { combineReducers } from "redux";
import user from "./user";
export default combineReducers({
  user
});
```
#### Case router option:
```js
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import user from "./user";
export default combineReducers({
  user,
  routing: routerReducer
});
```

# Test

This plugin has two type of test files. \
First is babel plugin main test file named `test.js` on root direcotry. \
Next is `test/*.js` that is test target files.

Run this command.

` npm run test`

Test will run and you can see what happen.
