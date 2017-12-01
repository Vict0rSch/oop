import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class AlertDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleRequestCloseAndReset = () => {
        Object.keys(localStorage).map(
            (v, k) => {
                localStorage.removeItem(v);
                return null;
            }
        );
        Object.keys(sessionStorage).map(
            (v, k) => {
                localStorage.removeItem(v);
                return null;
            }
        );
        this.setState({ open: false });
        if (this.props.clientType === 'extension') {
            window.chrome.runtime.reload();
        } else {
            window.location.reload();
        }
    };

    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <Button color='accent' onClick={this.handleClickOpen}>{this.props.translate('home.settings.resetDialogButton')}</Button>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>
                        {this.props.translate('home.settings.resetDialogTitle')}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.translate('home.settings.resetDialogContent')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            {this.props.translate('home.settings.resetDialogButtonCancel')}
                        </Button>
                        <Button onClick={this.handleRequestCloseAndReset} color="primary" autoFocus>
                            {this.props.translate('home.settings.resetDialogButtonYes')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;