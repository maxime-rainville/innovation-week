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

const InnovationWeek = ({ match, ...props}) => {
  const { path } = match;
  return (
    <LeftAndMain>
      <Switch>
        <Route path={`${path}/bar/:paramOne?/:paramTwo?`} component={Bar} />
        <Route path={`${path}/foo`} component={Foo} />
        <Route path={path} component={Index} exact />
      </Switch>
    </LeftAndMain>
  );
};

export default withRouter(InnovationWeek);
