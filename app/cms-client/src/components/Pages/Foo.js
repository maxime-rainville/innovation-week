import React from 'react';
import { Link } from 'react-router-dom';

const Page = () => (
  <div>
    This is a Foo page
    <Link to="/admin/innovation">Back</Link>
  </div>
);

export default Page;
