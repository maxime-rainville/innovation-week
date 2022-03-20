import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ id, title, picture, path }) => (
  <Link className="item" to={`${path}/${id}`}>
    <div className="item__thumbnail" style={{ backgroundImage: `url(${picture}?id=${id})` }} />
    <div className="item__title">{title}</div>
  </Link>
);

export default Item;
