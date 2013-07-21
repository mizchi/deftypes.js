if module?
  {typecheck} = require '../src/typecheck'
  T = require('../src/types').Types
  {def, defun} = require('../src/define').define
  {ok, ng, error} = require './spec_helper'
  {option} = require '../src/option'
else
  ""

option.transparent = false

start = Date.now()

Point = {x: Number, y: Number}

# isType
ok typecheck.isType Number, 1
ok typecheck.isType [Number], [1,2,3]
ok typecheck.isType {x:Number, y:Number}, {x:1, y:2}
ok typecheck.isType [{x:Number, y:Number}], [{x:1, y:2}, {x:3, y:2}]
ok typecheck.isType {n:Number, path:[String] }, {n:1,path:["a", "b"]}
ok typecheck.isType T.Hash(String, Number), {"p1": 5, "p2": 3}
ng typecheck.isType T.Hash(String, Number), {"p1": "str", "p2": 3}

ok typecheck.isType T.Undefined, undefined
ok typecheck.isType T.Null, null
ng typecheck.isType T.Undefined, null
ok typecheck.isType T.None, null
ok typecheck.isType T.None, undefined

ok typecheck.isType T.Int, 3
ng typecheck.isType T.Int, 3.3
ok typecheck.isType T.Float, 3.3

ok typecheck.isType T.Float, 3.3


# ContextType
ok typecheck.isType T.Any, 3
ok typecheck.isType T.Any, {}

# Nullable
ok typecheck.isType T.Nullable(Number), 1
ok typecheck.isType T.Nullable(Number), null
ng typecheck.isType T.Nullable(Number), undefined
ok typecheck.isType [T.Nullable(Number)], [null, 1, null]

# Satisfied
ok typecheck.isType T.Satisfied(Point), {x:1, y:2}
ng typecheck.isType T.Satisfied(Point), {x:1, y:2, z:2}


# def
x1 = def Point, {x: 1, y:2}
error -> x1e = def Point, {x: "", y:2}

x2 = def [Point], [{x: 1, y:2}]

x3 = def Point, -> {x: 1, y:2}


## Function
f1 = def T.Func([Number, Number], String), (m, n) -> "#{m}, #{n}"
f1(1,2)
error -> f1("",2)

# DSL
f2 = defun [Number, Number], String, (m, n) -> "#{m}, #{n}"
f2(1,2)

f3 = def T.Func([Number, Number], String), (m, n) -> m * n
error -> f3(1,2) # return type error


get_distance = def T.Func([Point, Point], Number), (m, n) ->
  return Math.sqrt( Math.pow(m.x - n.x, 2) + Math.pow(m.y - n.y, 2))

ok get_distance({x:0, y:0},{x:3, y:4}) is 5

find_n = def T.Func([[Number], Number], T.Nullable(Number)), (arr, n) ->
  ret = arr.indexOf(n)
  if ret isnt -1
    return ret
  else
    return null

ok find_n([3,4,5], 4) is 1
ok find_n([3,4,5], 6) is null

p = def Point, {x:1, y:2}

def Point, p, ->
  @x = 3
ok p.x is 3

error -> def Point, p, -> @x = ""

console.log "[success]", Date.now() - start

