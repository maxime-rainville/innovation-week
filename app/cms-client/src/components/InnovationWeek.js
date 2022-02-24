import React, { useState, useEffect } from 'react';
import { loadComponent } from 'lib/Injector';
import { withRouter, Route, Switch } from 'react-router-dom';
import Index from './Pages/Index';
import Foo from './Pages/Foo';
import Bar from './Pages/Bar';

const LeftAndMain = loadComponent('LeftAndMain');

const InnovationWeek = ({ match, history: { push }, ...props }) => {
  const { path } = match;

  console.dir(props);

  const topActions = () => {

    let actions = [];

    props.breadcrumbs.map((el) => {
      let action = {};
      switch (el.text) {
        case 'Home':
          action.color = 'primary';
          action.icon = 'home';
          action.onClick = () => {
            push(path);
          }
          break;
        default:
          action.color = 'secondary';
          action.onClick = () => {
            push(`${path}/${el.href}`);
          }
          break;
      };
      action.label = el.text,
        action.value = el.href,

        actions.push(action);
    });

    return actions;
  };

  return (
    <LeftAndMain topActions={topActions()} breadcrumbs={props.breadcrumbs} currentPath={path}>
      <Switch>
        <Route path={`${path}/bar/:paramOne?/:paramTwo?`} component={Bar} />
        <Route path={`${path}/foo`} component={Foo} />
        <Route path={path} component={Index} exact />
      </Switch>
    </LeftAndMain>
  );
};

export default withRouter(InnovationWeek);
