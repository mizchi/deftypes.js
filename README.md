# Deftypes.js

JavaScript type annotaion DSL library for structure and function.


## Provide simple DSL and No side effects

It is type checker on execution(not static).

Deftypes can avoid all side effects if you want. It may be also good on testing framework.


## Install

Examples are coffee-script.

### Node

```
$ npm install deftypes
```

```coffee
{def, defun, T} = require 'deftypes'
```

### Browser

```
$ bower install deftypes
```

```
<script src="bower_components/deftypes/deftypes.js"></script>
```

or download deftypes.js of this directory

```
<script src="master/deftypes.js"></script>
```


```
Deftypes()
```

It provides DSLs => def, defun, T


## How to use

### Struct Definition

```coffee
Point = {x: Number, y: Number}
p1 = def Point, {x:1, y:2} #=> {x: 1, y:2}
p2 = def Point, {x:1, z:2} #=> type error
```

### Typed Array

```coffee
list = def [T.Int], [1,2,3]
```

(T.Int and T.Fload are defined by default)


### Nullable

```coffee
NullableNumber = {n: T.Nullable(Number)}
p1 = def NullableNumber, n:1
p2 = def NullableNumber, n:null
```

### Typed Hash

```coffee
id_table = def T.Hash(String, Number), {
  A:1
  B:2
  C:3
}
```

Key accepts only Number or String (but it doesn't check yet)

### Function Definition

check arguments and returned object

```coffee
f1 = def T.Func([Number, Number], String), (m, n) -> "#{m}, #{n}"
f1(1,2) #=> "1, 2"
f1("",2) #=> argument error
```

```coffee
find_index = def T.Func([[Number], Number], T.Nullable(Number)), (arr, n) ->
  if (index = arr.indexOf(n)) is -1 then null else index

find_index([3,4,5], 4) #=> 1
find_index([3,4,5], 9) #=> null
```

### Function DSL

```coffee
f2 = defun [Number, Number], String, (m, n) -> "#{m}, #{n}"
```

### Any Type

```coffee
events = def Object, require('events')
list = def [T.any], [0, "", null]
```


### Function Scope with type check

```coffee
p = def Point, {x:1, y:2}
def Point, p, ->
  @x = 3

# Type Error
def Point, p, -> @y = "not number"
```

### Transparent mode

if option.transparent is true, typechecker does nothing, passing through def like transparent for avoiding performance down.

```coffee
{option} = require 'deftypes'
option.transparent = true
```

```coffee
Deftypes.option.transparent = true
```

## TODO

- trait feature
- struct inheritance
- valid error message
