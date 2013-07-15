typecheck = require '../src/typecheck'
T = require '../src/t'
def = require '../src/def'
{defun} = require '../src/index'

option = require '../src/option'
option.transparent = false
{ok} = require 'assert'

start = Date.now()

Point = {x: Number, y: Number}

ok typecheck.isString 'string'
ok typecheck.isNumber 5
ok typecheck.isBoolean false
ok typecheck.isFunction ->
ok typecheck.isArray []
ok typecheck.isArrayLike {0:0,1:1,length:2}
ok typecheck.isObject {}
ok typecheck.isObjectLike new (class A)
ok typecheck.isRegExp /xxx/
ok typecheck.isDate new Date
# ok typecheck.isDomNode new HTMLElement
ok typecheck.isNull null
ok typecheck.isUndefined undefined
# isStruct
ok typecheck.isStruct Number, 1
ok typecheck.isStruct [Number], [1,2,3]
ok typecheck.isStruct {x:Number, y:Number}, {x:1, y:2}
ok typecheck.isStruct [{x:Number, y:Number}], [{x:1, y:2}, {x:3, y:2}]
ok typecheck.isStruct { n:Number, path:[String] },{ n:1,path:["a", "b"]}
ok typecheck.isStruct T.Nullable(Number), 1
ok typecheck.isStruct T.Nullable(Number), null
ok typecheck.isStruct [T.Nullable(Number)], [null, 1, null]
# def
x1 = def Point, {x: 1, y:2}
x2 = def [Point], [{x: 1, y:2}]

# function
f1 = def T.Func([Number, Number], String), (m, n) -> "#{m}, #{n}"
f1(1,2)

f2 = defun [Number, Number], String, (m, n) -> "#{m}, #{n}"
f2(1,2)

get_distance = def T.Func([Point, Point], Number), (m, n) ->
  return Math.sqrt( Math.pow(m.x - n.x, 2) + Math.pow(m.y - n.y, 2))
ok 5 is get_distance({x:0, y:0},{x:3, y:4})

find_n = def T.Func([[Number], Number], T.Nullable(Number)), (arr, n) ->
  ret = arr.indexOf(n)
  if ret isnt -1
    return ret
  else
    return null

ok find_n([3,4,5], 4) is 1
ok find_n([3,4,5], 6) is null

console.log "[success]", Date.now() - start

