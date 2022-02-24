import React, { useState, useEffect } from 'react';
import { loadComponent } from 'lib/Injector';
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import Index from './Pages/Index';
import Foo from './Pages/Foo';
import Bar from './Pages/Bar';

const breadcrumbs = [
  {
    text: 'Innovation Week',
    href: 'innovation-week',
  },
];

const AppContext = React.createContext({});

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

  const tabs = [
    { title: "FirstTab", link: `${path}/`},
    { title: "SecondTab", link: `${path}/second-tab` },
    { title: "ThirdTab", link: `${path}/third-tab`},
  ];

  return (
    <LeftAndMain topActions={topActions} tabs={tabs} tabComponent="TabComponent">
      <Switch>
        <Route path={`${path}/bar/:paramOne?/:paramTwo?`} component={Bar} />
        <Route path={`${path}/foo`} component={Foo} />
        <Route path={path} component={Index} exact />
      </Switch>
    </LeftAndMain>
  );
};

export default withRouter(InnovationWeek);
