function Father() {
  this.car="Infinite"
}
Father.prototype.getMoney=function () {
  console.log("I have a lot of money left");
  return 999999999;
};


function kextends(sup,sub) {
  sub.prototype=Object.create(sup.prototype,{
    constructor:{
      value:sub,
      writable:true,
      configurable:true,
    }
  });
  Object.setPrototypeOf(sub,sup);
}
function Child() {
  Object.getPrototypeOf(Child).apply(this,arguments)
}




