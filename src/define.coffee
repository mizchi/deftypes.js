# types, typecheck, option, primitive
{Types}      = if module? then require('./types')     else Deftypes
{typecheck}  = if module? then require('./typecheck') else Deftypes
{option}     = if module? then require('./option')    else Deftypes
{isFunction} = (if module? then require('./primitive') else Deftypes).primitive

g = (if module? then exports else Deftypes).define = {}

wrap_func_with_typecheck = (Type, func, self = null) ->
  (args...) ->
    # args length check
    unless args.length is Type.args.length
      throw new Error "mismatch: Arguments length"

    # args check
    for i in [0...Type.args.length]
      ArgType = Type.args[i]
      unless typecheck.isType ArgType, args[i]
        throw new Error "Argument Error"
    ret = func.apply self, args

    # return type check
    unless typecheck.isType Type.return_type, ret
      throw new Error "Return Type Error"
    return ret

g.def = (type, val, mod_func = null) ->
  # do nothing and return soon
  if option.transparent
    mod_func?.call val
    if arguments.length is 2 and isFunction(val)
      val = val()
    return val

  # wrap func and return
  if isFunction(val) and mod_func is null
    return wrap_func_with_typecheck type, val

  # apply mod_func to val after type check
  if isFunction mod_func
    unless typecheck.isType type, val
      throw new Error "invalid object before apply function"
    mod_func.call val
  else if isFunction(val) and val.length is 0
    val = val()

  # validate before return
  unless typecheck.isType type, val
    throw new Error "invalid val type"

  return val

g.defun = (args, return_type, f) -> g.def Types.Func(args, return_type), f
