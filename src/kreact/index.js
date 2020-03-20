function createElement(type, props, ...children) {
  delete props.__source;
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === "object" ? child : createTextElement(child)
      })
    }
  }
}

const vdom = {
  "type": "div",
  "props": {
    "children": [
      {
        "type": "h1",
        "props": {
          "children": [
            {
              "type": "TEXT",
              "props": {
                "nodeValue": "百度",
                "children": []
              }
            }
          ]
        }
      },
      {
        "type": "p",
        "props": {
          "children": [
            {
              "type": "TEXT",
              "props": {
                "nodeValue": "百度内容",
                "children": []
              }
            }
          ]
        }
      },
      {
        "type": "a",
        "props": {
          "href": "https://www.baidu.com",
          "children": [
            {
              "type": "TEXT",
              "props": {
                "nodeValue": "跳转",
                "children": []
              }
            }
          ]
        }
      }
    ]
  }
};


//文本类型的虚拟dom创建
function createTextElement(text) {
  return {
    type: "TEXT",
    props: {
      nodeValue: text,
      children: [],
    }
  }
}

/**
 * @param {虚拟dom} vdom
 * @param {容器} container
 **/
function render(vdom, container) {
  console.log(vdom);
  const dom = vdom.type === "TEXT" ? document.createTextNode('') : document.createElement(vdom.type);
  Object.keys(vdom.props).filter(key => key !== "children").forEach(name => {
    dom[name] = vdom.props[name];
  });
  vdom.props.children.forEach(child => {
    render(child, dom)
  });
  container.appendChild(dom)
  // container.innerHTML=`<pre>${JSON.stringify(vdom,null,2)}</pre>`
}

//render会初始化第一个任务
//下一个单元任务
let nextUnitOdWork = null;

//调度diff或者渲染任务
function workLoop(deadline) {
  while (nextUnitOdWork && deadline.timeRemaining() > 1) {
    nextUnitOdWork = performUnitOfWork(nextUnitOdWork)
  }
  window.requestIdleCallback(workLoop)
}

//启动空闲时间处理
window.requestIdleCallback(workLoop)

//根据当前的任务，获取下一个任务
function performUnitOfWork() {

}


export default {
  createElement,
  render,
};
