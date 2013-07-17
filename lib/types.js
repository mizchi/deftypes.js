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
