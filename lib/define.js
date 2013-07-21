(function() {
  var Types, g, isFunction, option, typecheck, wrapFuncWithTypeCheck,
    __slice = [].slice;

  if (typeof module !== "undefined" && module !== null) {
    Types = require('./types').Types;
    typecheck = require('./typecheck').typecheck;
    option = require('./option').option;
  } else if (typeof window !== "undefined" && window !== null) {
    Types = Deftypes.Types, typecheck = Deftypes.typecheck, option = Deftypes.option;
  }

  isFunction = (typeof module !== "undefined" && module !== null ? require('./primitive') : Deftypes).primitive.isFunction;

  g = (typeof module !== "undefined" && module !== null ? exports : Deftypes).define = {};

  wrapFuncWithTypeCheck = function(Type, func, self) {
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
        if (!typecheck.isType(ArgType, args[i])) {
          throw new Error("Argument Error");
        }
      }
      ret = func.apply(self, args);
      if (!typecheck.isType(Type.return_type, ret)) {
        throw new Error("Return Type Error");
      }
      return ret;
    };
  };

  g.def = function(type, val, mod_func) {
    if (mod_func == null) {
      mod_func = null;
    }
    if (option.transparent) {
      if (mod_func != null) {
        mod_func.call(val);
      }
      return val;
    }
    if (isFunction(val)) {
      return wrapFuncWithTypeCheck(type, val);
    }
    if (isFunction(mod_func)) {
      if (!typecheck.isType(type, val)) {
        throw new Error("invalid object before apply function");
      }
      mod_func.call(val);
    }
    if (!typecheck.isType(type, val)) {
      throw new Error("invalid val type");
    }
    return val;
  };

  g.defun = function(args, return_type, f) {
    return g.def(Types.Func(args, return_type), f);
  };

}).call(this);
