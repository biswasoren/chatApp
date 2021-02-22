import React from 'react';
import Box from './box'
import Send from './send'
import './chatBox.css';
import { socket } from './socket';
import PropTypes from 'prop-types';



class ChatBox extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      this.state = {
        msgData: [],
        users: [],
      }
    }

    static propTypes = {
      updateState: PropTypes.func.isRequired,
    };
  
    // eslint-disable-next-line react/no-typos
    componentDidMount() {
      socket.on('all_users', (data) =>  {
        this.setState({
          users: data
        })
      });  
    }

    render() {
      return (
        <div style={{height: '100%'}}>
          <div className="header">
            <img src="icon.svg" alt="icon"/>
          </div>
          <div className="container">
            <div className="nav"> </div>
        <div style={{width: '90%'}}>
        <div style={{ display: 'flex', height: 'calc(100% - 106px)', margin: '22px'}}>
          <div className="message-info">
            <div className="message-header"> Anonymous Group </div>
          <div className="message-card">
          <Box />
          </div>
          </div>
        <div className="list"> 
          <div className="side-panel-header">Users
            </div>
            {
              this.state.users.length > 0 ? this.state.users.map(user => 
              <div className="side-panel-user-list"> {user}
                </div>)
                : null
            }
            </div>
        </div>
        <Send/>
        </div>
        </div>
        </div>
      );
    }
  }

  export default (ChatBox);