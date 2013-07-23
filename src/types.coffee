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
  @__direct__: true
  @validate: (val) -> true

class Int extends Context
  @__direct__: true
  @validate: (val) -> isNumber(val) and parseInt(val) is val

class Float extends Context
  @__direct__: true
  @validate: (val) -> isNumber(val)

class Undefined extends Context
  @__direct__: true
  @validate: (val) -> val is undefined

class Null extends Context
  @__direct__: true
  @validate: (val) -> val is null

class None extends Context
  @__direct__: true
  @validate: (val) -> val is null or val is undefined

class Nullable extends Context
  constructor: (type) ->
    return new Nullable(arguments...) unless @ instanceof Nullable
    @type = type

  validate: (val) ->
    val is null or isPrimitiveOf @type, val

class Func extends Context
  constructor: (args, return_type) ->
    return new Func(arguments...) unless @ instanceof Func
    @args = args
    @return_type = return_type

  validate: (val) -> isFunction val and @args.length is val.length

class Hash extends Context
  ALLOWED_KEY_TYPES = [Number, String, Int, Float]
  constructor: (key_type, value_type) ->
    return new Hash(arguments...) unless @ instanceof Hash
    throw 'invalid key type' unless key_type in ALLOWED_KEY_TYPES
    @key_type = key_type
    @value_type = value_type

  validate: (hash) ->
    unless isObject(hash) then return false

    for key, val of hash
      if typecheck.isType(@key_type, key) and typecheck.isType(@value_type, val)
        continue
      return false
    true

class Satisfied extends Context
  constructor: (type) ->
    return new Satisfied(arguments...) unless @ instanceof Satisfied
    @type = type

  validate: (hash) ->
    return false unless typecheck.isType(@type, hash)
    for key, val of hash
      unless @type[key]?
        return false
    true



Types = {
  Any
  Int
  Float
  None
  Nullable
  Null
  Undefined
  Func
  Hash
  Satisfied
}

if module?
  exports.Types = Types
else if window?
  Deftypes.Types = Types
