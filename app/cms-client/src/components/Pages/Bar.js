import React from 'react';
import { loadComponent } from 'lib/Injector';
import { Link, withRouter } from 'react-router-dom';

const LeftAndMain = loadComponent('LeftAndMain');

const Page = ({ match: { params: { parameterOne, parameterTwo } } }) => (
  <LeftAndMain>
    This is a Bar page. parameterOne={parameterOne} parameterTwo={parameterTwo}
    <Link to="/admin/innovation">Back</Link>
  </LeftAndMain>
);

export default withRouter(Page);
