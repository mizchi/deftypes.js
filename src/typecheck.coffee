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

isDomNode = (val) ->
  return val and isString(val.nodeName) and isArrayLike(val.childNodes)

isNull = (val) ->
  return val is null

isUndefined = (val) ->
  return val is undefined

isNullable = (val) ->
  return val instanceof T.Nullable

every = (arr, f) ->
  for item in arr
    return false unless f(item)
  true

isType = (Type, instance) ->
  if option.transparent then return true

  if isArray Type
    ChildType = Type[0]
    return every instance, (item) ->
      isType ChildType, item
  else if Type instanceof T.Func
    return isFunction Type
  else if isNullable Type
    if isNull instance then return true
    return isType Type.type, instance

  # 構造型チェック
  else if isObject Type
    results =
      for child_param, ChildType of Type
        isType(ChildType, instance[child_param])
    return every results, (i) -> i is true

  # インスタンス型チェック
  else
    switch Type
      when String then return isString instance
      when Number then return isNumber instance
      when Boolean then return isBoolean instance
      else
        return instance instanceof Type

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
  isDomNode
  isNull
  isUndefined
  isType
}
