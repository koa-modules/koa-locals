# koa-locals [![Build Status](https://travis-ci.org/koa-modules/koa-locals.svg)](https://travis-ci.org/koa-modules/koa-locals)

Supports application local variables for templates render in application.

__Please use `this.state` instead of `this.locals`, Koa added `this.state` start from `0.14.0`__.

  [![NPM](https://nodei.co/npm/koa-locals.png?downloads=true)](https://nodei.co/npm/koa-locals/)

### Usage

#### Install

```
npm install koa-locals
```

#### API

```js
require('koa-locals')(app, locals);
```

##### this.locals or this.response.locals
Lazily creates a locals object on every request.
```js
// get locals
var locals = this.locals;

// set locals
this.locals.app = 'github';
this.locals = {};
```

#### Example

```js
var koa = require('koa');
var locals = require('../');
var csrf = require('koa-csrf');
var render = require('koa-swig');
var session = require('koa-session');
var app = koa();

app.keys = ['key'];

locals(app, {
  name: 'koa app'
});

csrf(app);
app.use(session())
app.use(function *(next) {
  this.locals._csrf = this.csrf;
  yield next;
});

render(app, {
  root: __dirname,
  ext: 'html',
  locals: {
    language: 'zh-cn'
  }
});

app.use(function *() {
  yield this.render('index', {
    username: 'fundon'
  });
});

app.listen(2333);
```


### License

MIT
