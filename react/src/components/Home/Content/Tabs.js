import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import SearchIcon from 'material-ui-icons/Search';
import SettingsIcon from 'react-icons/lib/go/settings';
import AboutIcon from 'react-icons/lib/go/organization';
import ExtensionIcon from 'react-icons/lib/go/package';
import ProfileIcon from 'react-icons/lib/fa/space-shuttle';
import LoginIcon from 'react-icons/lib/md/flight-land';
import ContribIcon from 'react-icons/lib/md/fitness-center';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
  indicator: {
    width: '80px'
  }
});

const iconStyle = {
  width: "20px",
  height: "20px"
};

const tabStyle = {
  "browser": {
    minWidth: '100px'
  },
  "mobile": {
    minWidth: '100px'
  },
  "extension": {
    minWidth: '140px'
  }
};

const labelStyle = {
  "browser": {
    fontSize: '0.7em'
  },
  "mobile": {
    fontSize: '0.7em'
  },
  "extension": {
    fontSize: '0.7em'
  }
};

const scrollableTabsMinWidth = 630;

class HomeContentTabs extends React.Component {
  state = {
    value: 'search',
    update: 0,
    tabs: ["search", "profile", "about", "settings"]
  };

  handleChange = (event, value) => {
    if (this.props.location.pathname.split('/')[1] !== value) {
      this.setState({ value });
      this.props.closeAll();
      this.props.toggle(value);
      this.props.history.push('/' + value)
    }
  };


  componentWillReceiveProps(nextProps) {
    if (this.state.update === 0) {
      let location = this.props.location.pathname.split('/')[1];
      if (location === "") {
        location = 'search'
      }
      if (this.state.tabs.indexOf(location) > -1) {
        this.setState({
          value: location,
          update: this.state.update + 1
        });
      }
    }

    let tabs = this.state.tabs;
    if (this.props.clientType !== nextProps.clientType) {
      if (nextProps.clientType !== "extension" && tabs.indexOf("extension") === -1) {
        tabs = [
          ...tabs.slice(0, 3),
          "extension",
          ...tabs.slice(3)
        ];
      }
    }

    if (nextProps.user.isValid && tabs.indexOf("contrib") === -1) {
      tabs = [
        ...tabs.slice(0, 2),
        "contrib",
        ...tabs.slice(2)
      ];
    }

    if (tabs.length !== this.state.tabs.length) {
      this.setState({
        tabs
      });
    }
  }

  render() {

    const { classes } = this.props;

    const icons = {
      'search': <SearchIcon style={iconStyle} />,
      'about': <AboutIcon style={iconStyle} />,
      'settings': <SettingsIcon style={iconStyle} />,
      'extension': <ExtensionIcon style={iconStyle} />,
      'profile': this.props.user.isLoggedIn ? <ProfileIcon style={iconStyle} /> : <LoginIcon style={iconStyle} />,
      'contrib': <ContribIcon style={iconStyle} />
    };

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          scrollable={window.innerWidth < scrollableTabsMinWidth}
          scrollButtons="auto"
          indicatorClassName={classes.indicator}
        >
          {this.state.tabs.map(
            (v, k) => {
              const translate = v === 'profile' && !this.props.user.isLoggedIn ? 'login' : v;

              return <Tab
                className={classes.labelContainer}
                key={'tab' + k}
                label={
                  <span style={{ ...labelStyle[this.props.clientType], ...tabStyle[this.props.clientType] }}>{this.props.translate("home.tabs." + translate)}</span>
                }
                icon={icons[v]}
                value={v}
                style={tabStyle[this.props.clientType]}
              />;
            }
          )}
        </Tabs>
      </Paper>
    );
  }
}

HomeContentTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeContentTabs);