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
