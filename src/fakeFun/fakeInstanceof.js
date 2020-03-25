function Person(name) {
  this.name=name;
}

var child=new Person();
// console.log(child instanceof Person);

var obj={};

function fakeInstanceOf(left ,right) {
  var temp=left;
  var result=false;
  while(temp.__proto__){
    if(temp.__proto__===right.prototype){
      result=true;
      break;
    }
    temp=temp.__proto__;
  }
  return result;
}

console.log(fakeInstanceOf(child, Person));


