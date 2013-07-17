typecheck = require './typecheck'

class TypeBase

class Nullable extends TypeBase
  constructor: (type) ->
    return new Nullable(arguments...) unless @ instanceof Nullable
    @type = type

  validate: (val) ->
    val is null or typechek.isType @type, val

class Undefined extends TypeBase
  constructor: ->
    return new Undefined(arguments...) unless @ instanceof Undefined

class Null extends TypeBase
  constructor: ->
    return new Null(arguments...) unless @ instanceof Null

class Any extends TypeBase
  constructor: ->
    return new Any(arguments...) unless @ instanceof Any

  validate: (val) -> true

class Func extends TypeBase
  constructor: (args, returns) ->
    return new Func(arguments...) unless @ instanceof Func
    @args = args
    @returns = returns

module.exports = {
  Number
  String
  Boolean
  Null
  Undefined
  Nullable
  Func
}

