import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';

const DynamicHelmet = ({ title }) => {
  const location = useLocation;
  const defaultBaseTitle = "Toy Topia";
  
  let generatedTitle = defaultBaseTitle;

  if (title) {
    generatedTitle = `${defaultBaseTitle} | ${title}`;
  } else {
    const pathName = location.pathname.substring(1);
    
    if (pathName) {
      const formattedPath = pathName.charAt(0).toUpperCase() + pathName.slice(1).replace('-', ' ');
      generatedTitle = `${formattedPath} | ${defaultBaseTitle}`;
    }
  }

  return (
    <Helmet>
      <title>{generatedTitle}</title>
    </Helmet>
  );
};

export default DynamicHelmet;