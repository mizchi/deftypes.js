typecheck = require '../src/typecheck'
{ok} = require 'assert'

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
ok typecheck.isStruct {
  n:Number
  path:[String]
},{
  n:1
  path:["a", "b"]
}

console.log "[success]"
