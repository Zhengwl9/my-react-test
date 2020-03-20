Function.prototype.kcall=function (cxt) {
  var context=cxt || window;
  var args=[];
  for(var i=1;i<arguments.length;i++){
    args.push("arguments["+ i + "]")
  }
  context.fn=this;
  var result=eval("context.fn("+args+")");
  delete context.fn;
  return result;
};


Function.prototype.kapply=function (cxt,arr) {
  var context=cxt || window;
  context.fn=this;
  var result;
  if(!arr){
    result=context.fn()
  }else{
    var args=[];
    for (var i=0;i<arguments.length;i++){
      args.push("arr["+i+"]")
    }
    result=eval("context.fn("+args+")")
  }
  delete context.fn;
  return result;
};

Function.prototype.kbind=function (context,) {
  var self=this;
  var args1=Array.prototype.slice.call(arguments,1);
  var fBound=function () {
    var args2=Array.prototype.slice.call(arguments);
    return self.apply(this instanceof self?this:context,args1.concat(args2));
  };
  var MidFun=function () {};
  MidFun.prototype=this.prototype;
  fBound.prototype=new MidFun();
  return fBound
};

var cat={
  name:"cat",
  intro:function (age) {
    console.log("My name is " + this.name + " and I'm " + age + " years old.");
    return {}
  }
};
var dog={
  name:"dog"
};

var result=cat.intro.kcall(dog,2);
var result1=cat.intro.kapply(dog,[2]);
var result2=cat.intro.kbind(dog,[2]);
console.log(result);
console.log(result1);
console.log(result2());

