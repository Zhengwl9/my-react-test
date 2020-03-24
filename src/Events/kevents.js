function Event() {
  this.listeners={};
}

Event.prototype={
  constructor:Event,
  on(type,cb){
    if(typeof type!=="string" || typeof cb !=="function"){
      throw new Error("type must be String and cb must be a function!")
    }
    if(!this.listeners[type]){
      this.listeners[type]=[];
    }
    this.listeners[type].push(cb);
    return ()=>{this.remove(type,cb)}
  },
  emit(type,...args){
    if(typeof type!=="string"){
      throw new Error("type must be String!")
    }
    let cbs=this.listeners[type];
    if(!cbs) return;
    cbs.forEach(cb=>{
      cb(...args)
    })
  },
  remove(type,fn){
    if(typeof type !=="string"){
      throw new Error("type must be String!")
    }
    if(!fn){
      this.listeners[type] && delete this.listeners[type]
    }
    var restCbs=[];
    if(this.listeners[type]){
      restCbs=this.listeners[type].filter(cb => cb !== fn);
    }
    if(restCbs.length===0){
      delete this.listeners[type]
    }else{
      this.listeners[type]=restCbs;
    }
    console.log(this.listeners);

  }
};
export default Event;


