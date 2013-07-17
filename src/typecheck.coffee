T = require './t'
option = require './option'

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

isArray = (val) ->
  return toString(val) is '[object Array]'

isArrayLike = (val) ->
  return isArray(val) or (val and typeof(val) is 'object' and isNumber(val.length))

isObject = (val) ->
  return toString(val) is '[object Object]'

isObjectLike = (val) ->
  return val isnt null and typeof(val) is 'object'

isRegExp = (val) ->
  return toString(val) is '[object RegExp]'

isDate = (val) ->
  return toString(val) is '[object Date]'

isNull = (val) ->
  return val is null

isUndefined = (val) ->
  return val is undefined

isNullable = (val) ->
  return val instanceof T.Nullable

isInstanceOf = (type, val) ->
  switch type
    when String then return isString val
    when Number then return isNumber val
    when Boolean then return isBoolean val
    else
      return val instanceof type

every = (arr, f) ->
  for item in arr
    return false unless f(item)
  true

isType = (type, val) ->
  if option.transparent then return true

  # array check
  if isArray type
    child_type = type[0]
    return every val, (item) ->
      isType child_type, item
  else if type instanceof T.ContextType
    return type.validate(val)

  # dont check anymore
  if type is Object then return true

  # property check
  else if isObject type
    results =
      for child_param, child_type of type
        isType(child_type, val[child_param])
    return every results, (i) -> i is true

  # instance check
  else if isInstanceOf type, val
    return true

  throw 'irregular type'

module.exports = {
  toString
  isString
  isNumber
  isBoolean
  isFunction
  isArray
  isArrayLike
  isObject
  isObjectLike
  isRegExp
  isDate
  isNull
  isUndefined
  isType
}
