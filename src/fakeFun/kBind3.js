Function.prototype.kcall=function (context) {
  var args=[];
  for(var i=1;i<arguments.length;i++){
    args.push(arguments[i])
  }
  if(context==undefined){
    return eval("this("+args+")");
  }
  context=Object(context);
  context.fn=this;
  var result=eval("context.fn("+args+")");
  delete context.fn;
  return result;
};

Function.prototype.kapply=function (context,arr) {
  var args=[];
  if(arr){
    for(var i=0;i<arr.length;i++){
      args.push(arr[i])
    }
  }
  if(context==undefined){
    return eval("this("+args+")");
  }
  context=Object(context);
  context.fn=this;
  var result=eval("context.fn("+args+")");
  delete context.fn;
  return result;
};

Function.prototype.kbind=function (context) {
  var self=this;
  var args1=Array.prototype.slice.call(arguments,1);
  var fBound=function () {
    var args2=Array.prototype.slice.call(arguments);
    return self.apply(this instanceof self?this:context,args1.concat(args2))
  };
  fBound.prototype=Object.create(self.prototype);
  return fBound
};


