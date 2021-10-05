import React, { useState, useEffect } from 'react';
import './notifier.css';

function Notifier(props) {
  const [flag, setFlag] = useState(props.flag);
  if (flag) {
    setTimeout(() => {
      setFlag(false);
    }, '5000');
  }
  useEffect(() => {
    setFlag(props.flag);
  }, [flag]);

  return flag ? (
    <div className="notice-container">
      <div className="popup">
        <img
          src="check.png"
          alt="success"
          style={{ height: '2rem', marginRight: '0.5rem' }}
        />{' '}
        {props.message}{' '}
      </div>{' '}
    </div>
  ) : null;
}

export default function notify(flag, message) {
  console.log(flag);
  return <Notifier message={message} flag={flag} />;
}
