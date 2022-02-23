import React from 'react';
import { loadComponent } from 'lib/Injector';
import { Link } from 'react-router-dom';

const LeftAndMain = loadComponent('LeftAndMain');

const Page = () => (
  <LeftAndMain>
    This is a Foo page
    <Link to="/admin/innovation">Back</Link>
  </LeftAndMain>
);

export default Page;
