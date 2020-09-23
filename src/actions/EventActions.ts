/* eslint-disable import/prefer-default-export */
import { RELOAD_EVENTS } from './types';
import { httpGet, httpPut } from '../components/Lib/RestTemplate';
import { sendMessage } from '../events/MessageService';
import constants from '../components/Constants';

const domain = 'event';

export const fetchAllEvents = (space, authorization) => dispatch => {
  httpGet(`${constants.API_URL_EVENT}/${space}`, {
    headers: {
      Authorization: authorization.token,
    },
  }).then(response => {
    dispatch({
      type: RELOAD_EVENTS,
      payload: { events: response.data },
    });
  });
};
