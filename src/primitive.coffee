g = (if module? then exports else Deftypes).primitive = {}

g.toString = (val) ->
  return Object.prototype.toString.call(val)

g.isString = (val) ->
  return g.toString(val) is '[object String]'

g.isNumber = (val) ->
  return g.toString(val) is '[object Number]' and !isNaN(val)

g.isBoolean = (val) ->
  return g.toString(val) is '[object Boolean]'

g.isFunction = (val) ->
  return g.toString(val) is '[object Function]'

g.isArray = (val) ->
  return g.toString(val) is '[object Array]'

g.isArrayLike = (val) ->
  return g.isArray(val) or (val and typeof(val) is 'object' and g.isNumber(val.length))

g.isObject = (val) ->
  return g.toString(val) is '[object Object]'

g.isObjectLike = (val) ->
  return val isnt null and typeof(val) is 'object'

g.isRegExp = (val) ->
  return g.toString(val) is '[object RegExp]'

g.isDate = (val) ->
  return g.toString(val) is '[object Date]'

g.isNull = (val) ->
  return val is null

g.isUndefined = (val) ->
  return val is undefined

g.isInstanceOf = (type, val) ->
  switch type
    when String then return g.isString val
    when Number then return g.isNumber val
    when Boolean then return g.isBoolean val
    else
      return (val instanceof type)

g.isUndefined = (val) ->
  return val is undefined
