function KPromise(executor) {
  let _this=this;
  _this.status="pending";
  _this.value=undefined;
  _this.value=undefined;
  _this.onResolvedCallbacks=[];
  _this.onRejectedCallbacks=[];
  function resolve(value) {
    if(_this.status==="pending"){
      _this.status="resolved";
      _this.value=value;
      _this.onResolvedCallbacks.forEach(function (cb) {
        cb();
      })
    }
  }
  function reject(reason) {
    if(_this.status==="pending"){
      _this.status="rejected";
      _this.reason=reason;
      this.onRejectedCallbacks.forEach(function (cb) {
        cb();
      })
    }
  }
  try{
    executor(resolve,reject)
  }catch (e) {
    reject(e)
  }
}
KPromise.prototype.then=function (onFulfilled,onRejected) {
  onFulfilled=typeof onFulfilled ==="function"?onFulfilled:function(value){return value};
  onRejected=typeof onRejected ==="function"?onRejected:function(err){throw err};
  let _this=this;
  let promise2;
  if(_this.status==="resolved"){
    promise2=new KPromise((resolve,reject)=>{
      try{
        let x=onFulfilled(_this.value);
        resolvePromise(promise2,x,resolve,reject)
      }catch(e){
        reject(e)
      }
    })
  }
  if(_this.status==="rejected"){
    promise2=new KPromise((resolve,reject)=>{
      try{
        let x=onRejected(_this.reason);
        resolvePromise(promise2,x,resolve,reject)
      }catch (e) {
        reject(e)
      }
    })
  }
  if(_this.status==="pending"){
    promise2=new KPromise((resolve,reject)=>{
      _this.onResolvedCallbacks.push(function () {
        try{
          let x=onFulfilled(_this.value);
          resolvePromise(promise2,x,resolve,reject)
        }catch (e) {
          reject(e)
        }
      });
      _this.onResolvedCallbacks.push(function () {
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
    return reject(new TypeError("循环引用了！"))
  }
  let called;
  if(x !==null && (typeof x === "function" || typeof x ==="object")){
    try{
      let then = x.then;
      if(typeof then ==="function"){
        then.call(x,function (y) {
          if(called) return;
          called=true;
          resolvePromise(promise2,y,resolve,reject)
        },function (err) {
          if(called) return;
          called=true;
          reject(err)
        })
      }else{
        resolve(x)
      }
    }catch (e) {
      if(called) return;
      called=true;
      reject(e)
    }

  }else{
    resolve(x)
  }
}
