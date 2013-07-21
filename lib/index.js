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
