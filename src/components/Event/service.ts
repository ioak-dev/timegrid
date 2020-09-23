import { httpDelete, httpGet, httpPost, httpPut } from '../Lib/RestTemplate';
import constants from '../Constants';
import { sendMessage } from '../../events/MessageService';

export const saveEvent = async (space, authorization, payload) => {
  const response = await httpPut(
    `${constants.API_URL_EVENT}/${space}/`,
    payload,
    {
      headers: {
        Authorization: authorization.token,
      },
    }
  );
  return response;
};

export const getEvents = async (space, authorization) => {
  const response = await httpGet(`${constants.API_URL_EVENT}/${space}`, {
    headers: {
      Authorization: authorization.token,
    },
  });
  return response;
};

export const removeEvent = async (space, authorization, id) => {
  const response = await httpDelete(
    `${constants.API_URL_PROJECTMEMBER}/${space}/${id}`,
    {
      headers: {
        Authorization: authorization.token,
      },
    }
  );
  return response;
};
