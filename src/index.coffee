T = require "./types"
def = require("./def")

module.exports =
  T: require "./types"
  def: require("./def")
  defun: (args, returns, f) -> def T.Func(args, returns), f
  option: require("./option")
