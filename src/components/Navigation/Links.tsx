import React from 'react';

import './Links.scss';
import { NavLink } from 'react-router-dom';
import OakButton from '../../oakui/OakButton';

interface Props {
  space: string;
}

const Links = (props: Props) => {
  return (
    <div className="links">
      <NavLink
        to={`/${props.space}/event`}
        className="navitem"
        activeClassName="active"
      >
        Events
      </NavLink>
      <NavLink
        to={`/${props.space}/project`}
        className="navitem"
        activeClassName="active"
      >
        Groups
      </NavLink>
      <NavLink
        to={`/${props.space}/worldclock`}
        className="navitem"
        activeClassName="active"
      >
        World clock
      </NavLink>
    </div>
  );
};

export default Links;
