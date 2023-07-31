import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeBanner.scss'
import { FormattedMessage } from 'react-intl';

class HomeBanner extends Component {

    render() {
        let language = this.props.language;
        return (
            <>
                <div className='home-banner'>
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
                </div >
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
