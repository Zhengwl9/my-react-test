function fakeNew(Fn) {
  var obj = {};
  obj.__proto__ = Fn.prototype;
  var result = Fn.apply(obj, Array.prototype.slice.call(arguments, 1));
  if (result !== null && typeof result === "object" || typeof result === "function") {
    return result
  }
  return obj;
}
