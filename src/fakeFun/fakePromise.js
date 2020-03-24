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
    if (_this.status === "pending") {
      _this.staus = "rejected";
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
  let promise2;
  let _this = this;
  if (_this.status === "resolved") {
    promise2 = new KPromise(function (resolve, reject) {
      try {
        let x = onFulfilled(_this.value)
        resolve(x)
      } catch (e) {
        reject(e)
      }
    })
  }
  if (_this.status === "rejected") {
    promise2 = new KPromise(function (resolve, reject) {
      try {
        let x = onRejected(_this.value);
        resolve(x)
      } catch (e) {
        reject(e)
      }
    })
  }
  if (this.status === "pending") {
    promise2=new KPromise((resolve,reject)=>{
      _this.onResolvedCallbacks.push(function () {
        try {
          let x=onFulfilled(_this.value);
          resolve(x)
        }catch (e) {
          reject(e)
        }
      });
      _this.onRejectedCallbacks.push(function () {
        try {
          let x=onRejected(_this.value);
          resolve(x)
        }catch (e) {
          reject(e)
        }
      })
    });
  }
  return promise2;
};


var result = new KPromise((resolve, reject) => {
  let res = 1;
  if (res === 1) {
    resolve(1);
  } else {
    reject(0);
  }
});
result.then((data) => {
  // console.log(data);
});

export {}





