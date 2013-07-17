T = require './t'
typecheck = require './typecheck'
option = require './option'

wrapFuncWithTypeCheck = (Type, func, self = null) ->
  (args...) ->
    # args length check
    unless args.length is Type.args.length
      throw new Error "mismatch: Arguments length"
    # args check
    for i in [0...Type.args.length]
      ArgType = Type.args[i]
      unless typecheck.isType ArgType, args[i]
        throw new Error "Argument Error"
    ret = func.apply self, args

    # return type check
    unless typecheck.isType Type.returns, ret
      throw new Error "Return Type Error"
    return ret

def = (Type, instance, mod_func = null) ->
  # do nothing and return soon
  if option.transparent
    mod_func?.call instance
    return instance

  # wrap func and return
  if typecheck.isFunction instance
    return wrapFuncWithTypeCheck Type, instance

  # apply mod_func to instance after type check
  if typecheck.isFunction mod_func
    unless typecheck.isType Type, instance
      throw new Error "invalid object before apply function"
    mod_func.call instance

  # validate before return
  unless typecheck.isType Type, instance
    throw new Error "invalid instance type"

  return instance

module.exports = def

