// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;
function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = Array.prototype.slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var _adder = function() {
    _args.push(...arguments);
    return _adder;
  };

  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
      return a + b;
    });
  };
  return _adder;
}

// console.log(add(1)(2)(3)(1)(2)(3).toString());


// function curry(fn) {
//   var number=fn.length;
//   var args=[];
//   var ctx=this;
//   return function tempCurry() {
//     Array.prototype.push.apply(args,arguments)
//     if(args.length<number){
//       return tempCurry
//     }
//     return fn.apply(ctx,args)
//   }
// }

function curry(fn) {
  var number=fn.length;
  var args=[];
  var cxt=this;
  return function tempCurry() {
    // Array.prototype.push.apply(args,arguments);
    args.push.apply(args,arguments)
    // args.push(...Array.prototype.slice.call(arguments))
    console.log(args);
    if(args.length<number){
      return tempCurry
    }
    return fn.apply(cxt,args)
  }

}


function add1(x,y,z) {
  console.log(this.test)
  return x+y+z;
}
var obj={
  test: 'test'
};

var  curryAdd=curry.call(obj,add1);
console.log(curryAdd(1)(2)(3));
