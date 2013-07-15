T = require './t'
typecheck = require './typecheck'
option = require './option'

wrapFunction = (Type, f,self = null) ->
  (args...) ->
    # args length check
    unless args.length is Type.args.length
      throw new Error "mismatch: Arguments length"
    # args check
    for i in [0...Type.args.length]
      ArgType = Type.args[i]
      unless typecheck.isStruct ArgType, args[i]
        throw new Error "Argument Error"
    ret = f.apply self, args

    # return type check
    unless typecheck.isStruct Type.returns, ret
      throw new Error "Return Type Error"
    return ret

# coffeenize later
`
function clone(obj) {
   var c = {};

   for (var i in obj) {
       var prop = obj[i];

       if (typeof prop == 'object') {
          if (prop instanceof Array) {
              c[i] = [];

              for (var j = 0; j < prop.length; j++) {
                  c[i].push(prop[j]);
              }
          } else {
              c[i] = clone(prop);
          }
       } else {
          c[i] = prop;
       }
   }

   return c;
}
`

def = (Type, instance, scope, func) ->

  if arguments.length is 3
    return def Type, instance, [], scope

  if arguments.length is 4
    if option.transparent then func.call instance
    else
      unless typecheck.isStruct Type, instance
        throw new Error "invalid object before apply function"
      # before = clone instance
      func.call instance
      unless typecheck.isStruct Type, instance
        throw new Error "invalid object before apply function"

  if option.transparent then return instance

  if typecheck.isFunction instance
    return wrapFunction Type, instance

  if typecheck.isStruct Type, instance
    return instance
  else
    throw new Error """
      instance: #{instance}
      type: #{Type}
    """

module.exports = def

