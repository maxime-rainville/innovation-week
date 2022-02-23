import React from 'react';
import { loadComponent } from 'lib/Injector';
import { Link } from 'react-router-dom';

const LeftAndMain = loadComponent('LeftAndMain');

const Page = () => (
  <LeftAndMain>
    Invalid Route 404
    <Link to="/admin/innovation">Back home</Link>
  </LeftAndMain>
);

export default Page;
