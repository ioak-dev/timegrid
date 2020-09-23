import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import DetailSection from './DetailSection';
import OakTab from '../../../oakui/OakTab';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ViewEvent = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const query = queryString.parse(props.location.search);
  const event = useSelector(state =>
    state.event.events.find(item => item._id === query.id)
  );

  const tabMeta = [
    {
      slotName: 'overview',
      label: 'Overview',
      icon: 'dehaze',
    },
    {
      slotName: 'member',
      label: 'Members',
      icon: 'people',
    },
    {
      slotName: 'administrator',
      label: 'Administrators',
      icon: 'admin_panel_settings',
    },
  ];

  return (
    <OakPage>
      <OakTab meta={tabMeta} variant="fullpage">
        <div slot="overview">
          <OakSection>
            <DetailSection
              event={event}
              space={props.space}
              history={props.history}
            />
          </OakSection>
        </div>
        <div slot="member">
          <OakSection>member</OakSection>
        </div>
        <div slot="administrator">
          <OakSection>admin</OakSection>
        </div>
      </OakTab>
    </OakPage>
  );
};

export default ViewEvent;
