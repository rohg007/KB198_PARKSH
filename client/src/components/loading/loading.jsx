import React from 'react';
import './loading.css';

function Loading({ loadingColor, ...props }) {
  const loadingDefault = '#ffff';
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100%' }}
    >
      <div
        className='dot1'
        style={{
          background: loadingColor ? loadingColor : loadingDefault,
        }}
      ></div>
      <div
        className='dot2'
        style={{
          background: loadingColor ? loadingColor : loadingDefault,
        }}
      ></div>
      <div
        className='dot3'
        style={{
          background: loadingColor ? loadingColor : loadingDefault,
        }}
      ></div>
      <div
        className='dot4'
        style={{
          background: loadingColor ? loadingColor : loadingDefault,
        }}
      ></div>
      <div
        className='dot5'
        style={{
          background: loadingColor ? loadingColor : loadingDefault,
        }}
      ></div>
    </div>
  );
}

export default Loading;
