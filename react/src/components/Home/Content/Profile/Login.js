import React, { Component } from 'react'
import LoginForm from './LoginForm';
import Dialog, {
    DialogContent,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const fullScreenMinWidth = 650;


const dialogContentStyle = {
    textAlign: 'center'
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitError: '',
            open: false
        }
    }

    showResults = values => {
        const escaped = JSON.parse(JSON.stringify(values));
        console.log('submitted')
        this.props.userLogin(this, escaped)
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };


    render() {
        let { fullScreen } = this.props;
        if (this.props.clientType === 'extension' || window.innerWidth > fullScreenMinWidth) {
            fullScreen = false;
        }

        return (
            <div>
                <Button onClick={this.handleClickOpen} color="primary">
                    {/* {this.props.translate('home.profile.register')} */}
                    {this.props.translate('home.profile.login.button')}
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <DialogTitle>{this.props.translate('home.profile.login.button')}</DialogTitle>
                    <DialogContent component={'div'} style={dialogContentStyle}>
                        <Typography type="body1">
                            {this.props.translate('home.profile.login.dialogContent')}
                        </Typography>
                        <br /><br />
                        <LoginForm
                            {...this.props}
                            onSubmit={this.showResults}
                            submitError={this.state.submitError}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}


export default withMobileDialog()(Login);