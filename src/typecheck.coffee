g = (if module? then exports else Deftypes).typecheck = {}

# context, primitive
{Context} = (if module? then require('./context') else Deftypes).context

{
  isArray
  isObject
  isPrimitiveOf
} = (if module? then require('./primitive') else Deftypes).primitive

every = (arr, f) ->
  for item in arr
    return false unless f(item)
  true

g.isType = (type, val) ->
  # array check
  if isArray type
    child_type = type[0]
    return every val, (item) ->
      g.isType child_type, item
  else if type instanceof Context or type.__direct__
    return type.validate(val)

  # dont check anymore
  if type is Object then return true

  # property check
  else if isObject type
    results =
      for child_param, child_type of type
        g.isType(child_type, val[child_param])
    return every results, (i) -> i is true

  # instance check
  else if isPrimitiveOf type, val
    return true

  throw new Error "irregular type #{type}, #{val}"
