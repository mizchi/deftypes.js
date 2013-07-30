# types, define, option
if module?
  module.exports =
    T      : require("./types")
    Types  : require("./types")
    def    : require("./define").define.def
    defun  : require("./define").define.defun
    option : require("./option").option
