(function() {
  var root;

  root = window;

  root.Deftypes = function() {
    root.def = Deftypes.define.def;
    root.defun = Deftypes.define.defun;
    root.T = Deftypes.Types;
    return root.Types = Deftypes.Types;
  };

}).call(this);

(function() {
  var g;

  g = (typeof module !== "undefined" && module !== null ? exports : Deftypes).option = {};

  g.option = {
    transparent: false
  };

}).call(this);

(function() {
  var g;

  g = (typeof module !== "undefined" && module !== null ? exports : Deftypes).primitive = {};

  g.toString = function(val) {
    return Object.prototype.toString.call(val);
  };

  g.isString = function(val) {
    return g.toString(val) === '[object String]';
  };

  g.isNumber = function(val) {
    return g.toString(val) === '[object Number]' && !isNaN(val);
  };

  g.isBoolean = function(val) {
    return g.toString(val) === '[object Boolean]';
  };

  g.isFunction = function(val) {
    return g.toString(val) === '[object Function]';
  };

  g.isArray = function(val) {
    return g.toString(val) === '[object Array]';
  };

  g.isArrayLike = function(val) {
    return g.isArray(val) || (val && typeof val === 'object' && g.isNumber(val.length));
  };

  g.isObject = function(val) {
    return g.toString(val) === '[object Object]';
  };

  g.isObjectLike = function(val) {
    return val !== null && typeof val === 'object';
  };

  g.isRegExp = function(val) {
    return g.toString(val) === '[object RegExp]';
  };

  g.isDate = function(val) {
    return g.toString(val) === '[object Date]';
  };

  g.isNull = function(val) {
    return val === null;
  };

  g.isUndefined = function(val) {
    return val === void 0;
  };

  g.isInstanceOf = function(type, val) {
    switch (type) {
      case String:
        return g.isString(val);
      case Number:
        return g.isNumber(val);
      case Boolean:
        return g.isBoolean(val);
      default:
        return val instanceof type;
    }
  };

}).call(this);

(function() {
  var g;

  g = (typeof module !== "undefined" && module !== null ? exports : Deftypes).context = {};

  g.Context = (function() {
    function Context() {}

    return Context;

  })();

}).call(this);

(function() {
  var Any, Context, Func, Hash, Null, Nullable, Types, Undefined, isBoolean, isFunction, isInstanceOf, isNumber, isString, toString, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = (typeof module !== "undefined" && module !== null ? require('./primitive') : Deftypes).primitive, toString = _ref.toString, isString = _ref.isString, isNumber = _ref.isNumber, isBoolean = _ref.isBoolean, isFunction = _ref.isFunction, isInstanceOf = _ref.isInstanceOf;

  Context = (typeof module !== "undefined" && module !== null ? require('./context') : Deftypes).context.Context;

  Any = (function(_super) {
    __extends(Any, _super);

    function Any() {
      if (!(this instanceof Any)) {
        return new Any;
      }
    }

    Any.prototype.validate = function(val) {
      return true;
    };

    return Any;

  })(Context);

  Nullable = (function(_super) {
    __extends(Nullable, _super);

    function Nullable(type) {
      if (!(this instanceof Nullable)) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(Nullable, arguments, function(){});
      }
      this.type = type;
    }

    Nullable.prototype.validate = function(val) {
      return val === null || isInstanceOf(this.type, val);
    };

    return Nullable;

  })(Context);

  Undefined = (function(_super) {
    __extends(Undefined, _super);

    function Undefined() {
      if (!(this instanceof Undefined)) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(Undefined, arguments, function(){});
      }
    }

    Undefined.prototype.validate = function(val) {
      return val === void 0;
    };

    return Undefined;

  })(Context);

  Null = (function(_super) {
    __extends(Null, _super);

    function Null() {
      if (!(this instanceof Null)) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(Null, arguments, function(){});
      }
    }

    Null.prototype.validate = function(val) {
      return val === null;
    };

    return Null;

  })(Context);

  Func = (function(_super) {
    __extends(Func, _super);

    function Func(args, return_type) {
      if (!(this instanceof Func)) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(Func, arguments, function(){});
      }
      this.args = args;
      this.return_type = return_type;
    }

    Func.prototype.validate = function(val) {
      return isFunction(val && this.args.length === val.length);
    };

    return Func;

  })(Context);

  Hash = (function(_super) {
    __extends(Hash, _super);

    function Hash(key_type, value_type) {
      if (!(this instanceof Hash)) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(Hash, arguments, function(){});
      }
      this.key_type = key_type;
      this.value_type = value_type;
    }

    Hash.prototype.validate = function(val) {
      var key;
      for (key in val) {
        val = val[key];
        if (key instanceof key_type) {
          if (val instanceof val_type) {
            continue;
          }
        }
        return false;
      }
      return true;
    };

    return Hash;

  })(Context);

  Types = {
    Nullable: Nullable,
    nullable: Nullable(Any),
    Any: Any,
    any: Any(),
    Null: Null,
    "null": Null(),
    Undefined: Undefined,
    undefined: Undefined(),
    Func: Func,
    func: Func([[Any()]], Any()),
    Hash: Hash
  };

  if (typeof module !== "undefined" && module !== null) {
    exports.Types = Types;
  } else if (typeof window !== "undefined" && window !== null) {
    Deftypes.Types = Types;
  }

}).call(this);

(function() {
  var Context, Types, every, g, isArray, isInstanceOf, isObject, _ref;

  g = (typeof module !== "undefined" && module !== null ? exports : Deftypes).typecheck = {};

  Types = (typeof module !== "undefined" && module !== null ? require('./types') : Deftypes).Types;

  Context = (typeof module !== "undefined" && module !== null ? require('./context') : Deftypes).context.Context;

  _ref = (typeof module !== "undefined" && module !== null ? require('./primitive') : Deftypes).primitive, isArray = _ref.isArray, isObject = _ref.isObject, isInstanceOf = _ref.isInstanceOf;

  every = function(arr, f) {
    var item, _i, _len;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      item = arr[_i];
      if (!f(item)) {
        return false;
      }
    }
    return true;
  };

  g.isType = function(type, val) {
    var child_param, child_type, results;
    if (isArray(type)) {
      child_type = type[0];
      return every(val, function(item) {
        return g.isType(child_type, item);
      });
    } else if (type instanceof Context) {
      return type.validate(val);
    }
    if (type === Object) {
      return true;
    } else if (isObject(type)) {
      results = (function() {
        var _results;
        _results = [];
        for (child_param in type) {
          child_type = type[child_param];
          _results.push(g.isType(child_type, val[child_param]));
        }
        return _results;
      })();
      return every(results, function(i) {
        return i === true;
      });
    } else if (isInstanceOf(type, val)) {
      return true;
    }
    throw 'irregular type';
  };

}).call(this);

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

(function() {
  if (typeof module !== "undefined" && module !== null) {
    module.exports = {
      T: require("./types"),
      Types: require("./types"),
      def: require("./define").difine.def,
      defun: require("./define").difine.defun,
      option: require("./option").option
    };
  }

}).call(this);
