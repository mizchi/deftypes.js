(function() {
  if (typeof module !== "undefined" && module !== null) {
    module.exports = {
      T: require("./types"),
      Types: require("./types"),
      def: require("./define").define.def,
      defun: require("./define").define.defun,
      option: require("./option").option
    };
  }

}).call(this);
