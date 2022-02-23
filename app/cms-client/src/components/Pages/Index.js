import React from 'react';
import { loadComponent } from 'lib/Injector';
import { Link } from 'react-router-dom';

const LeftAndMain = loadComponent('LeftAndMain');

const Page = () => (
  <LeftAndMain>
    This is the default landing page
    <Link to="/admin/innovation/foo">Foo</Link>
    <Link to="/admin/innovation/bar">Bar</Link>
  </LeftAndMain>
);

export default Page;
