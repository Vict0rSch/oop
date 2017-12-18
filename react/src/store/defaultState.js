const defaultState = {
    data: {},
    dataIsAvailable: false,
    show: {
        howItWorks: true,
        legend: true,
        chips:true
    },
    currentDisplay: -1,
    infoBox: {
        type: '',
        data: []
    },
    user: {
        isLoggedIn: false,
        isConfirmed: false,
        isValid: false,
        data: {}
    }
};

export default defaultState;