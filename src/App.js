import React, { Component } from 'react';
import loggify from './loggify';
import {Parent,ChildContainer,H2,H4,H5,Column} from './styled.js';

class App extends Component {
  static displayName  = "App"
  state = {
    parentPoll: 'no'
  }
  // fetchData = () =>{ //suppose fetched an Api
  //   console.log("Going to fetch data");
  //   setTimeout  (
  //     () => {
  //       console.log("Data retrived");
  //       this.setState({
  //         data: Math.random()
  //       })
  //     },1000
  //   )
  // }
  componentDidMount(){
    this.createParentPoll()
    this.canvasReference = this.refs.appcanvas.getContext('2d')
    this.canvasReference.fillStyle = 'blue'
    this.canvasReference.arc(75,75,50,0,2*Math.PI)
    this.canvasReference.fill()
  }
  createParentPoll = () =>{
    this.pollInterval = setInterval(
      () => {
        this.setState({
          parentPoll: getRandomInt(1,2)
        })
      },1500
    )
  }

  componentWillUnmount(){
    clearInterval(this.parentPoll)
  }
  shouldComponentUpdate(nextProps,nextState){
    if(nextState.parentPoll !== this.state.parentPoll){
      return true
    }
    return false
  }
  componentWillUpdate(nextProps, nextState){
    if(nextProps.parentPoll !== this.state.parentPoll){
      this.canvasReference.clearRect(0,0,200,200)
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.parentPoll !== this.state.parentPoll){
      let {canvasReference} = this
      canvasReference.fillStyle = (this.state.parentPoll % 2 === 1)?'green':'red'
      canvasReference.arc(75,75,50,0,2*Math.PI)
      canvasReference.fill()
    }
  }


  render() {
    const {showChild,parentPoll} = this.state
    return (
      <div>
      <Parent>
        <Column>
          <H2>{parentPoll}</H2>
          <canvas
            ref={"appcanvas"}
            height={200}
            width={400}
          />
          <button
            onClick={()=>{
              this.setState((prevState)=>{
                return{
                showChild: !prevState.showChild
              }
              })
            }}>
            {(showChild)?"Hide":"show"}
            </button>
            {(showChild)?(<Show
                parentPoll = {parentPoll}
              />):null}
        </Column>
      </Parent>
    </div>
        );
  }
}
class Show extends Component{
  static displayName = 'children'
  state = {
    poll: 'wait'
  }
  componentDidMount(){
    this.childData()
  }
  componentWillUnmount(){
    clearInterval(this.childInterval)
  }
  childData = () =>{
      this.childInterval = setInterval(
        () =>{
          console.log("Poll!!");
          this.setState({
            poll:getRandomInt(1,5)
          })
        },
        1000
      )
  }
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.parentPoll !== this.props.parentPoll){
      return true
    }
    if(nextState.data !== this.state.poll){
      return true
    }
    return false
  }
  render(){
          console.log("ff");
    return(
      <ChildContainer>
      <H4>Poll : {this.state.poll}</H4>
      <H5> parentpoll : {this.props.parentPoll}</H5>
      </ChildContainer>
    )
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

App = loggify(App);
// Show = loggify(Show);
export default App
