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
