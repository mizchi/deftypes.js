# Deftypes

JavaScript type annotaion DSL library for structure and function.

## Install

```
npm install deftypes
```

## HOW TO USE


### Struct Definition

```coffee
{def, struct, T} = require 'deftypes'

Point = struct {x: Number, y: Number}
p1 = def Point, {x:1, y:2} #=> {x: 1, y:2}
p2 = def Point, {x: 1, z:2} #=> type error
```

### Nullable

```coffee
NullableNumber = struct {n: Nullable(Number)}
p1 = def NullableNumber, n:1
p2 = def NullableNumber, n:null
```

see test/typecheck_test.coffee also.

### Function Definition

```coffee
f1 = def T.Func([Number, Number], String), (m, n) -> "#{m}, #{n}"
f1(1,2) #=> "1, 2"
f1("",2) #=> argument error
```

```coffee
find_n = def T.Func([[Number], Number], T.Nullable(Number)), (arr, n) ->
  ret = arr.indexOf(n)
  if ret isnt -1
    return ret
  else
    return null

find_n([3,4,5], 4) #=> 1
find_n([3,4,5], 9) #=> null
```

when T.debug is false, typechecker does nothing, passing through def like transparent for avoiding performance down.

## TODO

- more DSL about funcion definition
- more test
- Float and Int
- transparent production mode
- trait feature
- valid error message
- browser build
- struct inheritance
- fix struct definition
- separate type system from this repo

## CAUTION

This is alpha version so I will change APIs.
