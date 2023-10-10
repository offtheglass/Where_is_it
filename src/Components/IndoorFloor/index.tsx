import React from 'react';
import './index.css'; // Import the CSS file
// indoor floor는 원래 react-naver-maps 이용할 때 쓰던거라서 10_7_commit 버전에서는 사용되지 않음

const IndoorFloor = (props) => {
  let engineeringhall = [1,2,3,4,5,6,7,8,9];
  let sciencehall = [1,2,3,4,5];

  let buildings = [sciencehall,engineeringhall];
  return (
    <div className='listindoor'>
        {buildings[props.building].map((floor, index) => (
        <button key={index} onClick={()=>{console.log(floor)}}>Floor {floor}</button>
      ))}
    </div>
  );
};

export default IndoorFloor