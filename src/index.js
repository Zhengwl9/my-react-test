// import React, {Component} from "react";
// import ReactDom from "react-dom";

// import {} from "./fakeFun/kBind"
import {} from "./fakeFun/fakePromise"
import './index.css'
import React,{Component}from "./kreact/index1"

let ReactDom=React;





function FuncCmp(props){
  return (
    <div className="border">name:{props.name}</div>
  )
}
class ClassCmp extends Component{
  constructor(props) {
    super(props);
    this.state={
      counter:0,
    }
  }
  handle=()=>{
    console.log(1);
  };
  render() {
    return (
      <div className="border">
        name:{this.props.name}
        <p>counter:{this.state.counter}</p>
        <button onClick={this.handle}>点击</button>
        {
          [0,1,2].map(item=><FuncCmp key={item} name={item} />)
        }
      </div>
    )
  }
}
let element=(
  <div>
    <div className="border">我是index页面</div>
    <ClassCmp name="这是class组件"/>
    <FuncCmp name="这是func组件"/>
  </div>
);
ReactDom.render(element,document.getElementById("root"));
