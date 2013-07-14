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

module.exports = {
  Number
  String
  Boolean
  Null
  Undefined
  Nullable
}

