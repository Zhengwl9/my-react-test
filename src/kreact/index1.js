function createElement(type, props, ...children) {
  // delete props.__source;
  props.children = children;
  let vtype;
  if (typeof type === "string") {
    vtype = 1;
  }
  if (typeof type === "function") {
    vtype = type.isReactComponent ? 2 : 3;
  }
  return {
    vtype,
    type,
    props,
  }
}
export class Component {
  static isReactComponent = {};
  constructor(props) {
    this.props=props;
    this.state={};
  }
  setState=()=>{}
}

//处理文本节点
function mountTextNode(vnode, container) {
  const node = document.createTextNode(vnode);
  container.appendChild(node)
}

//处理原生标签
function mountHtml(vnode, container) {
  const node = document.createElement(vnode.type);
  const {children}=vnode.props;
  Object.keys(vnode.props).forEach(item=>{
    if(item==="className"){
      node.setAttribute("class",vnode.props[item])
    }
    if(item.slice(0,2)==="on"){
      node.addEventListener('click',vnode.props[item])
    }
  });
  children.forEach(child=>{
    if(Array.isArray(child)){
      child.forEach(item=>{
        mount(item,node)
      })
    }else{
      mount(child,node);
    }

  });
  container.appendChild(node);
}
//处理函数组件
function mountFunc(vnode,container) {
  const {type,props}= vnode;
  const node=new type(props);
  mount(node,container);
}

//处理class组件
function mountClass(vnode,container) {
  const {type,props}= vnode;
  const cmp=new type(props);
  const node=cmp.render();
  // console.log(node);
  mount(node,container);
}

function mount(vnode, container) {
  const {vtype} = vnode;
  if (!vtype) {
    mountTextNode(vnode, container);
  }
  if (vtype === 1) {
    mountHtml(vnode, container)
  }
  if (vtype === 3) {
    mountFunc(vnode, container)
  }
  if (vtype ===2) {
    mountClass(vnode, container)
  }
}

/**
 * @param {虚拟dom} vdom
 * @param {包装容器} container
 * **/
function render(vdom, container) {
  // console.log(vdom);
  // return container.innerHTML = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`;
  mount(vdom, container);
}

export default {createElement, render, Component}
