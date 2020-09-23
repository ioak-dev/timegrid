import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listTimeZones } from 'timezone-support';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import WorldclockLink from './WorldclockLink';
import OakAutoComplete from '../../../oakui/OakAutoComplete';

interface Props {
  space: string;
  history: any;
}

const ListWorldclock = (props: Props) => {
  const projects = useSelector(state => state.project.projects);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeZoneList, setTimeZoneList] = useState<
    { key: string; value: string }[]
  >([]);

  const [test, setTest] = useState('Europe/Berlin');

  useEffect(() => {
    console.log('COMPONENT MOUNTED');
    setInterval(() => setCurrentTime(new Date()), 50);
    setTimeZoneList(
      listTimeZones().map(item => {
        return { key: item, value: item };
      })
    );
  }, []);

  const addTimeZone = newTimeZone => {
    setTest(newTimeZone);
  };

  return (
    <OakPage>
      <OakSection>
        <OakHeading title="World clock" />

        <OakAutoComplete
          handleChange={addTimeZone}
          objects={timeZoneList}
          label="Add a new time zone"
        />
        <WorldclockLink currentTime={currentTime} />
        <div className="list-worldclock">
          {projects?.map(item => (
            <WorldclockLink
              key={item._id}
              timeZone={test}
              currentTime={currentTime}
            />
          ))}
        </div>
      </OakSection>
    </OakPage>
  );
};

export default ListWorldclock;
