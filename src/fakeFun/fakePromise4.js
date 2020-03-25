function FakePromise(executor){
  var _this=this;
  _this.status="pending";
  _this.value=undefined;
  _this.reason=undefined;
  _this.onResolvedCallbacks=[];
  _this.onRejectedCallbacks=[];
  function resolve(value){
    if(_this.status==="pending"){
      _this.status="resolved";
      _this.value=value;
      _this.onResolvedCallbacks.forEach(function (fn) {
        fn();
      })
    }
  }
  function reject(reason) {
    if(_this.status==="pending"){
      _this.status="rejected";
      _this.reason=reason;
      _this.onRejectedCallbacks.forEach(function (fn) {
        fn();
      })
    }
  }
  try{
    executor(resolve,reject)
  }catch (e) {
    reject(e)
  }
}

FakePromise.prototype.then=function (onFulfilled,onRejected) {
  onFulfilled=typeof onFulfilled ==="function"?onFulfilled : function (data) { return data; };
  onRejected=typeof onRejected ==="function"?onRejected : function (err) { throw new Error(err)};
  var _this=this;
  var promise2;
  if(_this.status==="resolved"){
    promise2=new FakePromise(function (resolve,reject) {
      try{
        let x=onFulfilled(_this.value);
        resolvePromise(promise2,x,resolve,reject)
      }catch (e) {
        reject(e)
      }
    });
  }
  if(_this.status==="rejected"){
    promise2=new FakePromise(function (resolve,reject) {
      try{
        let x=onRejected(_this.reason);
        resolvePromise(promise2,x,resolve,reject)
      }catch (e) {
        reject(e)
      }
    });
  }
  if(_this.status==="pending"){
    promise2=new FakePromise(function (resolve,reject) {
      _this.onResolvedCallbacks.push(function () {
        try{
          let x=onFulfilled(_this.value);
          resolvePromise(promise2,x,resolve,reject)
        }catch (e) {
          reject(e)
        }
      });
      _this.onRejectedCallbacks.push(function () {
        try{
          let x=onRejected(_this.reason);
          resolvePromise(promise2,x,resolve,reject)
        }catch (e) {
          reject(e)
        }
      })
    });
  }
  return promise2;
};


function resolvePromise(promise2,x,resolve,reject) {
  if(x===promise2){
    throw new TypeError("循环调用了！")
  }
  if(x!== null && (typeof x ==="object" || typeof x==="function")){
    try{
      let then =x.then;
      if(typeof then==="function"){
        then.call(x,function (y) {
          resolvePromise(promise2,y,resolve,reject)
        },function (err) { //失败
          reject(err);
        })
      }
    }catch (e) {
      reject(e);
    }
  }else{
    resolve(x)
  }
}


var myPromise=new FakePromise((resolve,reject)=>{
  setTimeout(()=>{
    let i=0;
    if(i===1){
      resolve(i)
    }else{
      reject(i)
    }
  },200)
});
myPromise.then((data)=>{
  console.log(data);
  return data;
},(err)=>{
  console.log(err);
  return err+1
}).then((data)=>{
  console.log(data);
  return data;
},(err)=>{
  console.log(err);
});
