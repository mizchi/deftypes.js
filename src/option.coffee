option =
  transparent: false

if module?
  module.exports = option
else if window?
  Deftypes.option = option

