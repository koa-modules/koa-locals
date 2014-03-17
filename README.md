# koa-locals

Supports application local variables for templates render in application.


### Usage

#### Install

```
npm install koa-locals
```

#### API

```js
require('koa-locals')(app, locals);
```

##### this.locals
Lazily creates a locals object on every request.
```js
# get locals
var locals = ctx.locals;

# set locals
ctx.locals.app = 'github';
ctx.locals = {};
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

  
##### `ctx.response.locals`

### License

MIT
