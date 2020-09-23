import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import { Route } from 'react-router-dom';
import './style.scss';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { withCookies } from 'react-cookie';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import OaLogin from '../Auth/OaLogin';
import Landing from '../Landing';
import { getUser, addUser } from '../../actions/UserActions';
import { getProfile, setProfile } from '../../actions/ProfileActions';

import Notification from '../Notification';
import Navigation from '../Navigation';
import { Authorization } from '../Types/GeneralTypes';
import Tenant from '../Tenant';
import OakRoute from '../Auth/OakRoute';
import Unauthorized from '../Auth/Unauthorized';
import OneAuth from '../Login/OneAuth/index';
import Login from '../Login/index';
import { receiveMessage } from '../../events/MessageService';
import { fetchAllSpaces } from '../../actions/SpaceActions';
import ListProject from '../Project/ListProject';
import CreateProject from '../Project/CreateProject';
import Init from './Init';
import ViewProject from '../Project/ViewProject';
import ListEvent from '../Event/ListEvent';
import ViewEvent from '../Event/ViewEvent';
import CreateEvent from '../Event/CreateEvent';
import ListWorldclock from '../Worldclock/ListWorldclock';

const themes = {
  themecolor1: getTheme('#69A7BF'),
  themecolor2: getTheme('#99587B'),
  themecolor3: getTheme('#A66C26'),
  themecolor4: getTheme('#37AE82'),
};

function getTheme(color: string) {
  return createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
      secondary: {
        main: color,
      },
    },
  });
}

interface Props {
  getProfile: Function;
  setProfile: Function;
  getAuth: Function;
  addAuth: Function;
  removeAuth: Function;
  getUser: Function;
  addUser: Function;
  cookies: any;

  // event: PropTypes.object,
  profile: any;
  authorization: Authorization;
}

const Content = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const [space, setSpace] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    receiveMessage().subscribe(event => {
      if (event.name === 'spaceChange') {
        setSpace(event.data);
      }
    });
  }, []);

  useEffect(() => {
    props.getProfile();
    dispatch(fetchAllSpaces());
  }, []);

  return (
    <div
      className={`App ${props.profile.theme} ${props.profile.textSize} ${props.profile.themeColor}`}
    >
      <HashRouter>
        <div className="body">
          <div className="body-content">
            <Init />
            <Notification />
            <MuiThemeProvider theme={themes.themecolor1}>
              <Navigation {...props} />
              <Route
                path="/login"
                render={propsLocal => (
                  <OakRoute {...propsLocal} {...props} component={OaLogin} />
                )}
              />
              <Route
                path="/:space/unauthorized"
                render={propsLocal => (
                  <OakRoute
                    {...propsLocal}
                    {...props}
                    component={Unauthorized}
                    middleware={['isAuthenticated']}
                  />
                )}
              />
              <Route
                path="/"
                exact
                render={propsLocal => (
                  <OakRoute {...propsLocal} {...props} component={Landing} />
                )}
              />
              <Route
                path="/home"
                exact
                render={propsLocal => (
                  <OakRoute {...propsLocal} {...props} component={Landing} />
                )}
              />
              <Route
                path="/tenant"
                exact
                render={propsLocal => (
                  <OakRoute {...propsLocal} {...props} component={Tenant} />
                )}
              />
              <Route
                path="/:space/event"
                exact
                render={propsLocal => (
                  <OakRoute
                    {...propsLocal}
                    {...props}
                    component={ListEvent}
                    middleware={['readAuthentication']}
                  />
                )}
              />
              <Route
                path="/:space/event/view"
                render={propsLocal => (
                  <OakRoute
                    {...propsLocal}
                    {...props}
                    component={ViewEvent}
                    middleware={['readAuthentication']}
                  />
                )}
              />
              <Route
                path="/:space/event/create"
                render={propsLocal => (
                  <OakRoute
                    {...propsLocal}
                    {...props}
                    component={CreateEvent}
                    middleware={['readAuthentication']}
                  />
                )}
              />
              <Route
                path="/:space/login/home"
                render={propsLocal => (
                  <OakRoute
                    {...propsLocal}
                    {...props}
                    component={Login}
                    middleware={['readAuthentication']}
                  />
                )}
              />
              <Route
                path="/:space/login/oa"
                render={propsLocal => (
                  <OakRoute
                    {...propsLocal}
                    {...props}
                    component={OneAuth}
                    middleware={['readAuthentication']}
                  />
                )}
              />
              <Route
                path="/:space/project"
                exact
                render={propsLocal => (
                  <OakRoute
                    {...propsLocal}
                    {...props}
                    component={ListProject}
                    middleware={['readAuthentication']}
                  />
                )}
              />
              <Route
                path="/:space/project/view"
                render={propsLocal => (
                  <OakRoute
                    {...propsLocal}
                    {...props}
                    component={ViewProject}
                    middleware={['readAuthentication']}
                  />
                )}
              />
              <Route
                path="/:space/project/create"
                render={propsLocal => (
                  <OakRoute
                    {...propsLocal}
                    {...props}
                    component={CreateProject}
                    middleware={['readAuthentication']}
                  />
                )}
              />
              <Route
                path="/:space/worldclock"
                exact
                render={propsLocal => (
                  <OakRoute
                    {...propsLocal}
                    {...props}
                    component={ListWorldclock}
                    middleware={['readAuthentication']}
                  />
                )}
              />
            </MuiThemeProvider>
          </div>
        </div>
      </HashRouter>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  profile: state.profile, // ,
  //   event: state.event
});

export default connect(mapStateToProps, {
  getProfile,
  setProfile,
  getUser,
  addUser,
})(withCookies(Content));
