import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import './MedicalFacility.scss';
import Slider from 'react-slick';

class MedicalFacility extends Component {

    render() {

        return (
            <>
                <div className='section-general section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='header-title'>Co so y te noi bat</span>
                            <button className='header-btn'>XEM THEM</button>
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
