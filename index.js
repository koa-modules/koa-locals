
'use strict';

/**
 *  Module dependencies.
 */

var debug = require('debug')('koa:locals');

module.exports = function (app, opts) {

  // setup locals
  app.locals = Object.create(null);

  mixin(app.locals, opts || Object.create(null));

  debug('app.locals %j', app.locals);

  /**
   *  Lazily creates a locals.
   *
   *  @api public
   */
  app.context.__defineGetter__('locals', function () {
    if (this._locals) {
      return this._locals;
    }

    this._locals = mixin(Object.create(null), app.locals);

    debug('app.ctx.locals %j', this._locals);

    return this._locals;
  });

  app.response.__defineGetter__('locals', function () {
    return this.ctx.locals;
  });

  return app;
};

/**
 *  Merge object b with object a.
 */

function mixin(a, b) {
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};
