import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import HomePage from "./HomePage/HomePage"

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import System from '../routes/System'
import Home from '../routes/Home';
import Login from './Authentication/Login';
import DoctorDetail from './Doctor/DoctorDetail';
import Doctor from "../routes/Doctor"
import VerifyBookAppointment from './Patient/VerifyBookAppointment';
import CustomScrollbars from '../components/CustomScrollbars';
import SpecialtyDetail from './HomePage/Section/Specialty/SpecialtyDetail';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }
    render() {
        return (
            <Fragment>
                <Router history={history}>  {/*history: save data when refresh page*/}
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)}></Route>

                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DOCTOR_DETAIL} component={DoctorDetail}></Route>
                                    <Route path={path.SPECIALTY_DETAIL} component={SpecialtyDetail}></Route>
                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyBookAppointment}></Route>
                                </Switch>
                            </CustomScrollbars>
                        </div>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);