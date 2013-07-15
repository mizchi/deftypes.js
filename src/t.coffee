Null = -> null
Undefined = -> undefined

class Nullable
  constructor: (type) ->
    if @ instanceof Nullable
      @type = type
    else
      return new Nullable arguments...

class Undefined
  constructor: ->
    if @ instanceof Undefined
    else
      return new Undefined

class Null
  constructor: ->
    if @ instanceof Null
    else
      return new Null
class Struct

class Func
  constructor: (args, returns) ->
    if @ instanceof Func
      @args = args
      @returns = returns
    else
      return new Func arguments...

module.exports = {
  Number
  String
  Boolean
  Null
  Undefined
  Nullable
  Struct
  Func
}

