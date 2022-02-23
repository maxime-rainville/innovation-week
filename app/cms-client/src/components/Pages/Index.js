import React from 'react';
import { Link } from 'react-router-dom';

const Page = () => (
  <div>
    This is the default landing page
    <Link to="/admin/innovation/foo">Foo</Link>
    <Link to="/admin/innovation/bar">Bar</Link>
  </div>
);

export default Page;
