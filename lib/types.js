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
