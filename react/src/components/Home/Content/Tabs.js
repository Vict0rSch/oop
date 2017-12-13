import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import SearchIcon from 'material-ui-icons/Search';
import SettingsIcon from 'react-icons/lib/go/settings';
import ContactIcon from 'react-icons/lib/go/mail';
import AboutIcon from 'react-icons/lib/go/organization';
import ExtensionIcon from 'react-icons/lib/go/package';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
  },
  indicator: {
    width: '100px'
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
    update: 0
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
    if (this.state.update !== -1) {
      let location = this.props.location.pathname.split('/')[1];
      if (location === "") {
        location = 'search'
      }
      this.setState({
        value: location,
        update: this.state.update + 1
      });
    }
  }


  render() {

    let tabs = ["search", "about", "contact", "settings"];
    if (this.props.clientType !== "extension") {
      tabs = [
        ...tabs.slice(0, 2),
        "extension",
        ...tabs.slice(2)
      ];
    }

    const { classes } = this.props;

    const icons = {
      'search': <SearchIcon style={iconStyle} />,
      'about': <AboutIcon style={iconStyle} />,
      'contact': <ContactIcon style={iconStyle} />,
      'settings': <SettingsIcon style={iconStyle} />,
      'extension': <ExtensionIcon style={iconStyle} />,
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
          {tabs.map(
            (v, k) => {
              return <Tab
                className={classes.labelContainer}
                key={'tab' + k}
                label={
                  <span style={{ ...labelStyle[this.props.clientType], ...tabStyle[this.props.clientType] }}>{this.props.translate("home.tabs." + v)}</span>
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