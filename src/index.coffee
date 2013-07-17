if module?
  T = require "./types"
  def = require("./def")
  module.exports =
    T: require "./types"
    def: require("./def")
    defun: (args, return_type, f) -> def T.Func(args, return_type), f
    option: require("./option")
else if window?
  {T, def} = Deftypes
  Deftypes.defun =  (args, return_type, f) -> def T.Func(args, return_type), f

