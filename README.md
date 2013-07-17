# Deftypes.js

JavaScript type annotaion DSL library for structure and function.

## Install

```
npm install deftypes
```

## HOW TO USE

Examples are coffee-script.

### Struct Definition

```coffee
{def, T} = require 'deftypes'

Point = {x: Number, y: Number}
p1 = def Point, {x:1, y:2} #=> {x: 1, y:2}
p2 = def Point, {x:1, z:2} #=> type error
```

### Nullable

```coffee
NullableNumber = {n: T.Nullable(Number)}
p1 = def NullableNumber, n:1
p2 = def NullableNumber, n:null
```

### Array

```coffee
number_list = def [Number], [1,2,3]
```

### Function Definition

```coffee
f1 = def T.Func([Number, Number], String), (m, n) -> "#{m}, #{n}"
f1(1,2) #=> "1, 2"
f1("",2) #=> argument error

# Function DSL
f2 = defun [Number, Number], String, (m, n) -> "#{m}, #{n}"
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

### def scope with type check

```coffee
p = def Point, {x:1, y:2}
def Point, p, ->
  @x = 3

# Type Error
def Point, p, ->
  @y = ""
```

### transparent option

if option.transparent is true, typechecker does nothing, passing through def like transparent for avoiding performance down.

```coffee
{option} = require 'deftypes'
option.transparent = true
```

## TODO

- trait feature
- browser build
- struct inheritance
- Float and Int
- abstract Context
- valid error message

## CAUTION

This is alpha version so I will change APIs.
