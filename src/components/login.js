import React from 'react';
import './login.css';
import { Input } from 'semantic-ui-react';
import { socket } from './socket';
import PropTypes from 'prop-types';


class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        msgData: [],
        activePage: 'signin'
      }
    }

    static propTypes = {
      updateState: PropTypes.func.isRequired,
    };
  
    componentDidMount() {}

    register = () => {
      const userName = document.getElementById('userNameRgstr');
      const password = document.getElementById('passwordRgstr');
        fetch('/api/register/add', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ 
              userName: userName.value,
              password: password.value })
        }).then(() => {
          this.props.updateState({
            login : 'block',
            chat : 'none',
            register: 'none'
          });
        });
        userName.value = null;
        password.value = null;
    }

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
              alert('Password is incorrect');
            }
          }
          else {
            alert('User not found');
          }
        });
       
    }

    displayRegister = () => {
      const style = {};
      style.opacity= this.state.activePage === 'signup' ? '1' : '0.4';
      style.width = this.state.activePage === 'signup' ? '60%' : '40%';
      style.transition = '1.5s';

      const view = <div className="card" style={style}>
      <div className="form">
        <div className="placeholder">
          <Input id='userNameRgstr' placeholder='Enter Username ' />
        </div>
        <div className="placeholder right" style={{
          margin: '39px 0'
        }}>
          <Input id='passwordRgstr' placeholder='Password' type='password' />
        </div>
        <div className="button-container">
        
        <button className="btn-sec" style={{
          margin: '10px 0'
          }}
          onClick={() => {
            
            this.setState({activePage: 'signin'})
  
          }}>
          SIGN IN
        </button>
        <button className="btn-sec" style={{
         margin: '10px 0'
         }}
         onClick={() => {
            this.register()
         }}>
          REGISTER
        </button>
        </div>
        </div>
      </div>;

      return view;
    }

    displayLogin =() => {
      const style = {};
      style.opacity= this.state.activePage === 'signin' ? '1' : '0.4';
      style.width = this.state.activePage === 'signin' ? '60%' : '40%';
      style.transition = '1.5s';

      const view = <div className="card2" style={style}>
        <div className="form2">
          <div className="placeholder">
            <Input id='userName' placeholder='Enter Username ' />
          </div>
          <div className="placeholder right" style={{
            margin: '39px 0'
          }}>
            <Input id='password' placeholder='Password' type='password' />
          </div>
          <div className="button-container">
          
          <button className="btn-sec" style={{
            margin: '10px 0'
            }}
            onClick={() => {
              this.setState({activePage: 'signup'})
            }}>
            SIGN UP
          </button>
          <button className="btn-pri" style={{
           margin: '10px 0'
           }}
           onClick={() => {
              this.login()
           }}>
            LOGIN
          </button>
          </div>
          </div>
        </div>;
        return view;
    }

    render() {
      return (
        <div style={{height: '100%'}}>
          <div className="header"></div>
          <div className="container">
          {this.displayRegister()}
          {this.displayLogin()}
        </div>
          </div>
        
        
      );
    }
  }

  export default (Login);