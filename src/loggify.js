import React , {Component} from 'react'
import styled from 'styled-components'

export default function loggify(Wrapped){

  const originals = {}

  const methodsToLog = ['componentWillMount', 'componentDidMount','componentWillUnmount','componentWillReceiveProps','shouldComponentUpdate','componentWillUpdate','comcomponentDidUpdate']

  methodsToLog.forEach((method) => {
    if (Wrapped.prototype[method]){
      originals[method] = Wrapped.prototype[method]
    }

    Wrapped.prototype[method] = function(...args){
      let original = originals[method]
      console.groupCollapsed(`${Wrapped.displayName} called ${method}`)

      if(method === 'componentWillReceiveProps'|| 'shouldComponentUpdate' || 'componentWillUpdate'){
        console.log("next props", args[0]);
      }
      if(method === 'shouldComponentUpdate'|| 'componentWillUpdate'){
        console.log("next state", args[1]);
      }
      if(method === 'componentDidUpdate'){
        console.log("prevProps",args[0]);
        console.log('prevState',args[1]);
      }
      console.groupEnd()

      if(original){
        original = original.bind(this)
        return original(...args)
      }
      if(method === 'shouldComponentUpdate' && typeof original === 'undefined'){
        return true
      }

    }

  })

  return class extends Component{

    render(){
      return(
        <LoggerComponent>
        <H2>{Wrapped.displayName} is logged</H2>
        <Wrapped
          {...this.props} />
        </LoggerComponent>
      )
    }
  }
}
const LoggerComponent = styled.div`
  background-color : aliceblue;
  border: 2px bold;
  border-radius: 5px;`

LoggerComponent.displayName = 'LoggerComponent';

const H2 = styled.h2`
  color : red;`
