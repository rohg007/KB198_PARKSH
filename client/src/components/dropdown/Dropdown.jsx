import React from 'react';
import ArrowDown from './arrowDown.jsx';
import './Dropdown.css';

function Dropdown({ label, categories, selectedItem, hasError }) {
  const [labelCategory, setLabelCategory] = React.useState('');
  return (
    <div className='container-fluid p-0'>
      <p className={`m-0 pb-2`} style={{ fontSize: '16px', fontWeight: '640' }}>
        {label}
      </p>
      <div className='dropdown p-0'>
        <div
          id='dropdownMenuButton'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          <div
            className={` m-0 ${
              hasError ? 'errorDropdown' : 'dropdownVal'
            } shadow-none`}
          >
            {labelCategory ? labelCategory : 'Select an Option'}

            <div className='float-right'>
              <ArrowDown color='#90a8be' />
            </div>
          </div>
        </div>
        <div
          style={{ borderRadius: '8px' }}
          className={`dropdown-menu dropdownMenu mt-1 p-0`}
          aria-labelledby='dropdownMenuButton'
        >
          {categories.map((category) => {
            return (
              <div key={category}>
                <div
                  className='dropdownLink'
                  onClick={() => {
                    setLabelCategory(category);
                    selectedItem(category);
                  }}
                >
                  <p className='m-0'>{category}</p>
                </div>
                <hr className=' p-0 m-0 ' style={{ color: '#90a8be' }} />
              </div>
            );
          })}
          {label === 'Disease' ? (
            <div
              className='dropdownLink'
              onClick={() => {
                setLabelCategory('Other');
                selectedItem('Other');
              }}
            >
              Other
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
