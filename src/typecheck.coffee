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

isStruct = (Struct, instance, isNullable = false) ->
  if isArray Struct # and isArray instance
    ChildStruct = Struct[0]
    results =
      for item in instance
        isStruct ChildStruct, item
    return results.every (i) -> i is true

  # 構造型チェック
  else if isObject Struct
    results =
      for child_param, ChildType of Struct
        isStruct(ChildType, instance[child_param])
    return results.every (i) -> i is true

  # インスタンス型チェック
  else
    switch Struct
      when String then return isString instance
      when Number then return isNumber instance
      else
        return instance instanceof Struct

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
  isStruct
}
