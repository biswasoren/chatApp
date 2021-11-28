import React from 'react';
import './notifier.css';

function Notifier(props) {
  const { message, flag } = props;

  console.log(flag);
  return flag ? (
    <div className="notice-container">
      <div className="popup">
        <img
          src="check.png"
          alt="success"
          style={{ height: '2rem', marginRight: '0.5rem' }}
        />{' '}
        {message}{' '}
      </div>{' '}
    </div>
  ) : null;
}

export default function notify(flag, message) {
  console.log(flag);
  return <Notifier message={message} flag={flag} />;
}
