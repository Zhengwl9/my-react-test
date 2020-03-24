"use strict";
var type = 'test';
var cat = {
  type: "cat",
  intro: function (age,id) {
    console.log("I'm a " + this.type +" and I'm "+age+" years old."+" id is "+id+'.');
    return {test:'test'}
  }
};
var dog = {
  type: "dog"
};
Function.prototype.kcall=function (context) {
  var args1=[];
  for(var i=1;i<arguments.length;i++){
    args1.push(arguments[i]);
  }
  if(context == undefined) {
    return eval('this('+args1+')')
  }
  context = Object(context);
  context.fn=this;
  var result=eval('context.fn('+args1+')');
  // var fn = new Function('context','return context.fn('+args1+')');
  // var result=fn(context);
  delete context.fn;
  return result;
};
Function.prototype.kapply=function(context,arr){
  var args=[];
  if(arr){
    for(var i=0;i<arr.length;i++){
      args.push(arr[i])
    }
  }
  if(context==undefined){
    return eval("this("+args+")")
  }
  context=Object(context);
  context.__fn__=this;
  var result=eval("context.__fn__("+args+")");
  delete context.__fn__;
  return result;
};
Function.prototype.kbind=function(context){
  var self=this;
  var args1=Array.prototype.slice.call(arguments,1)
  var fBound=function () {
    var args2=Array.prototype.slice.call(arguments,)
    return self.apply(this instanceof self? this:context,args1.concat(args2))
  };
  var MidFun=function () {}
  MidFun.prototype=this.prototype;
  fBound.prototype=new MidFun();
  return fBound;
};

// console.log(cat.intro.call(dog, 2, 3));
// console.log(cat.intro.kcall(dog, 2, 1));
// console.log(cat.intro.kapply(dog, [2, 1]));
console.log(cat.intro.kbind(dog,2,3)());





