(function() {
  if (typeof module !== "undefined" && module !== null) {
    module.exports = {
      T: require("./types"),
      def: require("./def").def,
      defun: require("./def").defun,
      option: require("./option").option
    };
  } else if (typeof window !== "undefined" && window !== null) {
    Deftypes.defun = Deftypes.defun;
  }

}).call(this);
