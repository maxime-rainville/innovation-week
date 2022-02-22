import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { loadComponent } from 'lib/Injector';

const breadcrumbs = [
  {
    text: 'Innovation Week',
    href: 'innovation-week',
  },
];

const LeftAndMain = loadComponent('LeftAndMain');

const InnovationWeek = () => {
  const [md, setMd] = useState('# Loading... please wait\n\nMark down work!!!');

  return (
    <LeftAndMain>
      <ReactMarkdown>{md}</ReactMarkdown>
    </LeftAndMain>
  );
};

export default InnovationWeek;
