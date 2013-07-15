T = require './t'
typecheck = require './typecheck'
option = require './option'

wrapFunction = (Type, f,self = null) ->
  (args...) ->
    # args length check
    unless args.length is Type.args.length
      throw new Error "mismatch: Arguments length"
    # args check
    for i in [0...Type.args.length]
      ArgType = Type.args[i]
      unless typecheck.isStruct ArgType, args[i]
        throw new Error "Argument Error"
    ret = f.apply self, args

    # return type check
    unless typecheck.isStruct Type.returns, ret
      throw new Error "Return Type Error"
    return ret

def = (Class, instance) ->
  if option.transparent then return instance

  Type = Class
  if typecheck.isFunction instance
    return wrapFunction Type, instance

  if typecheck.isArray(Class)
    Class = Class[0]
    return (
      for item in instance
        Class.new?(item) or item
    )

  else if typecheck.isStruct Type, instance
    return (Class.new? instance) or instance
  else
    throw new Error """
      instance: #{instance}
      type: #{Type}
    """

module.exports = def

