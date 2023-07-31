import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
//import svg file
import VietnamFlag from '../../assets/language-icon/flag-for-flag-vietnam-svgrepo-com.svg';
import UnitedStateFlag from '../../assets/language-icon/flag-us-svgrepo-com.svg';
import JapanFlag from '../../assets/language-icon/japan-svgrepo-com.svg';
//import Redux
import { LANGUAGES } from '../../utils';
import { changeAppLanguage } from '../../store/actions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeAppLanguageRedux(language)
        //fire redux event: actions
    }

    render() {
        let language = this.props.language;
        console.log('check user info: ', this.props.userInfo)
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='header-logo'></div>
                            <i className="fas fa-bars"></i>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.search-doctor-by-specialty" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.medical-facility" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.choose-hospital-clinic" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.choose-good-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.checkup-package" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.general-health-checkup" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support-content'>
                                <i className="fas fa-question-circle"></i>
                                <span><FormattedMessage id="home-header.support" /></span>
                            </div>
                            <div className='language-content'>
                                <span><FormattedMessage id="home-header.language" />:</span>
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

                        </div>
                    </div>
                </div>
                {/* <div className='home-banner'>
                    <div className='banner-top-content'>
                        <div className='banner-title'><FormattedMessage id="home-banner.banner-title" /></div>
                        <div className='banner-suptitle'><b><FormattedMessage id="home-banner.banner-suptitle" /></b></div>
                        <div className='banner-search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh...' />
                        </div>
                    </div>
                    <div className='banner-bot-content'>
                        <div className='banner-option'>
                            <div className='option-content'>
                                <div className='option-icon'><i className="far fa-hospital"></i></div>
                                <div className='option-text'><FormattedMessage id="home-banner.specialty-checkup" /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-icon'><i className="fas fa-mobile-alt"></i></div>
                                <div className='option-text'><FormattedMessage id="home-banner.online-checkup" /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-icon'><i className="fas fa-notes-medical"></i></div>
                                <div className='option-text'><FormattedMessage id="home-banner.general-checkup" /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-icon'><i className="fas fa-syringe"></i></div>
                                <div className='option-text'><FormattedMessage id="home-banner.medical-test" /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-icon'><i className="fas fa-user-shield"></i></div>
                                <div className='option-text'><FormattedMessage id="home-banner.mental-health" /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-icon'><i className="fas fa-briefcase-medical"></i></div>
                                <div className='option-text'><FormattedMessage id="home-banner.dental-checkup" /></div>
                            </div>
                        </div>
                    </div>
                </div > */}
            </>
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

        changeAppLanguageRedux: (language) => { dispatch(changeAppLanguage(language)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
