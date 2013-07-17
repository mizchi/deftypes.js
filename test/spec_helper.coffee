{ok} = require 'assert'
ng = (val) -> ok ! val

error = (f) ->
  is_error = false
  try
    f()
    is_error = false
  catch e
    is_error = true
  if is_error
    return
  throw new Error("error doesnt occur")

module.exports = {
  ng
  ok
  error
}