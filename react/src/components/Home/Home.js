import React from 'react';
import { connect } from 'react-redux';

import mapStateToProps from '../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../store/defaultMapDispatchToProps';
import { check_website } from '../../utils/backgroundUtils';

// import Scroll from 'react-scroll';

import LearnAbout from './Content/LearnAbout/LearnAbout';
import HomeSearchBar from './Content/HomeSearchBar/HomeSearchBar';
import Contrib from './Content/Contrib/Contrib';
import Settings from './Content/Settings/Settings';
import Profile from './Content/Profile/Profile';
import HomeContentTabs from './Content/Tabs';
import Extension from './Content/Extension/Extension';
import Header from './Header/Header';
import Example from './Content/Example/Example';

import updateData from '../../utils/updateData';

const homeContentDivStyle = {
  "mobile": {
    textAlign: 'center',
    width: '80%',
    margin: 'auto'
  },
  "browser": {
    textAlign: 'unset',
    width: '70%',
    margin: 'auto'
  },
  "extension": {
    textAlign: 'unset',
    width: '80%',
    margin: 'auto'
  }
};

class Home extends React.Component {


  componentDidMount() {
    setTimeout(() => { this.props.setUserStatus(this, false) }, 100);
  }


  componentWillMount() {
    const component = this;
    if (this.props.clientType === 'extension') {
      window.chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        if (tabs.length === 0) {
          console.log('tabs.length is 0')
          return;
        }
        var url = tabs[0].url;
        if (component.props.dataIsAvailable) {
          const entity = check_website(component.props.data, url);
          if (entity && !sessionStorage['default_' + entity.id]) {
            // an entity was found and it is the first time 
            // the Extension sees this entity for this session
            // (It is assumed that if the user re-clicks on the Extension
            // during the session they intend to access the whole Extension)
            sessionStorage['default_' + entity.id] = 'true';
            component.props.updateEntityInfoBox(entity.id);
            component.props.displayEntity(entity.id);
            component.props.closeAll();
            component.props.history.push('/graph/' + entity.id);
          }
        }
      });
    }
    if (this.props.location.pathname === '/') {
      this.props.closeAll();
      this.props.toggleSearchBar();
      localStorage['reduxPersist:show'] = JSON.stringify({
        'intent': false,
        'contrib': false,
        'settings': false,
        'extension': false,
        'profile': false,
        'searchBar': true
      });
    } else {
      const location = this.props.location.pathname.split('/')[1];
      if (location) {
        this.props.closeAll();
        this.props.toggle(location);
        localStorage['reduxPersist:show'] = JSON.stringify({
          ...this.props.show,
          location: true
        })

      };
    }
  }

  componentWillReceiveProps(nextProps) {
    const newLocation = nextProps.location.pathname.split('/')[1] || 'search';
    const location = this.props.location.pathname.split('/')[1] || 'search';
    if (location !== newLocation) {
      this.props.closeAll();
      this.props.toggle(newLocation);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (sessionStorage.graphHistory && sessionStorage.graphHistory.length > 2) {
      sessionStorage.graphHistory = "[]";
      sessionStorage.location = "-1";
    }
  }


  componentDidUpdate(prevProps, prevState) {
    updateData(this);
  }


  render() {
    return (
      <div>
        <Header {...this.props} style={homeContentDivStyle[this.props.clientType]} />
        <div style={homeContentDivStyle[this.props.clientType]}>
          <Example {...this.props} />

          <HomeContentTabs {...this.props} />

          <HomeSearchBar {...this.props} />
          <Profile {...this.props} />
          <LearnAbout {...this.props} />
          <Contrib {...this.props} />
          <Settings {...this.props} />
          <Extension {...this.props} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);