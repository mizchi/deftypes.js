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

  g.isPrimitiveOf = function(type, val) {
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

  g.isPrimitive = function(val) {
    var _ref;
    return (val === (_ref = Number in val) && _ref === String) || val === Boolean;
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
  var Any, Context, Float, Func, Hash, Int, None, Null, Nullable, Satisfied, Types, Undefined, isBoolean, isFunction, isNumber, isObject, isPrimitiveOf, isString, toString, typecheck, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = (typeof module !== "undefined" && module !== null ? require('./primitive') : Deftypes).primitive, toString = _ref.toString, isString = _ref.isString, isNumber = _ref.isNumber, isBoolean = _ref.isBoolean, isFunction = _ref.isFunction, isPrimitiveOf = _ref.isPrimitiveOf, isObject = _ref.isObject;

  typecheck = (typeof module !== "undefined" && module !== null ? require('./typecheck') : Deftypes).typecheck;

  Context = (typeof module !== "undefined" && module !== null ? require('./context') : Deftypes).context.Context;

  Any = (function(_super) {
    __extends(Any, _super);

    function Any() {
      _ref1 = Any.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Any.__direct__ = true;

    Any.validate = function(val) {
      return true;
    };

    return Any;

  })(Context);

  Int = (function(_super) {
    __extends(Int, _super);

    function Int() {
      _ref2 = Int.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Int.__direct__ = true;

    Int.validate = function(val) {
      return isNumber(val) && parseInt(val) === val;
    };

    return Int;

  })(Context);

  Float = (function(_super) {
    __extends(Float, _super);

    function Float() {
      _ref3 = Float.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Float.__direct__ = true;

    Float.validate = function(val) {
      return isNumber(val);
    };

    return Float;

  })(Context);

  Undefined = (function(_super) {
    __extends(Undefined, _super);

    function Undefined() {
      _ref4 = Undefined.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    Undefined.__direct__ = true;

    Undefined.validate = function(val) {
      return val === void 0;
    };

    return Undefined;

  })(Context);

  Null = (function(_super) {
    __extends(Null, _super);

    function Null() {
      _ref5 = Null.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    Null.__direct__ = true;

    Null.validate = function(val) {
      return val === null;
    };

    return Null;

  })(Context);

  None = (function(_super) {
    __extends(None, _super);

    function None() {
      _ref6 = None.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    None.__direct__ = true;

    None.validate = function(val) {
      return val === null || val === void 0;
    };

    return None;

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
      return val === null || isPrimitiveOf(this.type, val);
    };

    return Nullable;

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

    Hash.prototype.validate = function(hash) {
      var key, val;
      if (!isObject(hash)) {
        return false;
      }
      for (key in hash) {
        val = hash[key];
        if (typecheck.isType(this.key_type, key) && typecheck.isType(this.value_type, val)) {
          continue;
        }
        return false;
      }
      return true;
    };

    return Hash;

  })(Context);

  Satisfied = (function(_super) {
    __extends(Satisfied, _super);

    function Satisfied(type) {
      if (!(this instanceof Satisfied)) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(Satisfied, arguments, function(){});
      }
      this.type = type;
    }

    Satisfied.prototype.validate = function(hash) {
      var key, val;
      if (!typecheck.isType(this.type, hash)) {
        return false;
      }
      for (key in hash) {
        val = hash[key];
        if (this.type[key] == null) {
          return false;
        }
      }
      return true;
    };

    return Satisfied;

  })(Context);

  Types = {
    Any: Any,
    Int: Int,
    Float: Float,
    None: None,
    Nullable: Nullable,
    Null: Null,
    Undefined: Undefined,
    Func: Func,
    Hash: Hash,
    Satisfied: Satisfied
  };

  if (typeof module !== "undefined" && module !== null) {
    exports.Types = Types;
  } else if (typeof window !== "undefined" && window !== null) {
    Deftypes.Types = Types;
  }

}).call(this);

(function() {
  var Context, every, g, isArray, isObject, isPrimitiveOf, _ref;

  g = (typeof module !== "undefined" && module !== null ? exports : Deftypes).typecheck = {};

  Context = (typeof module !== "undefined" && module !== null ? require('./context') : Deftypes).context.Context;

  _ref = (typeof module !== "undefined" && module !== null ? require('./primitive') : Deftypes).primitive, isArray = _ref.isArray, isObject = _ref.isObject, isPrimitiveOf = _ref.isPrimitiveOf;

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
    if (type === void 0) {
      throw new Error('type must not be undefined');
    }
    if (isArray(type)) {
      child_type = type[0];
      return every(val, function(item) {
        return g.isType(child_type, item);
      });
    } else if (type instanceof Context || type.__direct__) {
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
    } else if (isPrimitiveOf(type, val)) {
      return true;
    } else {
      return false;
    }
  };

}).call(this);

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
