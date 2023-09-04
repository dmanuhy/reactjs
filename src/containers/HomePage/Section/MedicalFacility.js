import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import './MedicalFacility.scss';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MedicalFacility extends Component {

    render() {

        return (
            <>
                <div className='section-general section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <div className='header-title'>
                                <FontAwesomeIcon icon="fa-solid fa-hospital" /> &nbsp;
                                <span><FormattedMessage id="home-section.medical-facilities"></FormattedMessage></span>
                            </div>
                            <button className='header-btn'><FormattedMessage id="home-section.see-more"></FormattedMessage></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='body-content'>
                                    <div className='bg-image img-medical-facility' />
                                    <span>Phong Kham Da Khoa Meditec</span>
                                </div>
                                <div className='body-content'>
                                    <div className='bg-image img-medical-facility' />
                                    <span>Phong Kham Da Khoa Meditec</span>
                                </div>
                                <div className='body-content'>
                                    <div className='bg-image img-medical-facility' />
                                    <span>Phong Kham Da Khoa Meditec</span>
                                </div>
                                <div className='body-content'>
                                    <div className='bg-image img-medical-facility' />
                                    <span>Phong Kham Da Khoa Meditec</span>
                                </div>
                                <div className='body-content'>
                                    <div className='bg-image img-medical-facility' />
                                    <span>Phong Kham Da Khoa Meditec</span>
                                </div>
                                <div className='body-content'>
                                    <div className='bg-image img-medical-facility' />
                                    <span>Phong Kham Da Khoa Meditec</span>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
