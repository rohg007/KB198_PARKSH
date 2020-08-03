import React from 'react';

import './switchToggler.css';

function CheckField({ heading, ...props }) {
  return (
    <div className='container-fluid'>
      <div className='d-flex align-items-center'>
        <p className={`m-0 CardHeading`}>{heading}</p>
      </div>
      <div className='d-flex align-items-center'>
        <div className='px-2'>
          <div className='switch__container'>
            <input
              className={`switch switch__shadow`}
              type='checkbox'
              {...props}
            />
            <label htmlFor={props.id} className='mb-0'></label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckField;
