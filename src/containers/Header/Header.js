import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
//import asset
import VietnamFlag from '../../assets/language-icon/flag-for-flag-vietnam-svgrepo-com.svg';
import UnitedStateFlag from '../../assets/language-icon/flag-us-svgrepo-com.svg';
import JapanFlag from '../../assets/language-icon/japan-svgrepo-com.svg';
//import redux
import { LANGUAGES, USER_ROLE } from '../../utils';
import * as actions from "../../store/actions";
import _ from 'lodash';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    changeLanguage = (language) => {
        this.props.changeAppLanguageRedux(language)
        //fire redux event: actions
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let roleID = userInfo.roleID;
            if (roleID === USER_ROLE.ADMIN) {
                menu = adminMenu;
            } else {
                if (roleID === USER_ROLE.DOCTOR) {
                    menu = doctorMenu;
                } else {
                    console.log(roleID)
                }
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='left-container'>
                    <div className='welcome'>
                        <FormattedMessage id="home-header.welcome" />
                        {userInfo && userInfo.firstName && userInfo.lastName ? userInfo.firstName + ' ' + userInfo.lastName : ''}
                    </div>
                    <div className='language-content'>
                        <div className={language === LANGUAGES.VI ? "language-icon active" : "language-icon"}>
                            <img alt="Vietnamese" src={VietnamFlag} onClick={() => { this.changeLanguage(LANGUAGES.VI) }} />
                        </div>
                        <div className={language === LANGUAGES.EN ? "language-icon active" : "language-icon"}>
                            <img alt="English" src={UnitedStateFlag} onClick={() => { this.changeLanguage(LANGUAGES.EN) }} />
                        </div>
                        <div className={language === LANGUAGES.JA ? "language-icon active" : "language-icon"}>
                            <img alt="Japanese" src={JapanFlag} onClick={() => { this.changeLanguage(LANGUAGES.JA) }} />
                        </div>
                    </div>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Logout'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeAppLanguageRedux: (language) => { dispatch(actions.changeAppLanguage(language)) },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
