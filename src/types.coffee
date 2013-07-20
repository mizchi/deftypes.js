
toString = (val) ->
  return Object.prototype.toString.call(val)

isString = (val) ->
  return toString(val) is '[object String]'

isNumber = (val) ->
  return toString(val) is '[object Number]' and !isNaN(val)

isBoolean = (val) ->
  return toString(val) is '[object Boolean]'

isFunction = (val) ->
  return toString(val) is '[object Function]'

isInstanceOf = (type, val) ->
  switch type
    when String then return isString val
    when Number then return isNumber val
    when Boolean then return isBoolean val
    else
      return val instanceof type

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
}

if module?
  module.exports = T
else if window?
  Deftypes.T = T
