import React from 'react';

import './DropLinks.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  space: string;
  handleClose: any;
}

const DropLinks = (props: Props) => {
  return (
    <div className="drop-links">
      <NavLink
        to={`/${props.space}/event`}
        className="navitem"
        activeClassName="active"
        onClick={props.handleClose}
      >
        Events
      </NavLink>
      <NavLink
        to={`/${props.space}/project`}
        className="navitem"
        activeClassName="active"
        onClick={props.handleClose}
      >
        Groups
      </NavLink>
      <NavLink
        to={`/${props.space}/worldclock`}
        className="navitem"
        activeClassName="active"
        onClick={props.handleClose}
      >
        World clock
      </NavLink>
    </div>
  );
};

export default DropLinks;
