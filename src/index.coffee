if module?
  module.exports =
    T      : require("./types")
    def    : require("./def").def
    defun  : require("./def").defun
    option : require("./option").option

else if window?
  Deftypes.defun =  Deftypes.defun
