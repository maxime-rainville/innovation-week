import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames";

const TabComponent = (props) => {
  const { link, children, className, key } = props;

  const clickHandler = ()=> {
    console.log('clickHandler');
  };

  const tabClassName = classNames(
    className,
    {"nav-tabs__tab-item--current": false}
  );

  return (
    <li className={tabClassName} key={key}>
      <Link to={link} onClick={clickHandler}>{children}</Link>
    </li>
  )
};

export default TabComponent;
