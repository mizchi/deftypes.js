typecheck = require './typecheck'

class ContextType

class Nullable extends ContextType
  constructor: (type) ->
    return new Nullable(arguments...) unless @ instanceof Nullable
    @type = type

  validate: (val) ->
    val is null or typechek.isType @type, val

class Undefined extends ContextType
  constructor: ->
    return new Undefined(arguments...) unless @ instanceof Undefined

class Null extends ContextType
  constructor: ->
    return new Null(arguments...) unless @ instanceof Null

class Any extends ContextType
  constructor: ->
    return new Any(arguments...) unless @ instanceof Any

  validate: (val) -> true

class Func extends ContextType
  constructor: (args, returns) ->
    return new Func(arguments...) unless @ instanceof Func
    @args = args
    @returns = returns

module.exports = {
  ContextType
  Number
  String
  Boolean
  Null
  Undefined
  Nullable
  Func
}

