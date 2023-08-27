import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeBanner.scss'
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class HomeBanner extends Component {

    render() {
        //let language = this.props.language;
        return (
            <>
                <div className='home-banner'>
                    <div className='banner-top-content'>
                        <div className='banner-title'><FormattedMessage id="home-banner.banner-title" /></div>
                        <div className='banner-suptitle'><b><FormattedMessage id="home-banner.banner-suptitle" /></b></div>
                        <div className='banner-search'>
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                            <input type='text' placeholder='...' />
                        </div>
                    </div>
                    <div className='banner-bot-content'>
                        <div className='banner-option'>
                            <div className='option-content'>
                                <div className='option-icon'><FontAwesomeIcon icon="fa-solid fa-hospital" transform="left-1" /></div>
                                <div className='option-text'><FormattedMessage id="home-banner.specialty-checkup" /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-icon'><FontAwesomeIcon icon="fa-solid fa-laptop-medical" transform="left-1" /></div>
                                <div className='option-text'><FormattedMessage id="home-banner.online-checkup" /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-icon'><FontAwesomeIcon icon="fa-solid fa-notes-medical" /></div>
                                <div className='option-text'><FormattedMessage id="home-banner.general-checkup" /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-icon'><FontAwesomeIcon icon="fa-solid fa-microscope" /></div>
                                <div className='option-text'><FormattedMessage id="home-banner.medical-test" /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="35" height="35"><path fill="#49bce2" d="M19,9a7,7,0,0,0-7-7H10.2482A8.1643,8.1643,0,0,0,2.035,9.2424a7.9905,7.9905,0,0,0,3.9464,7.6708A2.0124,2.0124,0,0,1,7,18.6481L7,22h7.9553V19H17a2,2,0,0,0,2-2V14l2.2419-.5717a1,1,0,0,0,.4645-1.6772Zm-7,.5a.5.5,0,0,1-.5.5H10v1.5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5V10H6.5A.5.5,0,0,1,6,9.5v-1A.5.5,0,0,1,6.5,8H8V6.5A.5.5,0,0,1,8.5,6h1a.5.5,0,0,1,.5.5V8h1.5a.5.5,0,0,1,.5.5Z" class="color000 svgShape"></path></svg></div>
                                <div className='option-text'><FormattedMessage id="home-banner.mental-health" /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-icon'><FontAwesomeIcon icon="fa-solid fa-tooth" /></div>
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
