(function() {
  var root;

  root = window;

  root.Deftypes = function() {
    root.def = Deftypes.def;
    return root.T = Deftypes.T;
  };

}).call(this);

(function() {
  var option;

  option = {
    transparent: false
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = option;
  } else if (typeof window !== "undefined" && window !== null) {
    Deftypes.option = option;
  }

}).call(this);

(function() {
  var Any, ContextType, Func, Null, Nullable, T, Undefined, isBoolean, isFunction, isInstanceOf, isNumber, isString, toString,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  toString = function(val) {
    return Object.prototype.toString.call(val);
  };

  isString = function(val) {
    return toString(val) === '[object String]';
  };

  isNumber = function(val) {
    return toString(val) === '[object Number]' && !isNaN(val);
  };

  isBoolean = function(val) {
    return toString(val) === '[object Boolean]';
  };

  isFunction = function(val) {
    return toString(val) === '[object Function]';
  };

  isInstanceOf = function(type, val) {
    switch (type) {
      case String:
        return isString(val);
      case Number:
        return isNumber(val);
      case Boolean:
        return isBoolean(val);
      default:
        return val instanceof type;
    }
  };

  ContextType = (function() {
    function ContextType() {}

    return ContextType;

  })();

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

  })(ContextType);

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

  })(ContextType);

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

  })(ContextType);

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

  })(ContextType);

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

  })(ContextType);

  T = {
    ContextType: ContextType,
    Nullable: Nullable,
    nullable: Nullable(Any),
    Any: Any,
    any: Any(),
    Null: Null,
    "null": Null(),
    Undefined: Undefined,
    undefined: Undefined(),
    Func: Func,
    func: Func([[Any()]], Any())
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = T;
  } else if (typeof window !== "undefined" && window !== null) {
    Deftypes.T = T;
  }

}).call(this);

(function() {
  var T, every, isArray, isArrayLike, isBoolean, isDate, isFunction, isInstanceOf, isNull, isNullable, isNumber, isObject, isObjectLike, isRegExp, isString, isType, isUndefined, option, toString, typecheck;

  if (typeof module !== "undefined" && module !== null) {
    T = require('./types');
    option = require('./option');
  } else if (typeof window !== "undefined" && window !== null) {
    T = Deftypes.T, option = Deftypes.option;
  }

  toString = function(val) {
    return Object.prototype.toString.call(val);
  };

  isString = function(val) {
    return toString(val) === '[object String]';
  };

  isNumber = function(val) {
    return toString(val) === '[object Number]' && !isNaN(val);
  };

  isBoolean = function(val) {
    return toString(val) === '[object Boolean]';
  };

  isFunction = function(val) {
    return toString(val) === '[object Function]';
  };

  isArray = function(val) {
    return toString(val) === '[object Array]';
  };

  isArrayLike = function(val) {
    return isArray(val) || (val && typeof val === 'object' && isNumber(val.length));
  };

  isObject = function(val) {
    return toString(val) === '[object Object]';
  };

  isObjectLike = function(val) {
    return val !== null && typeof val === 'object';
  };

  isRegExp = function(val) {
    return toString(val) === '[object RegExp]';
  };

  isDate = function(val) {
    return toString(val) === '[object Date]';
  };

  isNull = function(val) {
    return val === null;
  };

  isUndefined = function(val) {
    return val === void 0;
  };

  isNullable = function(val) {
    return val instanceof T.Nullable;
  };

  isInstanceOf = function(type, val) {
    switch (type) {
      case String:
        return isString(val);
      case Number:
        return isNumber(val);
      case Boolean:
        return isBoolean(val);
      default:
        return val instanceof type;
    }
  };

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

  isType = function(type, val) {
    var child_param, child_type, results;
    if (option.transparent) {
      return true;
    }
    if (isArray(type)) {
      child_type = type[0];
      return every(val, function(item) {
        return isType(child_type, item);
      });
    } else if (type instanceof T.ContextType) {
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
          _results.push(isType(child_type, val[child_param]));
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

  typecheck = {
    toString: toString,
    isString: isString,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isFunction: isFunction,
    isArray: isArray,
    isArrayLike: isArrayLike,
    isObject: isObject,
    isObjectLike: isObjectLike,
    isRegExp: isRegExp,
    isDate: isDate,
    isNull: isNull,
    isUndefined: isUndefined,
    isType: isType
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = typecheck;
  } else if (typeof window !== "undefined" && window !== null) {
    Deftypes.typecheck = typecheck;
  }

}).call(this);

(function() {
  var T, def, option, typecheck, wrapFuncWithTypeCheck,
    __slice = [].slice;

  if (typeof module !== "undefined" && module !== null) {
    T = require('./types');
    typecheck = require('./typecheck');
    option = require('./option');
  } else if (typeof window !== "undefined" && window !== null) {
    T = Deftypes.T, typecheck = Deftypes.typecheck, option = Deftypes.option;
  }

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

  def = function(type, val, mod_func) {
    if (mod_func == null) {
      mod_func = null;
    }
    if (option.transparent) {
      if (mod_func != null) {
        mod_func.call(val);
      }
      return val;
    }
    if (typecheck.isFunction(val)) {
      return wrapFuncWithTypeCheck(type, val);
    }
    if (typecheck.isFunction(mod_func)) {
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

  if (typeof module !== "undefined" && module !== null) {
    module.exports = def;
  } else if (typeof window !== "undefined" && window !== null) {
    Deftypes.def = def;
  }

}).call(this);

(function() {
  var T, def;

  if (typeof module !== "undefined" && module !== null) {
    T = require("./types");
    def = require("./def");
    module.exports = {
      T: require("./types"),
      def: require("./def"),
      defun: function(args, return_type, f) {
        return def(T.Func(args, return_type), f);
      },
      option: require("./option")
    };
  } else if (typeof window !== "undefined" && window !== null) {
    T = Deftypes.T, def = Deftypes.def;
    Deftypes.defun = function(args, return_type, f) {
      return def(T.Func(args, return_type), f);
    };
  }

}).call(this);
