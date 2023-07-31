import { React, Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
//import { FormattedMessage } from 'react-intl';
import { Fragment } from 'react';
import { handleLoginService } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errorMessage: ''
        }
    }

    handleOnChangeInput = (event, option) => {
        if (option === 1) {
            this.setState({
                username: event.target.value,
            })
        }
        else {
            this.setState({
                password: event.target.value,
            })
        }
    }
    handleLogin = async () => {
        this.setState({
            errorMessage: ''
        })
        try {
            let data = await handleLoginService(this.state.username, this.state.password);
            if (data && data.errorCode !== 0) {
                this.setState({
                    errorMessage: data.message
                })
            }
            if (data && data.errorCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('Login Succeed!')
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errorMessage: e.response.data.message
                    })
                }
            }

        }

    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {

        return (
            <Fragment>
                <div className='login-background'>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12 login-text'>LOGIN</div>
                            <div className='col-12 form-group login-input'>
                                <label>Username:</label>
                                <input type='text' className='form-control' placeholder='Enter your username'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeInput(event, 1)}
                                />
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label>Password:</label>
                                <div className='custom-input-passwords'>
                                    <input type={this.state.isShowPassword ? 'text' : 'password'}
                                        className='form-control' placeholder='Enter your password'
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChangeInput(event, 2)}
                                    />
                                    <span onClick={() => this.handleShowHidePassword()}>
                                        <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                    </span>
                                </div>
                            </div>
                            <div className='col-12' style={{ color: "red" }}>
                                {this.state.errorMessage}
                            </div>
                            <div className='col-12'>
                                <button className='btn-login' onClick={() => this.handleLogin()}>
                                    LOGIN
                                </button>
                            </div>
                            <div className='col-12'>
                                <span className='forgot-password'>Forgot your password?</span>
                            </div>
                            <div className='col-12 text-center mt-5'>
                                <span>Or login with:</span>
                            </div>
                            <div className='col-12 login-social'>
                                <i className="fab fa-google login-google"></i>
                                <i className="fab fa-facebook-f login-facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment  >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
