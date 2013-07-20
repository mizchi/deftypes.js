if module?
  T = require('./types')
  {typecheck} = require './typecheck'
  {option} = require './option'
else if window?
  {T, typecheck, option} = Deftypes

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
    unless typecheck.isType Type.return_type, ret
      throw new Error "Return Type Error"
    return ret

def = (type, val, mod_func = null) ->
  # do nothing and return soon
  if option.transparent
    mod_func?.call val
    return val

  # wrap func and return
  if typecheck.isFunction val
    return wrapFuncWithTypeCheck type, val

  # apply mod_func to val after type check
  if typecheck.isFunction mod_func
    unless typecheck.isType type, val
      throw new Error "invalid object before apply function"
    mod_func.call val

  # validate before return
  unless typecheck.isType type, val
    throw new Error "invalid val type"

  return val


if module?
  module.exports = def
else if window?
  Deftypes.def = def
