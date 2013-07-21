# primitive, typecheck, context

{
  toString
  isString
  isNumber
  isBoolean
  isFunction
  isPrimitiveOf
  isObject
} = (if module? then require('./primitive') else Deftypes).primitive

{typecheck}  = (if module? then require('./typecheck') else Deftypes)
{Context} = (if module? then require('./context') else Deftypes).context

class Any extends Context
  constructor: ->
    return new Any unless @ instanceof Any
  validate: (val) -> true

class Nullable extends Context
  constructor: (type) ->
    return new Nullable(arguments...) unless @ instanceof Nullable
    @type = type

  validate: (val) ->
    val is null or isPrimitiveOf @type, val

class Undefined extends Context
  constructor: ->
    return new Undefined(arguments...) unless @ instanceof Undefined
  validate: (val) -> val is undefined

class Null extends Context
  constructor: ->
    return new Null(arguments...) unless @ instanceof Null
  validate: (val) -> val is null

class Func extends Context
  constructor: (args, return_type) ->
    return new Func(arguments...) unless @ instanceof Func
    @args = args
    @return_type = return_type

  validate: (val) -> isFunction val and @args.length is val.length

class Hash extends Context
  constructor: (key_type, value_type) ->
    return new Hash(arguments...) unless @ instanceof Hash
    @key_type = key_type
    @value_type = value_type

  validate: (hash) ->
    unless isObject(hash) then return false

    for key, val of hash
      if typecheck.isType(@key_type, key) and typecheck.isType(@value_type, val)
          continue
      return false
    true

Types = {
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
  exports.Types = Types
else if window?
  Deftypes.Types = Types
