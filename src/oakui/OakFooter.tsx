import React, { useState, useEffect } from 'react';
import './styles/oak-footer.scss';

interface Props {
  children?: any;
}

const OakFooter = (props: Props) => {
  return (
    <div className="oak-footer">
      <div className="oak-footer--container">{props.children}</div>
    </div>
  );
};

export default OakFooter;
