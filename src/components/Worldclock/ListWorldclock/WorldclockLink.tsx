import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { convertToTimeZone, formatToTimeZone } from 'date-fns-timezone';

import './WorldclockLink.scss';

interface Props {
  timeZone?: string;
  currentTime: Date;
}

const WorldclockLink = (props: Props) => {
  const [state, setState] = useState({ currentTime: new Date() });

  useEffect(() => {
    setState({
      ...state,
      currentTime: props.timeZone
        ? convertToTimeZone(props.currentTime, { timeZone: props.timeZone })
        : props.currentTime,
    });
  }, [props.timeZone, props.currentTime]);
  return (
    <div className="worldclock-link">
      <div className="worldclock-link--left">
        <div className="worldclock-link--left--title">{props.timeZone}</div>
        <div className="worldclock-link--left--subtitle">
          {format(state.currentTime, 'EEEE')}
        </div>
      </div>
      <div className="worldclock-link--right">
        <div className="worldclock-link--right--time">
          {format(state.currentTime, 'hh:mm:ss')}
        </div>
        <div className="worldclock-link--right--am">
          {format(state.currentTime, 'a')}
        </div>
      </div>
    </div>
  );
};

export default WorldclockLink;
