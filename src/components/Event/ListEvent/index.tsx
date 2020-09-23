import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakAccordion from '../../../oakui/OakAccordion';
import EventLink from './EventLink';
import OakExpansion from '../../../oakui/OakExpansion';
import DetailSection from '../ViewEvent/DetailSection';

interface Props {
  space: string;
  history: any;
}

const ListEvent = (props: Props) => {
  const events = useSelector(state => state.event.events);
  const gotoCreatePage = () =>
    props.history.push(`/${props.space}/event/create`);
  return (
    <OakPage>
      <OakSection>
        <OakHeading
          title="Upcoming events"
          links={[
            {
              label: 'New event',
              icon: 'event',
              action: gotoCreatePage,
            },
          ]}
          linkSize="large"
        />
        <div className="list-event">
          {events?.map(item => (
            <div className="list-event--container">
              <OakExpansion group="test" collapseOthers key={item._id}>
                <div slot="header">
                  <EventLink
                    key={item._id}
                    space={props.space}
                    history={props.history}
                    event={item}
                  />
                </div>
                <div slot="content" className="list-event--content">
                  lorem
                </div>
              </OakExpansion>
            </div>
          ))}
        </div>
      </OakSection>
    </OakPage>
  );
};

export default ListEvent;
