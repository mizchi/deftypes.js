{
  toString
  isString
  isNumber
  isBoolean
  isFunction
  isInstanceOf
} = (if module? then require('./primitive') else Deftypes).primitive

class ContextType

class Any extends ContextType
  constructor: ->
    return new Any unless @ instanceof Any
  validate: (val) -> true

class Nullable extends ContextType
  constructor: (type) ->
    return new Nullable(arguments...) unless @ instanceof Nullable
    @type = type

  validate: (val) ->
    val is null or isInstanceOf @type, val

class Undefined extends ContextType
  constructor: ->
    return new Undefined(arguments...) unless @ instanceof Undefined
  validate: (val) -> val is undefined

class Null extends ContextType
  constructor: ->
    return new Null(arguments...) unless @ instanceof Null
  validate: (val) -> val is null

class Func extends ContextType
  constructor: (args, return_type) ->
    return new Func(arguments...) unless @ instanceof Func
    @args = args
    @return_type = return_type

  validate: (val) -> isFunction val and @args.length is val.length

class Hash extends ContextType
  constructor: (key_type, value_type) ->
    return new Hash(arguments...) unless @ instanceof Hash
    @key_type = key_type
    @value_type = value_type

  validate: (val) ->
    for key, val of val
      if key instanceof key_type
        if val instanceof val_type
          continue
      return false
    true

T = {
  ContextType
  Nullable
  nullable: Nullable(Any)
  Any
  any: Any()
  Null
  null:Null()
  Undefined
  undefined: Undefined()
  Func
  func: Func [[Any()]], Any()
  Hash
}

if module?
  module.exports = T
else if window?
  Deftypes.T = T
