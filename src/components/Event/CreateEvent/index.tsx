import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakSubheading from '../../../oakui/OakSubheading';
import OakForm from '../../../oakui/OakForm';
import OakText from '../../../oakui/OakText';
import OakFooter from '../../../oakui/OakFooter';
import OakButton from '../../../oakui/OakButton';
import { saveEvent } from '../service';
import { sendMessage, newMessageId } from '../../../events/MessageService';
import OakEditor from '../../../oakui/OakEditor';
import OakDate from '../../../oakui/OakDate';

interface Props {
  space: string;
  history: any;
}

const CreateEvent = (props: Props) => {
  const goBack = () => props.history.goBack();
  const [state, setState] = useState({
    name: '',
    description: '',
    occurrence: new Date(),
  });
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);

  const handleChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleEditorChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const save = async () => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Creating event [${state.name}]`,
    });
    const response = await saveEvent(props.space, authorization, state);
    console.log(response);
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Event [${state.name}] created successfully`,
        duration: 3000,
      });
      props.history.push(`/${props.space}/event`);
    }
  };

  return (
    <OakPage>
      <OakSection>
        <OakHeading
          title="New event"
          links={[
            {
              label: 'Back',
              icon: 'reply',
              action: goBack,
            },
          ]}
          linkSize="large"
        />
        <div className="create-event">
          <OakForm>
            <OakText
              data={state}
              id="name"
              handleChange={handleChange}
              label="Event title"
            />
            <OakEditor
              data={state}
              id="description"
              handleChange={handleEditorChange}
              label="Event details"
            />
            <OakDate
              data={state}
              id="occurrence"
              handleChange={handleChange}
              label="Occurrence"
            />
          </OakForm>
          <OakFooter>
            <OakButton theme="primary" variant="appear" action={save}>
              Save
            </OakButton>
            <OakButton theme="default" variant="appear">
              Cancel
            </OakButton>
          </OakFooter>
        </div>
      </OakSection>
    </OakPage>
  );
};

export default CreateEvent;
