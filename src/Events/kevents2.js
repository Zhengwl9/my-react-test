function Events(){
  this.listeners={};
}

Events.prototype={
  constructor:Events,
  on(type,cb) {
    if(typeof type !=="string" || typeof cb !=="function"){
      throw new TypeError("The argument type must be of String and cb must be of Function")
    }
    if(!this.listeners[type]){
      this.listeners[type]=[];
    }
    this.listeners[type].push(cb);
    return ()=> {this.remove(type,cb)};
  },
  emit(type,...args){
    if(typeof type !=="string" ){
      throw new TypeError("The argument type must be of String")
    }
    if(!this.listeners[type]){
      return
    }
    this.listeners[type].forEach(cb=>{
      cb(...args)
    })
  },
  remove(type,cb){
    if(typeof type !=="string" ){
      throw new TypeError("The argument type must be of String")
    }
    if(!cb){
      this.listeners[type] && delete this.listeners[type];
      console.log(this.listeners);
      return
    }
    if(this.listeners[type]){
      var restCbs=this.listeners[type].filter(item=> item !== cb);
      if(!restCbs.length){
        delete this.listeners[type];
        console.log(this.listeners);
        return
      }
      this.listeners[type]=restCbs;
      console.log(this.listeners);
    }
  }
};


var event=new Events();
let remove=event.on("test",(data)=>{
  console.log(data);
});
event.emit("test",{name:'zwl'});
remove();
