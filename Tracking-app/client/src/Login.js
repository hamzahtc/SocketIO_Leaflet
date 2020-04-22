import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Login extends Component {
    state = {
        username : '',
      }
      onChangeInput = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        })
      }
    render() {
        return (
            <div>
                 <input type="text" value={this.state.username} name="username" placeholder="username" onChange={this.onChangeInput}></input>
                 <Link to={"/user/"+this.state.username}>Login</Link>
            </div>
        )
    }
}
