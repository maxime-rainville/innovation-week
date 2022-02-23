import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { loadComponent } from 'lib/Injector';

// Top actions
const topActions = [
  { label: "Save", color: "primary", value: 'save'},
  { label: "Delete", color: "secondary", value: 'delete'},
];

// Bottom actions
const bottomActions = [
  { label: "Edit", icon: "edit", color: "primary", outline: true, value: 'edit' },
];

const LeftAndMain = loadComponent('LeftAndMain');

const InnovationWeek = () => {
  const [md, setMd] = useState('# Loading... please wait\n\nMark down work!!!');

  const props = {
    topActions,
    bottomActions,
  };

  return (
    <LeftAndMain {...props}>
      <ReactMarkdown>{md}</ReactMarkdown>
    </LeftAndMain>
  );
};

export default InnovationWeek;
