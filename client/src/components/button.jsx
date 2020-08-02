import React from 'react';
import './button.css';

function Button({ disabled, ...props }) {
  return (
    <button
      className={`btn`}
      style={{
        borderRadius: '10px',
        backgroundColor: '#ff790e',
        color: '#fff',
        border: 0,
      }}
      disabled={disabled}
      {...props}
    >
      <p className={`btnText mb-0`} style={{ color: '#fff' }}>
        {props.children}
      </p>
    </button>
  );
}

export default Button;
