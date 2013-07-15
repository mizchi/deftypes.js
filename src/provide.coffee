T = require './t'
typecheck = require './typecheck'

Provide = module.exports = {}

Provide.struct = (obj) ->
  return class extends T.Struct
    @types: obj
    @new: (params) ->
      if !T.debug or typecheck.isStruct(@types, params)
        return new this params
      else
        throw "type error"

    constructor: (params)->
      for key, val of params
        this[key] = val

wrapFunction = (Type, f,self = null) ->
  (args...) ->
    # args length check
    unless args.length is Type.args.length
      throw new Error "mismatch: Arguments length"
    # args check
    for i in [0...Type.args.length]
      ArgType = Type.args[i].types ? Type.args[i]
      unless typecheck.isStruct ArgType, args[i]
        console.log Type.args[i]
        console.log args[i]
        throw new Error "Argument Error"
    ret = f.apply self, args

    # return type check
    unless typecheck.isStruct Type.returns, ret
      throw new Error "Return Type Error"
    return ret

Provide.def = (Class, instance) ->
  Type = Class.types ? Class

  if typecheck.isFunction instance
    return wrapFunction Type, instance

  if !T.debug or typecheck.isArray(Class)
    Class = Class[0]
    return (
      for item in instance
        Class.new?(item) or item
    )

  else if !T.debug or (typecheck.isStruct Type, instance)
    return (Class.new? instance) or instance
  else
    throw new Error """
      instance: #{instance}
      type: #{Type}
    """

Provide.provide = ->
  global = window ? global
  global.def = Provide.def
  global.struct = Provide.struct

