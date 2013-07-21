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
      option: require("./option").option
    };
  } else if (typeof window !== "undefined" && window !== null) {
    T = Deftypes.T, def = Deftypes.def;
    Deftypes.defun = function(args, return_type, f) {
      return def(T.Func(args, return_type), f);
    };
  }

}).call(this);
