T = require '../src/t'
typecheck = require '../src/typecheck'

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

Provide.def = (Class, instance) ->
  Type = Class.types ? Class

  if !T.debug or typecheck.isArray(Class)
    Class = Class[0]
    return (
      for item in instance
        Class.new?(item) or item
    )

  else if !T.debug or (typecheck.isStruct Type, instance)
    return (Class.new? instance) or instance
  else
    throw new Error 'type error'

Provide.provide = ->
  global = window ? global
  global.def = Provide.def
  global.struct = Provide.struct

