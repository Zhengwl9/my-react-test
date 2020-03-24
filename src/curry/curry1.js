//含义把接收多个参数的函数转化为接收一个单个参数，并返回接收余下参数而且返回结果的新函数
function curry(fn) {
  var number=fn.length;
  var args=[];
  var ctx=this;
  var resultFun=function () {
    args.push.apply(args,arguments);
    if(args.length<number){
      return resultFun;
    }else{
      return fn.apply(ctx,args)
    }
  };
  return resultFun;
}
function add1(x,y,z) {
  return x+y+z;
}


var  curryAdd=curry(add1);
console.log(curryAdd);
console.log(curryAdd(1)(2)(3));
