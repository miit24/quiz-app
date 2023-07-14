import React from 'react';

const HtmlDisplay = ({ htmlText }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlText }} />;
};

export default HtmlDisplay;
