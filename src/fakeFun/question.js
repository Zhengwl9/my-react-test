function Foo() {
  getName = function () { console.log (1); };
  return this;
}
Foo.getName = function () { console.log (2);};
Foo.prototype.getName = function () { console.log (3);};
var getName = function () { console.log (4);};
function getName() { console.log (5);}

//请写出以下输出结果：

console.log("----1");
Foo.getName();
console.log("----2");
getName();
console.log("----3");
Foo().getName();
console.log("----4");
getName();
console.log("----5");
new Foo.getName();
console.log("----6");
new Foo().getName();
console.log("----7");
new new Foo().getName();
console.log("----8");
