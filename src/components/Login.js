import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../actions/shared'


class Login extends Component {

    state = {
        user: "",
        login_failed: false
    };

    componentDidMount(){
        // redirect to home if user is already authenticated
        this.props.authedUser && this.props.history.push('/home')
    }

    handleUserSelected = (user) => {
        if(user !== ""){
            this.setState({
                user: user,
                login_failed: false,
            });
        }  
    }

    handleClick = ()  => {
        if(this.state.user !== ""){
            this.props.dispatch(authenticate(this.state.user))
            this.props.match.params.id 
                ? this.props.history.push(`/questions/${this.props.match.params.id }`)
                : this.props.history.push('/home')
        }else{
            this.setState({
                login_failed: true,
            });
        }
    }

    render() {
      const { users } = this.props
      const { login_failed, user } = this.state
      return (
          <div className="login-box"> 
              <p className="text-center">Login to play</p>
              {login_failed &&
                <div>
                    <small>You have to choose a user to login</small><br /><br />
                </div>
              }
              <select className="form-control" value={user} onChange={(e) => this.handleUserSelected(e.target.value)}>
                <option value="">Choose a User</option>
                {users.length > 0 &&
                    users.map((user) => (
                    <option value={user.id} key={user.id}>{user.name}</option>
                ))}
              </select>
              <button className="btn-login form-control" type="submit" onClick={this.handleClick}>
                  Login
              </button>
          </div>
      );
    }
}

function mapStateToProps ({ users, authedUser }) {
    var userArray = [];
    Object.entries(users).forEach(
        ([key, value]) => 
        userArray.push({
            id: value.id,
            name: value.name,
        })
    );
    return {
        users: userArray,
        authedUser
    }
}
  
  export default connect(mapStateToProps)(Login);