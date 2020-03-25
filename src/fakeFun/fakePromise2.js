
function KPromise(executor) {
  let _this = this;
  _this.status = "pending";
  _this.value = undefined;
  _this.reason = undefined;
  _this.onResolvedCallbacks = [];
  _this.onRejectedCallbacks = [];

  function resolve(value) {
    if (_this.status === "pending") {
      _this.status = "resolved";
      _this.value = value;
      _this.onResolvedCallbacks.forEach(function (fn) {
        fn();
      })
    }
  }
  function reject(reason) {
    if (this.status === "pending") {
      _this.status = "rejected";
      _this.reason = reason;
      _this.onRejectedCallbacks.forEach(function (fn) {
        fn();
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

KPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : function (value) {
    return value
  };
  onRejected = typeof onRejected === "function" ? onRejected : function (err) {
    throw err;
  };
  let _this = this;
  let promise2;
  if (_this.status === "resolved") {
    onFulfilled(_this.value);
    promise2 = new KPromise(function (resolve, reject) {
      try {
        let x = onFulfilled(_this.value)
        resolvePromise(promise2, x, resolve, reject);
      } catch (e) {
        reject(e)
      }
    })
  }
  if (_this.status === "rejected") {
    onRejected(_this.reason)
    promise2 = new KPromise(function (resolve, reject) {
      try {
        let x = onFulfilled(_this.value)
        resolvePromise(promise2, x, resolve, reject);
      } catch (e) {
        reject(e)
      }
    })
  }
  if (_this.status === "pending") {
    promise2 = new KPromise(function (resolve, reject) {
      _this.onResolvedCallbacks.push(
        function () {
          try {
            let x = onFulfilled(_this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }
      );
      _this.onRejectedCallbacks.push(
        function () {
          try {
            let x = onRejected(_this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }

        }
      )
    })
  }
  return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
  if(promise2===x){
    return reject(new TypeError("循环引用了"))
  }
  let called;
  if(x!=null && (typeof x === "object" || typeof x ==="function")){
    try{
      let then =x.then;
      if(typeof then==="function"){
        then.call(x,function (y) {
          if(called) return;
          called=true;
          resolve(promise2,y,resolve,reject)
        },function (err) {
          if(called) return;
          called=true;
          reject(err)
        })
      }else{
        resolve(x)
      }
    }catch(e){
      if(called) return;
      called=true;
      reject(e)
    }
  }else{
    resolve(x)
  }
}





let p = new KPromise((resolve, reject) => {
  let i = 0;
  setTimeout(() => {
    if (i === 0) {
      resolve(i);
    } else {
      reject(i);
    }
  }, 200)
});
p.then(data => {
  console.log(data);
  return 3
}).then(data=>{
  console.log(data);
});

