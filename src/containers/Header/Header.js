import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
//import asset
import VietnamFlag from '../../assets/language-icon/flag-for-flag-vietnam-svgrepo-com.svg';
import UnitedStateFlag from '../../assets/language-icon/flag-us-svgrepo-com.svg';
import JapanFlag from '../../assets/language-icon/japan-svgrepo-com.svg';
//import redux
import { LANGUAGES } from '../../utils';
import * as actions from "../../store/actions";

class Header extends Component {

    changeLanguage = (language) => {
        this.props.changeAppLanguageRedux(language)
        //fire redux event: actions
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log('check user info: ', userInfo)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='left-container'>
                    <div className='welcome'>
                        <FormattedMessage id="home-header.welcome" />
                        {userInfo && userInfo.firstName && userInfo.lastName ? userInfo.firstName + ' ' + userInfo.lastName : ''}
                    </div>
                    <div className='language-content'>
                        <div className={language === LANGUAGES.VI ? "language-icon active" : "language-icon"}>
                            <img src={VietnamFlag} onClick={() => { this.changeLanguage(LANGUAGES.VI) }} />
                        </div>
                        <div className={language === LANGUAGES.EN ? "language-icon active" : "language-icon"}>
                            <img src={UnitedStateFlag} onClick={() => { this.changeLanguage(LANGUAGES.EN) }} />
                        </div>
                        <div className={language === LANGUAGES.JA ? "language-icon active" : "language-icon"}>
                            <img src={JapanFlag} onClick={() => { this.changeLanguage(LANGUAGES.JA) }} />
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
