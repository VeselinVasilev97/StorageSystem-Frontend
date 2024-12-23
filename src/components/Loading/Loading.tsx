import React from 'react';
import classes from  './Loading.module.css';

const Loading: React.FC = () => {
  return (
    <div className={classes.loadingSpinner}>
      <div className={classes.spinner} />
    </div>
  );
};

export default Loading;
