import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: 30,
        marginTop: theme.spacing.unit * 3,
        display: 'inline-block',
        marginBottom: '30px'
    }),
});


class HomePaper extends Component {

    render() {

        let browserWidth;

        try{
            browserWidth = window.chrome.tabs !== undefined ? '' : '';
            browserWidth = '-webkit-fill-available';
        } catch (error){
            //Not Chrome browser
            browserWidth = '-moz-available';
        }

        const widths = {
            'chromeExtension': '700px',
            'mobile': '90%',
            'browser': browserWidth
        }

        const typoStyle = {
            fontSize: '1.2em',
            textAlign: 'justify',
            textJustify: 'auto',
            fontWeight: 200,
            padding: '20px 50px'
        };

        const typoStyles = {
            'browser': {
                ...typoStyle,
                fontSize: '1em',
            },
            'chromeExtension': {
                ...typoStyle
            },
            'mobile': {
                ...typoStyle,
                fontSize: '0.8em',
                padding: '20px'
            }
        }




        const { classes } = this.props;

        return (
                <Paper style={{ width: widths[this.props.clientType] }} className={classes.root} elevation={4}>
                    <Typography type="body1" style={typoStyles[this.props.clientType]} component="div" >
                        {this.props.content}
                    </Typography>
                </Paper>
        );

    }
}

export default withStyles(styles)(HomePaper);