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

isType = (Type, val) ->
  if option.transparent then return true

  if isArray Type
    ChildType = Type[0]
    return every val, (item) ->
      isType ChildType, item
  else if Type instanceof T.Func
    return isFunction Type

  else if Type instanceof T.ContextType
    return Type.validate(val)

  # 構造型チェック
  else if isObject Type
    results =
      for child_param, ChildType of Type
        isType(ChildType, val[child_param])
    return every results, (i) -> i is true

  # インスタンス型チェック
  else if isInstanceOf Type, val
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
