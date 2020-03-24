var obj={};
Object.defineProperty(obj,"name",{
  value:"zwl",
  writable:true,
  enumerable:true,
  configurable:true,
});

//如果不在严格模式下，会静默失败：例如修改值
// writable：控制是否可写,和get set 互斥，写了get,set  writeable默认就是true,且不可修改
//enumerable:是可枚举的，如果设置为false，Object.keys  for in 就不会访问到，但是可以打.访问
//configurable是不可配置的，例如不可操作删除，并且设置为false后不可扭逆转。
