import React from 'react';

const InfoRoute = ({ globalLines }) => {
  return (
    <div className='route-names'>
      {globalLines.map((elem, ind) => {
        return <span key={ind} style={{backgroundColor: elem.color.color}}>{elem.route}</span>
      })}
    </div>
  )
}

export default InfoRoute