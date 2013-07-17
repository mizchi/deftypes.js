(function() {
  var option;

  option = {
    transparent: false
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = option;
  } else if (typeof window !== "undefined" && window !== null) {
    Deftypes.option = option;
  }

}).call(this);
