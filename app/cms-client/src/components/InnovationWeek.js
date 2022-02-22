import React, { useState, useEffect } from 'react';
import Toolbar from 'components/Toolbar/Toolbar';
import { Component as Breadcrumb } from 'components/Breadcrumb/Breadcrumb';
import ReactMarkdown from 'react-markdown';

const breadcrumbs = [
  {
    text: 'Innovation Week',
    href: 'innovation-week',
  },
];


const InnovationWeek = ({ mdUrl }) => {
  const [md, setMd] = useState('# Loading... please wait\n\nMark down work!!!');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(mdUrl);
        const content = await response.text();
        setMd(content);
      } catch (error) {
        setMd('# Could not load markdown file');
        console.error(error);
      }
    };

    fetchData();
}, []);


  return (
    <div className="fill-height">
      <Toolbar className="fill-width">
        <Breadcrumb multiline crumbs={breadcrumbs} />

      </Toolbar>
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  );
};

export default InnovationWeek;
