import React from 'react';
import './login.css';
import { Button } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { socket } from './socket';
import PropTypes from 'prop-types';


class Login extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      this.state = {
        msgData: [],
      }
    }

    static propTypes = {
      updateState: PropTypes.func.isRequired,
    };
  
    // eslint-disable-next-line react/no-typos
    componentDidMount() {}

    login = () => {
      const userName = document.getElementById('userName');
      const password = document.getElementById('password');
        fetch('/api/register/login', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ 
              userName: userName.value })
        }).then(results => results.json())
        .then(info => {
          const usrData = info;
            if (usrData.length !== 0) {
            if (usrData[0].password === password.value) {
              socket.emit('add_user', userName.value);
              localStorage.setItem('active_user', userName.value);
              userName.value = null;
              password.value = null;
              this.props.updateState({
                login : 'none',
                chat : 'block',
                register: 'none'
              });
              
            }
            else {
              alert('Paswword is incorrect');
            }
          }
          else {
            alert('User not found');
          }

            
        });
       
    }

    render() {
      return (
        <div className="card">
        <div className="form">
          <div>
            <Input id='userName' placeholder='Enter Username ' />
          </div>
          <div style={{
            margin: '10px 0'
          }}>
            <Input id='password' placeholder='Password' type='password' />
          </div>
          <Button primary style={{
           margin: '10px 0'
           }}
           onClick={() => {
              this.login()
           }}>
            Login
          </Button>
          <div >
            New User ?
          </div>
          <Button secondary style={{
            margin: '10px 0'
            }}
            onClick={() => {
              this.props.updateState({
                login : 'none',
                chat : 'none',
                register: 'block'

              });
            }}>
            Sign Up
          </Button>
          </div>
        </div>
      );
    }
  }

  export default (Login);