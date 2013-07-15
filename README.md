# Deftypes

JavaScript type annotaion DSL library for structure and function.

## Install

```
npm install deftypes
```

## HOW TO USE

```coffee
{def, struct, T} = require 'deftypes'

Point = struct {x: Number, y: Number}
p1 = def Point, {x:1, y:2} #=> {x: 1, y:2}
p2 = def Point, {x: 1, z:2} #=> type error

# function
f1 = def T.Func([Number, Number], String), (m, n) -> "#{m}, #{n}"
f1(1,2) #=> "1, 2"
f1("",2) #=> argument error

get_distance = def T.Func([Point, Point], Number), (m, n) ->
  return Math.sqrt( Math.pow(m.x - n.x, 2) + Math.pow(m.y - n.y, 2))
get_distance({x:0, y:0},{x:3, y:4}) #=> 5
```

when T.debug is false, typechecker does nothing, passing through def like transparent for avoiding performance down.

## TODO

- more DSL about funcion definition
- more test
- transparent production mode
- trait feature
- valid error message
- browser build
- struct inheritance
- fix struct definition
- separate type system from this repo

## CAUTION

This is alpha version so I will change APIs.
