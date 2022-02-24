import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Page = ({ match: { params: { paramOne, paramTwo } } }) => (
  <div>
    This is a Bar page. parameterOne={paramOne} parameterTwo={paramTwo}
    <Link to="/admin/innovation">Back</Link>
  </div>
);

export default withRouter(Page);
