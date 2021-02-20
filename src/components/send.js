import React from 'react';
// import PropTypes from 'prop-types';
import './send.css'
import { socket } from './socket';



class Send extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      this.state = {
        msgData: [],
      }
    }
    
    sendMsg = () => {
        const target = document.getElementById('msgBox');
        console.log(target.value);
        
        socket.emit('which_user', null);
        socket.on('this_user', user => {
          console.log(user);
          if (target.value) {
            fetch('/api/message/send', {
              method: 'post',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({message: target.value, user: user})
          });
          }
        target.value = null;
        });
    }

    render() {
      return (
        <div className="inputBox">
            <div className="textBox">
            <input id="msgBox" placeholder='Type Your Message'/>
            </div>
            <div className="sendBtn">
            <button onClick={() => {this.sendMsg()}}>
              Send
            </button>
            </div>
            </div>
        );
    }
}

export default (Send)