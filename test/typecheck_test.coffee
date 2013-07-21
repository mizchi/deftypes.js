{typecheck} = require '../src/typecheck'
T = require '../src/types'
def = require '../src/def'
{defun} = require '../src/index'
{ok, ng, error} = require './spec_helper'

{option} = require '../src/option'
option.transparent = false

start = Date.now()

Point = {x: Number, y: Number}

# isType
ok typecheck.isType Number, 1
ok typecheck.isType [Number], [1,2,3]
ok typecheck.isType {x:Number, y:Number}, {x:1, y:2}
ok typecheck.isType [{x:Number, y:Number}], [{x:1, y:2}, {x:3, y:2}]
ok typecheck.isType {n:Number, path:[String] }, {n:1,path:["a", "b"]}

# ContextType
ok typecheck.isType T.any, 3
ok typecheck.isType T.any, {}

# Nullable
ok typecheck.isType T.Nullable(Number), 1
ok typecheck.isType T.Nullable(Number), null
ng typecheck.isType T.Nullable(Number), undefined
ok typecheck.isType [T.Nullable(Number)], [null, 1, null]


# def
x1 = def Point, {x: 1, y:2}
error -> x1e = def Point, {x: "", y:2}

x2 = def [Point], [{x: 1, y:2}]

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

ok typecheck.isType [T.Hash(String, Number)], {
  "a": "xxx"
  "b": "yyy"
}

console.log "[success]", Date.now() - start

