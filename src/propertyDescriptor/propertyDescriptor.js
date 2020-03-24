// "use strict"
var obj={
  age:18,
};
function defineProperty(obj,key,value) {
  // var value="hh"
  Object.defineProperty(obj,key,{
    value:value,
    writable:true,
    configurable:true,
    enumerable:true,
    // get() {
    //   return value;
    // },
    // set:(v)=> {
    //   value=v;
    // }
  });
}
defineProperty(obj,"name");
obj.name="zcm";
delete obj.name;
Object.defineProperty(obj,"name",{
  value:"ag",
  writable:true,
  configurable: false
});
for (var key in obj){
  console.log(key);
}
console.log(Object.keys(obj));
console.log(obj.name);



Object.defineProperties(obj,{
  id:{
    value:1,
    writable:true,
    enumerable:true,
    configurable:true,
  }
})
