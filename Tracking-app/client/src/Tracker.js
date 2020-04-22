import React, { Component } from 'react'
import io from 'socket.io-client';
import axios from 'axios';


let socket;
const ENDPOINT = 'localhost:5000';

export default class Tracker extends Component {
  
  state = {
    location : {},
    pucename : '',
    username : '',
  }
  componentDidMount(){
    socket = io(ENDPOINT);   
  }
  send = () => {

    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lng } =  pos.coords
      const pucename =  this.state.pucename
      const username =  this.state.username
      const newAdd = {lat:lat , lng:lng , pucename:pucename , username:username};
    /* axios.post('http://localhost:5000/carte/save',newAdd)
        .then(res => console.log(res.data)) 
        .then(socket.emit('updateLocation', { lat, lng , name }))*/
        socket.emit('join', this.state.username);
        socket.emit('updateLocation', { lat, lng , pucename , username})
        this.intervalID = setInterval(
          () => this.send(),
          10000
        );
    });
  }
    
onChangeInput = (e) => {
  this.setState({
    [e.target.name] : e.target.value
  })
}
  render() {
    return (
      <div>
          <input type="text" value={this.state.pucename} name="pucename" placeholder="pucename" onChange={this.onChangeInput}></input>
          <input type="text" value={this.state.username} name="username" placeholder="username" onChange={this.onChangeInput}></input>
          <button onClick={this.send}>Send Location</button>
      </div>
    )
  }
}
