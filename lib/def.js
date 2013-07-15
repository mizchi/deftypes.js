// Generated by CoffeeScript 1.6.3
(function() {
  var T, def, option, typecheck, wrapFunction,
    __slice = [].slice;

  T = require('./t');

  typecheck = require('./typecheck');

  option = require('./option');

  wrapFunction = function(Type, f, self) {
    if (self == null) {
      self = null;
    }
    return function() {
      var ArgType, args, i, ret, _i, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (args.length !== Type.args.length) {
        throw new Error("mismatch: Arguments length");
      }
      for (i = _i = 0, _ref = Type.args.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        ArgType = Type.args[i];
        if (!typecheck.isStruct(ArgType, args[i])) {
          throw new Error("Argument Error");
        }
      }
      ret = f.apply(self, args);
      if (!typecheck.isStruct(Type.returns, ret)) {
        throw new Error("Return Type Error");
      }
      return ret;
    };
  };

  def = function(Class, instance) {
    var Type, item;
    if (option.transparent) {
      return instance;
    }
    Type = Class;
    if (typecheck.isFunction(instance)) {
      return wrapFunction(Type, instance);
    }
    if (typecheck.isArray(Class)) {
      Class = Class[0];
      return (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = instance.length; _i < _len; _i++) {
          item = instance[_i];
          _results.push((typeof Class["new"] === "function" ? Class["new"](item) : void 0) || item);
        }
        return _results;
      })();
    } else if (typecheck.isStruct(Type, instance)) {
      return (typeof Class["new"] === "function" ? Class["new"](instance) : void 0) || instance;
    } else {
      throw new Error("instance: " + instance + "\ntype: " + Type);
    }
  };

  module.exports = def;

}).call(this);