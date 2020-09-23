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
import { saveProject } from '../service';
import { sendMessage, newMessageId } from '../../../events/MessageService';

interface Props {
  space: string;
  history: any;
}

const CreateProject = (props: Props) => {
  const goBack = () => props.history.goBack();
  const [state, setState] = useState({
    name: '',
    description: '',
  });
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);

  const handleChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const save = async () => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Creating group [${state.name}]`,
    });
    const response = await saveProject(props.space, authorization, state);
    console.log(response);
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Group [${state.name}] created successfully`,
        duration: 3000,
      });
      props.history.push(`/${props.space}/project`);
    }
  };

  return (
    <OakPage>
      <OakSection>
        <OakHeading
          title="Create new group"
          links={[
            {
              label: 'Back',
              icon: 'reply',
              action: goBack,
            },
          ]}
          linkSize="large"
        />
        <div className="create-project">
          <OakForm>
            <OakText
              data={state}
              id="name"
              handleChange={handleChange}
              label="Group name"
            />
            <OakText
              data={state}
              id="description"
              handleChange={handleChange}
              label="Short description about the project"
              multiline
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

export default CreateProject;
