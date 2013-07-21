(function() {
  var root;

  root = window;

  root.Deftypes = function() {
    root.def = Deftypes.define.def;
    root.defun = Deftypes.define.defun;
    root.T = Deftypes.Types;
    return root.Types = Deftypes.Types;
  };

}).call(this);
