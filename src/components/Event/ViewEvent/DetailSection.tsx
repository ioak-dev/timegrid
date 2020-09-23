import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakSubheading from '../../../oakui/OakSubheading';
import OakButton from '../../../oakui/OakButton';
import OakFooter from '../../../oakui/OakFooter';
import OakForm from '../../../oakui/OakForm';
import OakText from '../../../oakui/OakText';
import OakDate from '../../../oakui/OakDate';
import { newMessageId, sendMessage } from '../../../events/MessageService';
import { saveEvent } from '../service';
import OakEditor from '../../../oakui/OakEditor';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  event: any;
}

const DetailSection = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const [state, setState] = useState({
    description: '',
    name: '',
    occurrence: '',
  });

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setState({ ...state, ...props.event });
  }, [props.event]);

  const handleChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    setIsEdited(true);
  };

  const handleEditorChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    setIsEdited(true);
  };

  const discardChanges = () => {
    setState({ ...state, ...props.event });
    setIsEdited(false);
  };

  const save = async () => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving event [${state.name}]`,
    });
    const response = await saveEvent(props.space, authorization, state);
    console.log(response);
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Event [${state.name}] saved successfully`,
        duration: 3000,
      });
      props.history.push(`/${props.space}/event`);
    }
  };

  return (
    <div className="event-detail-section">
      {props.event && (
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
            showTime
            min={new Date()}
          />
        </OakForm>
      )}
      {isEdited && (
        <OakFooter>
          <OakButton theme="primary" variant="appear" action={save}>
            Save
          </OakButton>
          <OakButton theme="default" variant="appear" action={discardChanges}>
            Discard
          </OakButton>
        </OakFooter>
      )}
    </div>
  );
};

export default DetailSection;
