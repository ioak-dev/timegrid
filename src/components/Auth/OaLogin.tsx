import React, { useEffect } from 'react';
import './Login.scss';

const queryString = require('query-string');

interface Props {
  cookies: any;
  history: any;
  location: any;
}

const OaLogin = (props: Props) => {
  useEffect(() => {
    if (props.location.search) {
      const query = queryString.parse(props.location.search);
      props.cookies.set(`timegrid_${query.space}`, query.authKey);
      console.log(typeof query.from);
      console.log(query.from || `/${query.space}/event`);
      props.history.push(query.from ? query.from : `/${query.space}/event`);
    }
  }, []);

  return <></>;
};

export default OaLogin;
