(function() {
  var Types, g, isFunction, option, typecheck, wrap_func_with_typecheck,
    __slice = [].slice;

  Types = (typeof module !== "undefined" && module !== null ? require('./types') : Deftypes).Types;

  typecheck = (typeof module !== "undefined" && module !== null ? require('./typecheck') : Deftypes).typecheck;

  option = (typeof module !== "undefined" && module !== null ? require('./option') : Deftypes).option;

  isFunction = (typeof module !== "undefined" && module !== null ? require('./primitive') : Deftypes).primitive.isFunction;

  g = (typeof module !== "undefined" && module !== null ? exports : Deftypes).define = {};

  wrap_func_with_typecheck = function(Type, func, self) {
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
      if (arguments.length === 2 && isFunction(val)) {
        val = val();
      }
      return val;
    }
    if (isFunction(val) && mod_func === null) {
      return wrap_func_with_typecheck(type, val);
    }
    if (isFunction(mod_func)) {
      if (!typecheck.isType(type, val)) {
        throw new Error("invalid object before apply function");
      }
      mod_func.call(val);
    } else if (isFunction(val) && val.length === 0) {
      val = val();
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
