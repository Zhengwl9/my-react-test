function Event() {
  this.listeners = {};
}
Event.prototype = {
  constructor: Event,
  on(type, fn) {
    if (typeof type !== "string" || typeof fn !== "function"){
      throw new Error("type must be String and fn must be a function！")
    }
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(fn);
    return ()=>{this.remove(type,fn)}
  },
  emit(type, ...args) {
    if (typeof type !== 'string') {
      throw new Error("type is required!")
    }
    let fns = this.listeners[type];
    if (!(fns instanceof Array)){
      return false;
    }
    fns.forEach(fn => {
      fn(...args);
    })
  },
  remove(type, fn) {
    if (typeof type !== "string" || typeof fn !== "function"){
      throw new Error("type must be String and fn must be a function！")
    }
    if (!fn) {
      delete this.listeners[type];
    } else {
      var fns = this.listeners[type];
      var len = fns.length;
      for (var i = len - 1; i >= 0; --i) {
        var f = fns[i];
        if (f === fn) {
          fns.splice(i, 1);
        }
      }
      if(fns.length===0){
        delete this.listeners[type];
      }
    }
  }
};
export default Event;
