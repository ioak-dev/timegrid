import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, formatDuration, formatDistanceToNow } from 'date-fns';

import './EventLink.scss';

interface Props {
  space: string;
  history: any;
  event: any;
}

const EventLink = (props: Props) => {
  const goToViewPage = () =>
    props.history.push(`/${props.space}/event/view?id=${props.event._id}`);
  return (
    <div className="event-link" onClick={goToViewPage}>
      <div className="event-link--left">
        <div className="event-link--left--name">{props.event.name}</div>
      </div>
      <div className="event-link--right">
        <div className="event-link--right--occurrence-datetime">
          {format(new Date(props.event.occurrence), 'd MMM yyyy, hh:mm a')}
        </div>
        <div className="event-link--right--occurrence-remaining">
          {formatDistanceToNow(new Date(props.event.occurrence))}
          {/* {new Date(props.event.occurrence) - new Date()} */}
        </div>
      </div>
    </div>
  );
};

export default EventLink;
