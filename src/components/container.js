import React from 'react';
import ChatBox from './chatBox'
import Login from './login'
import Register from './register'
import './chatBox.css';



class Container extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      this.state = {
          switch: {
            register: 'none',
            login: 'block',
            chat: 'none'
        }
      }
    }
  
    // eslint-disable-next-line react/no-typos
    componentDidMount() {}  
    
    updateState= (state) => {
        this.setState({
            switch: state,
        });
    }

    render() {
      return (
        <div>
        <div style={{ display: this.state.switch.login}}>
        <Login updateState={this.updateState}/>
        </div>
       
        <div style={{ display: this.state.switch.chat, height: '100vh'}}>
        <ChatBox updateState={this.updateState}/>
        </div>
        
        <div style={{ display: this.state.switch.register}}>
        <Register updateState={this.updateState}/>
        </div>
        
        </div>
      );
    }
  }

  export default (Container);