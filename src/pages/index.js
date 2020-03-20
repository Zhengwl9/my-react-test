import React from 'react'
class MyComp extends React.Component {
  render() {
    return <div>分公司法规</div>
  }
}

function Hoc(WapperComponent) {
  return function() {
    return WapperComponent;
  }
}

Hoc(MyComp);

function Hoc1(...args) {
  return function(WapperComponent) {
    return function() {
      return WapperComponent;
    }
  }
}
Hoc1('data')(MyComp);
