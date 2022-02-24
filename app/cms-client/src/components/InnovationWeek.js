import React, { useState, useEffect } from 'react';
import { loadComponent } from 'lib/Injector';
import { withRouter, Route, Switch } from 'react-router-dom';
import Index from './Pages/Index';
import Foo from './Pages/Foo';
import Bar from './Pages/Bar';

const breadcrumbs = [
  {
    text: 'Innovation Week',
    href: 'innovation-week',
  },
];

const LeftAndMain = loadComponent('LeftAndMain');

const InnovationWeek = ({ match, history: { push }, ...props}) => {
  const { path } = match;

  const topActions = [
    {
      color: 'primary',
      label: 'Home',
      icon: 'home',
      value: 'home',
      onClick: () => {
        push(path);
      }
    },
    {
      color: 'secondary',
      label: 'Foo',
      value: 'foo',
      onClick: () => {
        push(`${path}/foo`);
      }
    },
    {
      color: 'secondary',
      label: 'Bar',
      value: 'bar',
      onClick: () => {
        push(`${path}/bar`);
      }
    },
  ];

  const currentPath = props.location.pathname;

  const tabs = [
    { title: "FirstTab", link: `${path}/`, currentPath: currentPath },
    { title: "SecondTab", link: `${path}/first-tab`, currentPath: currentPath },
    { title: "ThirdTab", link: `${path}/second-tab`, currentPath: currentPath },
  ];

  return (
    <LeftAndMain topActions={topActions} tabs={tabs}>
      <Switch>
        <Route path={`${path}/bar/:paramOne?/:paramTwo?`} component={Bar} />
        <Route path={`${path}/foo`} component={Foo} />
        <Route path={path} component={Index} exact />
      </Switch>
    </LeftAndMain>
  );
};

export default withRouter(InnovationWeek);
