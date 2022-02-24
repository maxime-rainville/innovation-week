import React from 'react';

const Widget = ({ lastname, firstname, email }) => (
  <ul>
    <li>{firstname}</li>
    <li>{lastname}</li>
    <li>{email}</li>
  </ul>
);


export default Widget;
